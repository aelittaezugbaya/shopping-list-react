/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap'

export default class Input extends React.Component{
  render(){
    return(
      <ListGroupItem>
        <form>
          <FormGroup>
            <div className="row-fluid">
              <div className="col-sm-11 col-xs-8">
                <FormControl type="text" placeholder="Enter item and press button add"/>
              </div>
              <div className="text-right">
                <Button bsStyle='primary' type="submit">Submit</Button>
              </div>
            </div>
          </FormGroup>
        </form>
      </ListGroupItem>
    )
  }
}