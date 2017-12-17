/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap';
import { socket } from '../common/constants';

export default class Input extends React.Component{
  onSubmit = (ev) => {
    ev.preventDefault();
    
    socket.emit("new item", {
      name: this.input.value,
    });
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
