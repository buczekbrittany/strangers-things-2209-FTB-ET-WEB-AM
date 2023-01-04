import React from 'react';
import { Link, useNavigate} from 'react-router-dom';



const Posts = (props)=> {
    const posts = props.posts;
    const navigate = useNavigate();

    return (
      <div>
        <h1>Posts</h1>
        <button onClick={() => navigate("/new")}>Create Post</button>
          <ul>
          {
          //console.log(props.posts)
            posts.map( post => {
              return(
              <div id="card" key={post._id}>
                <li>
                <Link to={`/posts/${post._id}`}>{ post.title }</Link>
                <p><b>Price:</b> { post.price }</p>
                <p><b>Description:</b> { post.description }</p>
                <p><b>Created at:</b>{ post.createdAt }</p>
                <p><b>Updated at:</b>{ post.updatedAt }</p>
                <p><b>Author:</b> { post.author.username }</p>
                </li>      
                </div>
              );
            })
            }
          </ul>
      </div> 
    );
  }

  export default Posts;