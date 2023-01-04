import ReactDOM from 'react-dom/client';
//import {createRoot} from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Login from './components/Login';
import Posts from './components/Posts';
import Register from './components/Register';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import SinglePost from './components/SinglePost';
import Messages from './components/Messages'

// for my morning self: how to loop over data and then loop over posts?
// https://onedebos.wordpress.com/2020/01/21/using-map-on-a-subarray-in-an-array-of-objects/



const App = ()=> {
  const [token, setToken] = useState(null);  
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  // https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts
  
  
  //  useEffect(()=> {
  //   fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${ token }`
  //   },
  // })
  //   .then( response => response.json())
  //   .then( json => setPosts(json.data.posts));
  // }, []);
  
  const fetchPosts = () => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    },
    })
      .then( response => response.json())
      .then( (json) => {
        setPosts(json.data.posts);
      })
      .catch(console.error);
  }
    const exchangeTokenForUser = () => {
      const token = window.localStorage.getItem('token');
      setToken(token);
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
      fetchPosts()
    }, [token]);
  
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
 
    })
    .catch( err => console.log(err));
    }

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
        <Route path='/posts' element= { <div>{ <Posts posts={ posts } token={token}/> }</div>}/>
        <Route path='/posts/:id' element={<div>{ <SinglePost posts={ posts } token={token} />}</div>} />
        <Route path='/login' element={ <div>{ 
        <Login 
        token={ token } 
        setToken={ setToken } 
        exchangeTokenForUser={ exchangeTokenForUser}
        setPosts={setPosts}
        user={user}
        setUser={setUser}/> }</div>}/>
        <Route path='/register' element={ <div>
          { <Register 
          registerUsername={ registerUsername }
          setRegisterUsername={ setRegisterUsername }
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          registerBtn={registerBtn}
          /> }</div>}/>
        <Route path='/home' element={ <div>{ <Home/> }</div>}/>
        <Route path='/new' element={ <div>{ <NewPost token={ token }/> }</div>}/>
        <Route path='/edit' element={<div>{ <EditPost /> }</div>} />
        <Route path='/posts/:id/messages' element={ <div>{ <Messages token={ token } />}</div>} />
      </Routes> 
    </div>
 
  );
};
// const rootElement = document.getElementById('#root');
// const root = createRoot(rootElement);
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
