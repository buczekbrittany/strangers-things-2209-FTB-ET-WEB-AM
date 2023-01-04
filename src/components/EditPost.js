import React, { useState } from 'react';


const EditPost = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const editPostDetails = (title, description, price) => {
        fetch(`http://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${props.id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
              post: {
                title: title,
                description: description,
                price: price,
              }
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(console.error);
    }



    return(
      <div>
        <h2>Edit Post</h2>
        <form onClick={() => editPostDetails(title, description, price)}>
        <input 
        placeholder={props.title}
        value={ title } 
        onChange = { ev => setTitle(ev.target.value) }
        />
        <input 
        placeholder={props.description}
        value={ description } 
        onChange = { ev => setDescription(ev.target.value) }
        />
        <input 
        placeholder={props.price}
        value={ price } 
        onChange = { ev => setPrice(ev.target.value) }
        />
        <button>Edit Post</button>
        </form>
      </div>
    )
      

  }

export default EditPost;