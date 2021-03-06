import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './imageUpload';

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
  const [openSignIn, setOpenSignIn] = useState(false);
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
        setUser(authUser);
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
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []); 

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
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

      <Modal
        open={openSignIn}
        onClose={() => openSignIn(false)}
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
            <Button type="submit" onClick={signIn}>Sign in</Button>            
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

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>

      <div className="app_posts">
        {
          posts.map(({id, post}) => (
            <Post key={id}
              username={post.username} 
              caption={post.caption}
              imageUrl={post.imageUrl} 
            />
          ))
        }
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry, you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
