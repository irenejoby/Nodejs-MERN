import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default class UserNow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          info: ''
        };
        // to get the info without clicking anywhere. thts y axios here
        axios.get('http://localhost:3500/users/profile', {})
             .then(function (response) {
                var me = {
                  name: response.data.name,
                  email:response.data.email,

                }
                this.setState({
                  info:me
                });

             }.bind(this)).catch(function (error) {
                //  console.log(error.response.data);
                 window.location.href ='/login';
             });
      }
    componentWillMount(){

    }

    render(){
        return (
          <div>
            <h3>Welcome, {this.state.info.name}</h3>

            <h4>{this.state.info.email}</h4><br/>

          </div>
        );
    }
}
