import React from 'react'

const NewsItem = (props) => {

  let { title, imageUrl, newsUrl, date, author, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-success">{source}</span>
        </div>
        <img src={imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/1200px-Google_News_icon.svg.png"} className="card-img-top" alt='...' />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author} on {date}</p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem;