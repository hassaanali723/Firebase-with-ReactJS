import React, { Component } from 'react';
import { firebase } from '@firebase/app'

// var firebase = require('firebase/app');
var uuid = require('uuid');
var firebaseConfig = {
    apiKey: "AIzaSyCRHOOAbBbwJFXlApMt6sbGEnZHT9Plt_I",
    authDomain: "usurvey-961a1.firebaseapp.com",
    databaseURL: "https://usurvey-961a1-default-rtdb.firebaseio.com",
    projectId: "usurvey-961a1",
    storageBucket: "usurvey-961a1.appspot.com",
    messagingSenderId: "921080576880",
    appId: "1:921080576880:web:f56a63be42cb8ef489adb5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



class Usurvey extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer1: '',
                answer1: ''      
            },
            isSubmitted: false
         };
         this.state.nameSubmit = this.state.nameSubmit.bind(this);
    }
    render() { 
        var studentName;
        var questions;

        if(this.state.isSubmitted === false && this.state.studentName === ''){
            studentName = <div>
                 <h3>
                     Please Enter your name
                 </h3>
                <form onSubmit={this.state.nameSubmit}>
                    <input type='text' placeholder='Enter your name' ref='name'></input>
                </form>
            </div> 
        }

        return ( 
            <div>
                {studentName}
                ---------------
                {questions}
            </div>
         );
    }
}
 
export default Usurvey;