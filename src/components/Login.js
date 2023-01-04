import React, { useState, useEffect } from 'react';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginBtn = (ev) => {
      ev.preventDefault();
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: loginUsername,
          password: loginPassword
        }
      })
    }).then(response => response.json())
      .then(result => {
        if(!result.success){
          throw result.error;
        }
        const token = result.data.token;
        window.localStorage.setItem('token', token);
        exchangeTokenForUser();
        })
        .catch( err => console.log(err));
    }
    const exchangeTokenForUser = () => {
      const token = window.localStorage.getItem('token');
      props.setToken(token);
      if(token){
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    },
    })
    .then(response => response.json())
    .then(result => {
      const user = result.data;
      props.setUser(user)
    })
    .catch(console.error);
  
      }
    };

  
    const logout = () => {
      window.localStorage.removeItem('token');
      props.setUser({});
    }
  
    return(
      <div>
        {
          props.user._id ? <div>Welcome { props.user.username }!<button onClick={ logout }>Logout</button></div> : null
        }
      <form onSubmit= { loginBtn }>
        <input 
        placeholder='username' 
        value={ loginUsername } 
        onChange = { ev => setLoginUsername(ev.target.value) }
        />
        <input 
        placeholder='password'
        type="password"
        value={ loginPassword }
        onChange = { ev => setLoginPassword(ev.target.value) }
         />
        <button>Login</button>
      </form>
    </div>
    )
  }
  

  export default Login;