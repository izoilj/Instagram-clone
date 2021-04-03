import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';

function App() {
  // const [posts, setPosts] = useState([
  //   {
  //     username: "joy", 
  //     caption: "Wow it works", 
  //     imageUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"
  //   },
  //   {
  //     username: "juyoung", 
  //     caption: "Yooooooo", 
  //     imageUrl: "https://images.unsplash.com/photo-1572450732467-5eb1311e7bc8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"
  //   },
  //   {
  //     username: "lee", 
  //     caption: "YammmYammmm", 
  //     imageUrl: "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/10/vitaminDfood-1132105308-770x553.jpg"
  //   }
  // ]); //Hook

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
  //[] -> 안에 있는 코드가 무엇이든 페이지가 새로 고쳐질때 한번 실행된다
  //      다시는 실행되지 않는다? Tha's it never run again?
  //onSnapshot(snapshot) -> 문서가 추가될때마다 변경사항이 문서를 업데이트함
  //        every tima a new post is added, this code fires


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
