import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditPost from './EditPost';
import {Link} from 'react-router-dom';


const SinglePost = (props) => {
    const [edit, setEdit] = useState(false)
    const posts = props.posts;
    const { id } = useParams()
    const deletePost = (id) => {
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
        }
    }).then(response => response.json())
        .then(result => {
        console.log(result);
        })
        .catch(console.error);
    }



    return(
        <div>
        {
              posts.map( post => {
                if (post._id === id) {
                return(
                <div id="card" key={post._id}>
                  <li>
                  {post.isAuthor ? <button onClick={() => setEdit(true)}>Edit</button> : null}
                  {post.isAuthor ? <button onClick={() => deletePost(post._id)}>Delete</button> : null}
                  {!post.isAuthor ? <div><Link to={`/posts/${id}/messages`}><button>Send a Message</button></Link></div> : null}
                  <h2>{ post.title }</h2>
                  <p><b>Price:</b> { post.price }</p>
                  <p><b>Description:</b> { post.description }</p>
                  <p><b>Created at:</b>{ post.createdAt }</p>
                  <p><b>Updated at:</b>{ post.updatedAt }</p>
                  <p><b>Author:</b> { post.author.username }</p>
                  </li>
                  { (edit === true) ? <div>
                    <EditPost 
                    id={id}
                    title={post.title}
                    price={post.price}
                    description={post.description}
                    token={props.token}
                  /></div> : null }   
                  </div>
                );} 
              })
            } 
        </div>
    )
}

export default SinglePost;