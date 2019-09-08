import React from 'react';
import PropTypes from 'prop-types';

import Articles from './Articles';

class UserArticles extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: {},
    };
  }

  async componentWillMount() {
    const articles = await this.props.getUserArticles(this.props.token);
    
    this.setState({ articles });

    // set my article to App Component
    this.props.setArticles(articles.data);
    // console.log(this.state.articles)
  }

  handlePagination = async (url) => {
    const articles = await this.props.getUserArticles(this.props.token, url);

    this.setState({ articles });
    this.props.setArticles(articles.data);
  }

  deleteArticle = async (id) => {
    
        await this.props.deleteArticle(id , this.props.token)



        // !!!!!!! remove article from Dom
      const articles = this.state.articles.data.filter(a => a.id !== id)

      this.setState({
        
        articles:{
          data:articles
        }
      })
      
  }



  editArticle = async (article) => {
      await this.props.history.push(`/article/edit/${article.slug}`)
  }

  render() {
    return (
      <Articles
        articles={this.state.articles.data}
        nextUrl={this.state.articles.next_page_url}
        prevUrl={this.state.articles.prev_page_url}
        handlePagination={this.handlePagination}
        deleteArticle={this.deleteArticle}
        editArticle={this.editArticle}
      />
    );
  }
}

UserArticles.propTypes = {
  getUserArticles: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setArticles: PropTypes.func.isRequired,
  deleteArticle:PropTypes.func.isRequired
};

export default UserArticles;
