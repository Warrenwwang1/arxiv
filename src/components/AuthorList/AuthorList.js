import React, { Component } from 'react';
import convert from 'xml-js';
import ArticleListItem from '../ArticleListItem.js'
import { Link } from 'react-router-dom';
import Banner from '../Banner'

class AuthorList extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
          APIdata: {},
          prolificAuthors: [],
          authorToNum: {}
  
      };

      this.findProlificAuthors = this.findProlificAuthors.bind(this)

    }
  
    async componentDidMount() {
      let r = await fetch('http://export.arxiv.org/api/query?search_query=all&start=0&max_results=500&sortBy=lastUpdatedDate&sortOrder=descending')
      let r_txt = await r.text()
      let r_json = convert.xml2js(r_txt, {compact: true, spaces: 4})
  
      this.setState({
        APIdata: r_json
      })
      this.findProlificAuthors()
  
  }
  
  async findProlificAuthors() { 
    //this function looks at the feed from the API and maps each 
    //author to the amount of articles they've written and also 
    //creates a sorted array of the most prolific to least prolific authors

    let feed = this.state.APIdata.feed
    var article;
    var authorsJSON = {};

    for(var i = 0; i < feed.entry.length; i++) {
        var article = feed.entry[i];
    
        if (article.author instanceof Array) {
            var names = article.author.map(author => author.name._text); //an array of authors for current article

            for (var j in names) {
                if(authorsJSON[names[j]] == null) {
                    authorsJSON[names[j]] = 1;
                } else {
                    authorsJSON[names[j]] += 1;                   
                }
            }
        } else {
            var names = article.author.name._text
            if(authorsJSON[names] == null) {
                authorsJSON[names] = 1;
                
            } else {
                authorsJSON[names] += 1;
            }
        }
    }
    var authorsArr = []
    for (var author in authorsJSON) {
      authorsArr.push([author, authorsJSON[author]]);
    }
    authorsArr.sort(function(a, b) {
      return b[1] - a[1];
    });

    this.setState({
        authorToNum: authorsJSON,
        prolificAuthors: authorsArr.slice(0, 10)
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
        <h1 className = "aTitle">New Authors</h1>
      </div>
          <ul>
            {this.state.prolificAuthors.map(entry => (
                <Link style={{ textDecoration: 'none', color: 'black' }} to={{
                  pathname: "/author-page",
                  state: {
                      name: entry[0]
                  }
              }}>
                  <ArticleListItem title = {entry[0] + " has written " + entry[1] + " articles"}></ArticleListItem>
               </Link>
                
                 ))
              
              }
          </ul>
          
        </div>
      );
    }
  }

export default AuthorList;
