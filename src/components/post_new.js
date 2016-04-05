import React, {Component, PropTypes}  from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import {createPost } from '../actions/index';
import {Link } from 'react-router';

class PostsNew extends Component{
    static contextTypes = {
      router: PropTypes.object
    }

    onSubmit(props){ // props here is not this.props of component. Its the properties of the form, that is title, categories and content
      this.props.createPost(props)  // remember that this returns a Promise with the payload in it. If the promise is resolved, we know post has been successfully created
      .then(()=>{
        this.context.router.push('/');
      })
    }

  render(){
    // const title = this.props.fields.title;
    // const categories = this.props.fields.categories;
    // const content = this.props.fields.content;
    // const handleSubmit = this.props.handleSubmit;

    const { fields:{title, categories, content}, handleSubmit } = this.props; // same as above 4 lines
    //below we are spreading the fields from redux-form to the input fields, because we want that all the properties for
    // a field are available to the <input> element of the component. Some of the properties are functions like 'onChange' and 'onBlur' etc.
    //See the documentaion for more inf. This is opposed to passing the properties in the props like 'onChange' = {onChange} since that will have to be
    //retrieved by calling this.props.onChange(). We do not want that. We want every property of redux-form to be available to the form element.

    // handleSubmit is also provided by redux-form but it needs an action to be created from application developer.

    // when form is submitted at onSubmit, handleSubmit will be called with contents of the form. If the form is valid,
    //handleSubmit will call the action creator for contents of the form = props which will have title, categories and contents
    //take the argument as the action creator which is an object containing fields
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create a new blog</h3>
          <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
            <label>Title</label>
            <input type="text" className="form-control" {...title}/>
            <div className="text-help">
              {title.touched ? title.error : ''}
            </div>
          </div>
          <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
            <label>Categories</label>
            <input type="text" className="form-control" {...categories}/>
            <div className="text-help">
              {categories.touched ? categories.error : ''}
            </div>
          </div>
          <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`} >
            <label>Content</label>
            <textarea className="form-control" {...content} />
            <div className="text-help">
              {content.touched ? content.error : ''}
            </div>
          </div>
          <button type="submit" className="btn btn-primary"> Submit </button>
          <Link  to="/" className="btn btn-danger"> Cancel </Link>
      </form>
    )
  }
}

function validate(values){
  const errors={}
  if(!values.title){
    errors.title="Enter a username";
  }
  if(!values.categories){
    errors.categories="Enter categories";
  }
  if(!values.content){
    errors.content="Enter some content";
  }
  return errors;

}

//connect: 1st arg : mapStateToProps, 2nd mapDispatchToProps.
//reduxForm: 1st arg: form config,  2nd : mapStateToProps, 3rd mapDispatchToProps.
// as you see reduxForm has one more argument, we will provide the arguments .

function mapDispatchToProps(dispatch){
  return bindActionCreators({createPost}, dispatch);
}

PostsNew = reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, mapDispatchToProps)(PostsNew);

export default PostsNew;
