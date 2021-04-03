import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

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

  }

  return (
    <div className="app">
     
     <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* {body} */}
        <div style={modalStyle} className={classes.paper}>
          <h2>I am a modal</h2>
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
