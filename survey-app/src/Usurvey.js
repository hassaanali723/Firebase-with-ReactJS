import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';

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

    answerSelected(event){
        var answers = this.state.answers;
        if (event.target.name === 'answer1'){
            answers.answer1 = event.target.value;
        }
        else if (event.target.name === 'answer2'){
            answers.answer2 = event.target.value;
        }

        else if (event.target.name === 'answer3'){
            answers.answer3 = event.target.value;
        }

        this.setState({answers:answers},function(){
            console.log(this.state);
        })

    }
    
    questionSubmit(event){
        event.preventDefault();

        firebase.database().ref('uSurvey/'+this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        

        this.setState({isSubmitted: true},function(){
            console.log(this.state);
        });

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
         this.answerSelected = this.answerSelected.bind(this);
         this.questionSubmit = this.questionSubmit.bind(this);
    }
    render() { 
        var studentName;
        var questions;

        if(this.state.isSubmitted === false && this.state.studentName === ''){
            studentName = <div>
                 <h2>
                     Please Enter your name
                 </h2>
                <form onSubmit={this.nameSubmit}>
                    <input className='input-box' type='text' placeholder='Enter your name' ref='name'></input>
                </form>
            </div>;
            questions = ''; 
        }
        else if(this.state.studentName !== '' && this.state.isSubmitted == false){
            studentName = <h2>Welcome to Usurvey, {this.state.studentName}</h2>
            questions= <div className='questions'>
                <h3>Here are some Questions</h3>
                <form onSubmit = {this.questionSubmit}> 

                    <div className="questions-card">
                    <label>What kind of courses you like the most:</label> <br/>
                    <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
                    <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
                    <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
                    </div>

                    <div className="questions-card">
                    <label>You are a:</label> <br/>
                    <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
                    <input type="radio" name="answer2" value="Employee" onChange={this.answerSelected} />Employee
                    <input type="radio" name="answer2" value="Looking-for-job" onChange={this.answerSelected}/>Looking for job
                    </div>

                    <div className="questions-card">
                    <label>Is online learning helpful:</label> <br/>
                    <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />Yes
                    <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />No
                    <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/>Maybe
                    </div>

                    <input className="submit-btn" type="submit" value="submit" />


                </form>
            </div>
        }

        else if(this.state.isSubmitted === true){
            var studentName = <h3>Thanks {this.state.studentName} for your feedback</h3>
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