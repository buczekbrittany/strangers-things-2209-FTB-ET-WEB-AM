import React, { useState } from 'react';
import CreatePost from './CreatePost';


const NewPost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    return(
      <div>
        {/* this was just a test to pass the information, now make a form with inputs */}
        <form onClick={() => CreatePost(title, description, price, props.token)}>
        <input 
        placeholder='title' 
        value={ title } 
        onChange = { ev => setTitle(ev.target.value) }
        />
        <input 
        placeholder='description' 
        value={ description } 
        onChange = { ev => setDescription(ev.target.value) }
        />
        <input 
        placeholder='price' 
        value={ price } 
        onChange = { ev => setPrice(ev.target.value) }
        />

        <button>Submit New Post</button>
        </form>
      </div>
    )
  
    }

export default NewPost;