import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const Messages = (props) => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const { id } = useParams()

  fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}/messages`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${props.token}`
  },
  body: JSON.stringify({
    message: {
      content: "Do you still have this?  Would you take $10 less?"
    }
  })
    }).then(response => response.json())
  .then(result => {
    setMessage(result.data.message.content)
    setUser(result.data.message.fromUser)
  })
  .catch(console.error);

    return(
        <div>
        <div style={{borderStyle: 'solid'}}>
            <p><b>From:</b> {user}</p>
            <p><b>Message:</b> {message}</p>
        </div>
        <div>
            <input placeholder='enter message here'/>
            <button>Send Message</button>
        </div>
        </div>
    )
}

export default Messages;