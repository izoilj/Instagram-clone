import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // evry single time any authentication happen, doing
  useEffect(() => {
    const unsubscriobe =
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user login
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName) {
        //   //don't update username
        // }
        // else {
        //   // if we jest create someone
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      }
      else {
        //user log out
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup action
      unsubscriobe();
    }
  }, [user, username]);

// useEffect : Runs a piecs of code based on a specific condition
  useEffect(() => {
    // This is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []); 

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* {body} */}
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img 
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="" 
              className="app_headerImage"
              />
            </center>

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Button onClick={handleLogin}>Login</Button> */}
            <Button type="submit" onClick={signUp}>Sign up</Button>            
          </form>
        </div>
      </Modal>

      {/*Header*/}
      <div className="app_header">
        <img 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt="" 
          className="app_headerImage"
        />
      </div>

      {/* <Button onClick={signUp}>Sign up</Button> */}
      <Button onClick={() => setOpen(true)}>Sign up</Button>
      <h1>Hellodsfsdfsdfdsfsdfsdfsdfsfdsfsdfsdfsdfsd</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id}
            username={post.username} 
            caption={post.caption}
            imageUrl={post.imageUrl} 
          />
        ))
      }

      {/*call the Post.js conponent*/}
      {/* <Post username="joy" caption="Wow it works" imageUrl="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80" /> */}
      {/* <Post username="juyoung" caption="Yooooooo" imageUrl="https://images.unsplash.com/photo-1572450732467-5eb1311e7bc8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80" /> */}
      {/* <Post username="lee" caption="YammmYammmm" imageUrl="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/10/vitaminDfood-1132105308-770x553.jpg" /> */}

    </div>
  );
}

export default App;
