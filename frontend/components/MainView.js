import React from 'react';
import {ListGroup,Alert} from 'react-bootstrap';

import Item from './Item';
import Input from'./Input';
import Header from './Header';
import LogInForm from './LogInForm';


import { socket } from '../common/constants';

export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.getItems=this.getItems.bind(this);
    this.state = {
      items:[],
      jwt:window.localStorage.accessToken
    };
  }
  componentWillMount(){

    this.getItems();
    socket.on("get items", data => {
      this.getItems();
    });
  
    socket.on('update item', data => {
      const items = this.state.items.map(
        item => item._id == data._id ? data : item
      );

      this.setState({
        items: items,
      })
    })


  }

  getItems(){
    window.fetch('/api/items/',{
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
      .then(res=>res.json())
      .then(data=>{

      this.setState({
        items:data
      })
    })
  }


  render(){
    let {items,jwt}=this.state;
    let elements=items.length!=0 && typeof items[0] == 'object'? this.state.items.map(food => food._id ?
      <Item item={food} key={food._id}>{food.name}</Item> : ''
    ): '';

    return(
      <div>

       <ListGroup>
         <Input/>
         {items.length==0 ?
           <Alert bsStyle="info">
             <strong>Shopping list is empty!</strong> Add something .
           </Alert>:
         elements
         }
       </ListGroup>
      </div>
    );
  }
}
