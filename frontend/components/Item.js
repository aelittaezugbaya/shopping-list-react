/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem,Button,ButtonGroup} from 'react-bootstrap';
import socketIOClient from "socket.io-client";

export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state={
      response: false,
      buttons:[<Button bsStyle="success" key="done" onClick={()=>this.onClickDone()}><i className="fa fa-check"/></Button>,
        <Button bsStyle="danger" key="delete" onClick={()=>this.onClickDelete()}><i className="fa fa-times"/></Button> ],
      text:[this.props.children,<del>{this.props.children}</del>],
      endpoint: "http://127.0.0.1:8000",
    }

  }
  componentWillMount(){
    let index = this.props.item.done ? 1 : 0;
    this.setState({
      index: index
    })
  }
  onClickDone(ev){

    window.fetch(`/api/items/${this.props.item._id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          index:1
        })
      })

  }

  onClickDelete(){
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('delete item',this.props.item.name);
    window.fetch(`/api/delete/${this.props.item._id}`,{
      method: 'DELETE',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
  }

  render(){
    const button = this.state.buttons[this.state.index];
    const text = this.state.text[this.state.index];
    return(
      <ListGroupItem key={this.props.item._id}>
        <div className="row-fluid">
          <div className="col-md-9 col-sm-2 col-xs-1">
            <h5>{text}</h5>
          </div>
          <div className="text-right">
            {button}
          </div>
        </div>
      </ListGroupItem>

    )
  }
}
