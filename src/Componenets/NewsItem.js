import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imgUrl? imgUrl: "https://img.medscape.com/thumbnail_library/dt_230624_clock_fruits_juice_diet_800x450.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}... </p>
            <p className="card-text"><small className="text-body-secondary">By {author? author: "unknown"} on {new Date(date).toGMTString() }</small></p>
            <a className="btn btn-sm btn-outline-info" href={newsUrl} target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
