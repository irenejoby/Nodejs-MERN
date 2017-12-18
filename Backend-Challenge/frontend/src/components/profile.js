// post.js
import React from 'react';
import axios from 'axios';

import NewPost from './newpost';
import UserNow from './usernow';
import PostList from './postlist';

export default class Profile extends React.Component
{
  constructor(props){
    super(props);

    this.state ={
      table: ''
    };
    axios({method:'get',
           url:'http://localhost:3500/posts/getpost',
           data: {}
         })
         .then(function (response) {
           var newArray = response.data.map( (item, key)=> {
             return <PostList item={item} key={key} />
           });
                this.setState({
                  table:newArray
                });
             }.bind(this))
              .catch(function (error) {
                console.log(error);
             });
  }
  render(){
    return(
      <div>
      <UserNow />
      <NewPost />
      <table className="">
          <tbody>
            {this.state.table}
          </tbody>
      </table>
      </div>
    );
  }
}
// post
