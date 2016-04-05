import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}  from 'redux';
import {Link} from 'react-router';
import {fetchPosts} from '../actions/index'


 class PostIndex extends Component  {
  componentWillMount() {
   this.props.fetchPosts();
  }

  renderPosts(){

   return  this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id} >
          <Link to={"posts/"+post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      )

    })
  }

  render(){
    return(<div>

         <div className="text-xs-right">
          <Link to="posts/new" className="btn btn-primary">Add a new post</Link>
        </div>
        <div>
          <ul className="list-group">
             {this.renderPosts()}
          </ul>
        </div>

        
       </div>)
  }
}

function mapStateToProps(state){
  return {posts: state.posts.all};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
