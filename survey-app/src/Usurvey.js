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

    nameSubmit(event){
        event.preventDefault();
        var studentName = this.refs.name.value;
        this.setState({studentName: studentName},function(){
            console.log(this.state)
        });
        console.log('abc');

    }

    constructor(props) {
        super(props);
        this.state = { 
            uid: uuid.v1(),
            studentName: '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''      
            },
            isSubmitted: false
         };
         this.nameSubmit = this.nameSubmit.bind(this);
    }
    render() { 
        var studentName;
        var questions;

        if(this.state.isSubmitted === false && this.state.studentName === ''){
            studentName = <div>
                 <h3>
                     Please Enter your name
                 </h3>
                <form onSubmit={this.nameSubmit}>
                    <input type='text' placeholder='Enter your name' ref='name'></input>
                </form>
            </div>;
            questions = ''; 
        }
        else if(this.state.studentName != '' && this.state.isSubmitted == false){
            studentName = <h2>Welcome to Usurvey, {this.state.studentName}</h2>
            questions= <p>Hey</p>
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