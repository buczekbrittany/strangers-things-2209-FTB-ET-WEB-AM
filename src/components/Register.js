import React, { useState } from 'react';


const Register = (props) => {
  //   const [registerUsername, setRegisterUsername] = useState('');
  //   const [registerPassword, setRegisterPassword] = useState('');
  
  //   const registerBtn = (ev) => {
  //     ev.preventDefault();
  //     console.log('hello world');
  //     fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
  //     method: "POST",
  //     headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     user: {
  //       username: registerUsername,
  //       password: registerPassword
  //     }
  //   })
  // })
  // .then(response => response.json())
  // .then(result => {
  //   if(!result.success){
  //     throw result.error;
  //   }
  //   const token = result.data.token;
  //   console.log(token);  
  // })
  // .catch( err => console.log(err));
  // }
  
  // token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2EwMjc1ZTI2NDJmZDAwMTdiYTNhZjIiLCJ1c2VybmFtZSI6InRoZW8iLCJpYXQiOjE2NzE0NDAyMjJ9.G7jxsxkVjhhdt_cYAbtMmJLG8dpXKxRCfLJhMYAWyAw
  
  
    return (
      <div>
        <form onSubmit= { props.registerBtn } >
          <input 
          placeholder='username' 
          value={ props.registerUsername } 
          onChange = { ev => props.setRegisterUsername(ev.target.value) }
          />
          <input
          placeholder='password'
          value={ props.registerPassword }
          onChange = { ev => props.setRegisterPassword(ev.target.value) }
          />
          <button>Register</button>
        </form>
      </div>
    )
  }

  export default Register;