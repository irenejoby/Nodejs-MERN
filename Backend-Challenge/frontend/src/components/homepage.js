import React from 'react';
import axios from 'axios';

import Message from './message';

export default class RegistrationPage extends React.Component
{
  constructor(props){
    super(props);
    this.state ={
      frmData: {
          name: "",
          email: "",
          passwd : "",
          conf_passwd: ""
},
// to show error message in form in the browser.
      msg: {
          name: "",
          email: "",
          passwd : "",
          conf_passwd: ""
},
      success: ""
    }
      this.hdlChange = this.hdlChange.bind(this);
      this.hdlSubmitUser = this.hdlSubmitUser.bind(this);
// Register ends***************************************************************
this.state = {
    frmData: {
      email: '',
      passwd: ''
    },
    msg: {
      email: '',
      passwd: ''
    }
}

this.handleChange     = this.handleChange.bind(this);
this.handleSubmitUser = this.handleSubmitUser.bind(this);
// Login ends********************************************************
  }
  hdlSubmitUser(event){
      event.preventDefault();
      this.setState({
          success: ''
      });

      axios.post('http://localhost:3500/users/register', this.state.frmData)
           .then(function (response) {
              this.setState({
                // showing the error message
                  msg: {
                    name: '',
                    email: '',
                    passwd: '',
                    conf_passwd: ''
                  },
                  success: <Message text="Thanks for registration. " />

              });
              // clearing entry data and  error

              this.refs.name.value = '';
              this.refs.email.value = '';
              this.refs.passwd.value = '';
              this.refs.conf_passwd.value = '';
          }.bind(this))
           .catch(function (error) {
               if (error.response) {
                   let mainErrors = error.response.data.errors,
                       msg = {

                          name: mainErrors.name ? mainErrors.name.msg : '',
                          email: mainErrors.email ? mainErrors.email.msg : '',
                          passwd: mainErrors.passwd ? mainErrors.passwd.msg : '',
                          conf_passwd: mainErrors.conf_passwd ? mainErrors.conf_passwd.msg : ''
                       };
                   this.setState({
                       msg: msg
                   });
               }
           }.bind(this));
  }

  hdlChange(element){
    // console.log(element.target.value)
    var temp = this.state.frmData;
    temp[element.target.name] = element.target.value;

    this.setState({
      frmData: temp

    });
  }
  // register ends*********************************************
  handleSubmitUser(event){
      event.preventDefault();
      this.setState({
        success: ''
      });
      axios.post('http://localhost:3500/users/login', this.state.frmData)
           .then(function (response) {
            window.location.href = '/profile'
          })

           .catch(function (error) {
               if (error.response) {
                   let mainErrors = error.response.data.errors,
                       msg = {
                          email: mainErrors.email ? mainErrors.email.msg : '',
                          passwd: mainErrors.passwd ? mainErrors.passwd.msg : ''
                       };
                   this.setState({
                       msg: msg
                   });
               }
           }.bind(this));
  }

  handleChange(element){
      var temp = this.state.frmData;
      temp[element.target.name] = element.target.value;

      this.setState({
          frmData: temp

      });
  }
  // login ends**********************************************

    render(){
        return (
          <div>
          <h1>Howdy,Welcome to Reddit</h1>
          <h5>Registration Form</h5>
          {this.state.success}

          <form action="" method="POST" onSubmit={this.hdlSubmitUser}>

                  <div className="form-group">
                      <label>Email</label>
                      <input onChange={this.hdlChange} type="text" name="email" ref="email" className="form-control" />
                      <span className="text-danger">{this.state.msg.email}</span>
                  </div>
                  <div className="form-group">
                      <label>Name</label>
                      <input onChange={this.hdlChange} type="text" name="name" ref="name" className="form-control" />
                      <span className="text-danger">{this.state.msg.name}</span>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input onChange={this.hdlChange} type="password"  name="passwd" ref="passwd" className="form-control" />
                      <span className="text-danger">{this.state.msg.passwd}</span>
                  </div>
                  <div className="form-group">
                      <label>Confirm Password</label>
                      <input onChange={this.hdlChange} type="password" name="conf_passwd" ref="conf_passwd" className="form-control" />
                      <span className="text-danger">{this.state.msg.conf_passwd}</span>
                  </div>
                  <input type="submit" value="Register" />
              </form>

              <h4>Login Form</h4>
              <form action="" method="POST" onSubmit={this.handleSubmitUser}>
                  <div className="form-group">
                      <label>Email Address</label>
                      <input onChange={this.handleChange} type="text" name="email" ref="email" className="form-control" />
                      <span className="text-danger">{this.state.msg.email}</span>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input onChange={this.handleChange} type="password" name="passwd" ref="passwd" className="form-control" />
                      <span className="text-danger">{this.state.msg.passwd}</span>
                  </div>
                  <input type="submit" value="Login" />
              </form>
          </div>
        )
    }
}
