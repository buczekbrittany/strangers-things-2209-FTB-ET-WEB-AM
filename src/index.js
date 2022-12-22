import ReactDOM from 'react-dom/client';
//import {createRoot} from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';



const Posts = (props)=> {
  const posts = props.posts;
 
  return (
    <div>
      <h1>Posts</h1>
      <ul>
       {
       //console.log(props.posts)
        posts.map( post => {
          return(
            <div id="card">
            <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{ post.title }</Link>
            <p><b>Price:</b> { post.price }</p>
            <p><b>Description:</b> { post.description }</p>
            <p><b>Created at:</b>{ post.createdAt }</p>
            <p><b>Updated at:</b>{ post.updatedAt }</p>
            <p><b>Author:</b> { post.author.username }</p>
            {/* {post.isAuthor ? <button>Edit</button> : null} */}
            {/* {post.isAuthor ? <button>Delete</button> : null} */}
            </li>
            </div>
          );
        })
        }
      </ul>
    </div> 
  );
}

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const registerBtn = (ev) => {
    ev.preventDefault();
    console.log('hello world');
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: registerUsername,
      password: registerPassword
    }
  })
})
.then(response => response.json())
.then(result => {
  if(!result.success){
    throw result.error;
  }
  const token = result.data.token;
  console.log(token);  
})
.catch( err => console.log(err));
}

// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2EwMjc1ZTI2NDJmZDAwMTdiYTNhZjIiLCJ1c2VybmFtZSI6InRoZW8iLCJpYXQiOjE2NzE0NDAyMjJ9.G7jxsxkVjhhdt_cYAbtMmJLG8dpXKxRCfLJhMYAWyAw


  return (
    <div>
      <form onSubmit= { registerBtn } >
        <input 
        placeholder='username' 
        value={ registerUsername } 
        onChange = { ev => setRegisterUsername(ev.target.value) }
        />
        <input
        placeholder='password'
        value={ registerPassword }
        onChange = { ev => setRegisterPassword(ev.target.value) }
        />
        <button>Register</button>
      </form>
    </div>
  )
}

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const loginBtn = (ev) => {
    ev.preventDefault();
    console.log('hello');
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
        console.log(result);
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
    setUser(user)
  })
  .catch(console.error);

    }
  };

  useEffect( () => {
    exchangeTokenForUser();
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
  }



  return(
    <div>
      {
        user._id ? <div>Welcome { user.username }!<button onClick={ logout }>Logout</button></div> : null
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



const Home = () => {
  console.log("hello");
}



// for my morning self: how to loop over data and then loop over posts?
// https://onedebos.wordpress.com/2020/01/21/using-map-on-a-subarray-in-an-array-of-objects/


const App = ()=> {
  // https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts
  const [posts, setPosts] = useState([]);
   useEffect(()=> {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
    .then( response => response.json())
    .then( json => setPosts(json.data.posts));
  }, []);

  return (
    <div>
      <h1 align="center">Strangers Things</h1>
      <nav>
        <Link to='/home'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        <Link to='/posts'>Posts ({ posts.length })</Link>
        
      </nav>
      <Routes>
        <Route path='/posts' element= { <div>{ <Posts posts={ posts } /> }</div>}/>
        <Route path='/login' element={ <div>{ <Login/> }</div>}/>
        <Route path='/register' element={ <div>{ <Register/> }</div>}/>
        <Route path='/home' element={ <div>{ <Home/> }</div>}/>
      </Routes> 
    </div>
 
  );
};
// const rootElement = document.getElementById('#root');
// const root = createRoot(rootElement);
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
