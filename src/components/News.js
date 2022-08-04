import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const BASE_URL = "https://newsapi.org/v2/top-headlines";
const EVERYTHING_URL = "https://newsapi.org/v2/everything";
const API_KEY = "8582ca6f34a84c02a4ed53e9627f398a"

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - The Scoop`;
    }

    async updateNews(){
        if(this.props.category==="everything"){
            const url = new URL(EVERYTHING_URL);
                url.search = new URLSearchParams({
                    q: "INDIA",
                    apiKey:API_KEY 
                });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData.articles)
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
            })
        }
        else{
            const url = new URL(BASE_URL);
                url.search = new URLSearchParams({
                    country: "in",
                    category: this.props.category,
                    apiKey:API_KEY 
                });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData.articles)
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
            })
        }
    }


    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h1>The Scoop - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                    <div className="container">
                        <div className="row">
                            {this.state.articles && this.state.articles.map((element, index) => (
                                <div className="col-md-4" key={index}>
                                    <NewsItem 
                                        title={element.title ? element.title : ""} 
                                        description={element.description ? element.description : ""} 
                                        imageUrl={element.urlToImage} 
                                        newsUrl={element.url} 
                                        author={element.author} 
                                        date={element.publishedAt} 
                                        source={element.source.name} />
                                </div>
                            ))}
                        </div>
                    </div>
            </>
        )
    }
}

export default News