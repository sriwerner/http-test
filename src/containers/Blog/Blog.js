import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    axiosConfig = {
        headers: {
            // 'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "http://localhost:3000",
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts', this.axiosConfig)
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, 
                        author: 'Max'
                    }
                })

                this.setState({posts: updatedPosts})
                // console.log(posts);
                
            })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }
    
    render () {
        const posts = this.state.posts.map(
            post => { return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
            />; 
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;