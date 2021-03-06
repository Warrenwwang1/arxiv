import React, { Component } from 'react';
import convert from 'xml-js';
import ArticleListItem from '../ArticleListItem.js'
import Banner from '../Banner.js'
import { Link } from 'react-router-dom';
import './NewArticles.css'

class NewArticles extends Component {

  constructor(props) {
    super(props);

    this.state = {
        APIdata: {},
        articles: []

    };
  }

  async componentDidMount() { 
    // finds most recent articles written about psychiatry, 
    // machine learning, therapy, or data science
    let res = await fetch('http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+%28all:machine+AND+learning%29+OR+all:therapy+OR+%28all:data+AND+science%29&sortBy=relevance')
    let res_txt = await res.text()
    let res_json = convert.xml2js(res_txt, {compact: true, spaces: 4})
    
    this.setState({
      APIdata: res_json,
      articles: res_json.feed.entry
    })
  
}

  render() {
    return (
      <div className="articlesPage">
      <Banner></Banner>
      <div className="links">
        <Link className = "articlesLink" style={{ textDecoration: 'none', color: 'black' }} to={{pathname: "/"}}>New Articles</Link>
        <Link style={{ textDecoration: 'none', color: 'black' }} to={{pathname: "/all-authors"}}>Authors</Link>
      </div>

      <div className = "articlesTitle">
        <h1 className = "aTitle">New Articles</h1>
      </div>
        <ul>
          {this.state.articles.map(entry => 
            (
               <Link style={{ textDecoration: 'none', color: 'black' }} to={{
                pathname: "/article-info",
                state: {
                    title: entry.title._text,
                    summary: entry.summary._text,
                    authors: entry.author
                  }
                }}>
                <ArticleListItem title={entry.title._text}/>
             </Link>
              ))
            
            }
        </ul>
      </div>
    );
  }
}

export default NewArticles;
