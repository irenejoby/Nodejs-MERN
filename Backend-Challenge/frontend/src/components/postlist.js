import React from 'react';
import axios from 'axios';

export default class PostList extends React.Component{
  constructor(props){
    super(props);
  }




  render(){
    return(

      <div>

      <tr>
          <td>
          </td>
          <td></td>
          <td>{this.props.item.post}<br /></td>
          <br /><br />
          <td>uploader:{this.props.item.user}<br /></td>
          <br /><br />
          <td>
          <a onClick={this.hdldelete} className="btn btn-danger btn-xs"
              id={this.props.item._id}>upvote</a>
          </td>
      </tr>
      </div>

    );
  }

}
