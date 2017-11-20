/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem,Button,ButtonGroup} from 'react-bootstrap';

export default class Item extends React.Component{
  render(){
    return(
      <ListGroupItem>
        <div className="row-fluid">
          <div className="col-sm-2">
            <h5>{this.props.children}</h5>
          </div>
          <div className="text-right">
            <ButtonGroup >
              <Button className='edit' bsStyle="warning">Edit</Button>
              <Button bsStyle="danger">Delete</Button>
            </ButtonGroup>
          </div>
        </div>
      </ListGroupItem>

    )
  }
}