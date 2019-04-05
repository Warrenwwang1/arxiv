import React, { Component } from 'react';
import convert from 'xml-js';
import ArticleListItem from '../ArticleListItem'
import Banner from '../Banner'
import "./AuthorPage.css";

class AuthorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []

        };
    }

    async componentDidMount() { 
        //fetches the articles written by this author
        var name = this.props.location.state.name;
        var space = name.indexOf(" ");
        var firstName = name.slice(0, space);
        var lastName = name.slice(space);

        let res1 = await fetch('http://export.arxiv.org/api/query?search_query=au:' + firstName + "+AND+" +lastName + '&sortBy=lastUpdatedDate&sortOrder=descending')
        let res_txt1 = await res1.text()
        let res_json1 = convert.xml2js(res_txt1, {compact: true, spaces: 4})
        let feed= res_json1.feed;

        if (feed.entry != null) {
            this.setState({
                titles: feed.entry.map(article => article.title._text)
            })

        }
          
        
    }

    render() {
        return(
            <div className="authorPage">
            <Banner></Banner>
            <div className="authorPageContents">
            <p className ="authorTitle">{this.props.location.state.name}</p>

            <h3>Recent Articles</h3>
            <dl>{
                this.state.titles.map(title => 
                (<ArticleListItem title = {title}></ArticleListItem>)
                )}
            </dl>
            </div>
            </div>
        );
    }
}

export default AuthorPage;
