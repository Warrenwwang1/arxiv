import React, { Component } from 'react';
import "./ArticleListItem.css";

class ArticleListItem extends Component {
    render() {
        return(
            <div className="article">
                <p className="itemTitle">{this.props.title}</p>
            </div>
        );
    }
}

export default ArticleListItem;
