import React from 'react';
import PropTypes from 'prop-types';
import { EditorState , convertToRaw } from 'draft-js';
import DraftToHtml from 'draftjs-to-html'

import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      image: null,
      content: EditorState.createEmpty(),
      category: null,
      errors: [],
      categories: [],
      editing:false,
      article:null,
      title:'',
      content:'',
      category:''
    };
  }

  async componentWillMount() {
    const categories = await this.props.getArticleCategories();

    if (this.props.match.params.slug) {

      const article = this.props.articles.find(a => a.slug === this.props.match.params.slug)

      //  if article not set in state redirect and return !!!!
      if (!article) {
        this.props.history.push('/user/articles');
        return;
      }

      this.setState({
        editing:true ,
        article , 
        categories,
        title:article.title,
        content:article.content,
        category:article.category_id
       })
    } else{
      this.setState({
        categories,
      });
    }
    // console.log(this.props.articles)

   
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // const Html = convertToRaw(this.state.content.getCurrentContent())
    // console.log(DraftToHtml(Html))

    try {
      await this.props.createArticle({
        title:this.state.title,
        content:convertToRaw(this.state.content.getCurrentContent()),
        image:this.state.image,
        category:this.state.category

      }, this.props.token);

      this.props.noty.success('article created successfully!')

      this.props.history.push('/');

    } catch (errors) {
      
      this.setState({ errors });
      this.props.noty.error('you get error!!!')

    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
    });
  }

  handleEditorState = (editorState) => {
        // console.log(editorState)
        this.setState({content:editorState})
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        editing={this.state.editing}
        article={this.state.article}
        title={this.state.title}
        content={this.state.content}
        category={this.state.category_id}
        handleEditorState={this.handleEditorState}
      />
    );
  }
}

CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateArticle;
