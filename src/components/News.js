import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)
    const [hasMore, sethasMore] = useState(true)

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }


    useEffect(() => {
        document.title = `${capitalize(props.category)} - DailyPlanet`
        updateNews();
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        console.log(articles.length+" "+page)
        //console.log(articles);
        setTotalResult(parsedData.totalResults);
        if(articles.length === totalResult){
            sethasMore(false);
        }
    };
    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>{`DailyPlanet - Top ${capitalize(props.category)} Headlines`}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className='col-md-4' key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        date={new Date(element.publishedAt).toGMTString()}
                                        author={element.author ? "by " + element.author : "by Unknown"}
                                        source={element.source.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
}
export default News;