/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap'

export default class Input extends React.Component{

  constructor(props){
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onSubmit(ev){
    ev.preventDefault();
    let name = 'name='+encodeURIComponent(this.input.value)
    console.log(this.input.value)
    window.fetch('/api/items/',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:name
    }).then(res=>res.json())
      .then(data=>console.log(data));
  }

  render(){
    return(
      <ListGroupItem>
        <form onSubmit={this.onSubmit}>
          <div className="row-fluid">
            <div className="col-md-11 col-sm-10 col-xs-8">
              <input ref={ref => this.input = ref} type="text" className="form-control" placeholder="Enter food name and press add"/>
            </div>
            <div className="text-right">
              <Button bsStyle='primary' type="submit">Add</Button>
            </div>
          </div>
        </form>
      </ListGroupItem>

    )
  }
}