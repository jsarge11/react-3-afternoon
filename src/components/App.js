import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api',
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind (this);
  }
  
  componentDidMount() {
    axios.get(`${this.state.baseUrl}/posts`).then(res=>{
      this.setState({ posts: res.data })
    })
  }

  updatePost( id, text ) {
    console.log("calling function");
    axios.put(`${this.state.baseUrl}/posts?id=${id}`,{text}).then(res=>{
      this.setState({ posts: res.data })
    })
  }

  deletePost( id, text ) {
    console.log("calling delete");
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then(res=> {
      this.setState({ posts: res.data })
    })
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, {text}).then(res=> {
      this.setState({ posts: res.data})
    })
  }

  searchPost(text) {
    if (text) {
      axios.get(`${this.state.baseUrl}/posts/filter/?text=${text}`).then(res=> {
        this.setState({ posts: res.data})
      })
    }
    else {
      axios.get(`${this.state.baseUrl}/posts`).then(res=> {
      this.setState({ posts: res.data})
      })
    }

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={this.searchPost}/>
       

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />

          {
            posts.map( post => (
              <Post key={ post.id }
                text={post.text}
                date={post.date}
                updatePostFn={this.updatePost} 
                deletePostFn={this.deletePost}
                id={post.id}
                
              
              />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
