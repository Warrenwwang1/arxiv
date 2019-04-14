import React, { Component } from 'react';
import "./ArticleInfo.css";
import { Link } from 'react-router-dom';
import Banner from '../Banner'

class ArticleInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="articleInfo">
                <Banner></Banner>
                <div className="articleInfoContents">
                    <h1 className="articleTitle">{this.props.location.state.title}</h1>
                    <div className="textBody">
                        <div className="authorDiv">
                            <h2>Authors</h2>
                            <dl className="articleAuthors">{this.props.location.state.authors.map(x => (
                                <Link to={{
                                    pathname: "/author-page",
                                    state: {
                                        name: x.name._text
                                    }
                                }}>
                                    <p>{x.name._text}</p>
                                </Link>
                            ))}</dl>
                        </div>
                        <div className="summaryDiv">
                            <h2>Summary</h2>

                            <p className="articleSummary">{this.props.location.state.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleInfo;
