import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Banner from '../../Banner';

const CreateArticleForm = ({
  handleInputChange, categories, handleSubmit, errors,editing,article,title,category,content,handleEditorState
}) => ((
  <div>
    {/* Header */}
    <Banner
      backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
      title={editing ? `ویرایش ${article.title}` : 'Create the article'}
    />
    {/* END Header */}
    {/* Main container */}
    <main className="main-content">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <ul className="list-group">
                {errors.map(error => <li key={error.message} className="list-group-item text-danger">{error.message}</li>)}
              </ul>
              <form className="p-30 bg-gray rounded" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-12 my-5">
                    <input type="file" className="form-control" onChange={handleInputChange} name="image" />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Title"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <select name="category" value={category} onChange={handleInputChange} id className="form-control form-control-lg">
                      <option value>Select category</option>
                      {categories.map(category =>
                        <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  {/* <textarea
                    className="form-control form-control-lg"
                    rows={4}
                    placeholder="Content"
                    name="content"
                    value={content}
                    onChange={handleInputChange}
                    defaultValue=""
                  /> */}
                  <Editor 
                    editorState={content}
                    onEditorStateChange={handleEditorState}
                    /*  onEditorStateChange pass editorState to the parent Component    */

                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    {/* END Main container */}
  </div>
));

CreateArticleForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
  })).isRequired,
};

export default CreateArticleForm;
