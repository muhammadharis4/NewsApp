import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        categroy: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        categroy: PropTypes.string,
    };
    captilizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            articles: [],
        };
        document.title = `${this.captilizeFirstLetter(
            this.props.category
        )} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            loading: false,
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
        this.props.setProgress(100);
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

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=200ce0b939dd4fde8437eaf125860fd6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center my-2">
                    NewsMonkey - Top {this.captilizeFirstLetter(this.props.category)}{" "}
                    Headlines
                </h1>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    {console.log(this.state.articles.length, this.state.totalResults, this.state.articles.length !== this.state.totalResults)}
                    <div className="container my-3">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 45) : ""}
                                            description={
                                                element.description
                                                    ? element.description.slice(0, 88)
                                                    : ""
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
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
