/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap';
import {endpoint} from '../common/constants';

import socketIOClient from "socket.io-client";

export default class Input extends React.Component{

  constructor(props){
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
    this.state = {
      response: false,
      items:[]
    };
  }
  componentDidMount(){


  }
  onSubmit(ev){
    ev.preventDefault();
    // ev.preventDefault();
    let name = 'name='+encodeURIComponent(this.input.value)
    window.fetch('/api/items/',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:name
    }).then(res=>res);
    const socket = socketIOClient(endpoint);
    socket.emit("new item", this.input.value );
    this.form.reset()
  }

  render(){
    return(
      <ListGroupItem key="input">
        <form ref={ref => this.form = ref} onSubmit={this.onSubmit}>
          <div className="row-fluid">
            <div className="col-md-11 col-sm-10 col-xs-8">
              <input ref={ref => this.input = ref} type="text" className="form-control" placeholder="Enter food name and press add"/>
            </div>
            <div className="text-right">
              <Button bsStyle='primary' type="submit"><i className="fa fa-plus"/></Button>
            </div>
          </div>
        </form>
      </ListGroupItem>

    )
  }
}