// message.js

import React from 'react';
import axios from 'axios';


export default class NewPost extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      frmData:{
        post: '',
        user: ''

      }
    }
    this.hdlSubmit = this.hdlSubmit.bind(this);
    this.hdlChange = this.hdlChange.bind(this);


  }
  hdlChange(element){
    var temp = this.state.frmData;
    temp[element.target.name] = element.target.value;
    this.setState = ({
      frmData: temp
    });
  }
  hdlSubmit(event){
    event.preventDefault();
    axios({
           method:'post',
           url:'http://localhost:3500/posts/addpost',
           data: this.state.frmData
         })

         .then(function (response) {
           console.log(response);

                window.location.reload(true);

             }.bind(this))
              .catch(function (error) {
                console.log(error);
             });

  }

  logChange(){
  axios.get('http://localhost:3500/users/logout', {})
       .then(function(response) {

           window.location.href = '/';
          //  console.log(response.data);
        }).catch(function (error) {

       });
  }

  render(){
    return(
      <div>
        <br /> <br />
        <a onClick={this.logChange}>LogOut</a><br /><br />

      <form onSubmit={this.hdlSubmit}>
      <br /> <br />
        <textarea onChange={this.hdlChange} ref="post" row="10" cols="30" name="post"></textarea><br /><br />
        <input onChange={this.hdlChange} ref="user" type="text" name="user" /> <br />
        <input type="submit" value="Post" />
      </form>
      </div>
    );
  }
}
