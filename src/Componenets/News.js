import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"; 
import PropTypes from "prop-types";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        categroy: "general",

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        categroy: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        };
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=200ce0b939dd4fde8437eaf125860fd6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        });
    }

    async componentDidMount() {
        await this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        await this.updateNews();
    };

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        await this.updateNews();
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center my-2">NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={
                                        element.description ? element.description.slice(0, 88) : ""
                                    }
                                    imgUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button
                        type="button"
                        disabled={this.state.page <= 1}
                        className="btn btn-outline-light"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        type="button"
                        disabled={
                            Math.ceil(this.state.totalResults / this.props.pageSize) <
                            this.state.page + 1
                        }
                        className="btn btn-outline-light"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
