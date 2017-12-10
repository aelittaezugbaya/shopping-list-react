import React from 'react';
import {ListGroup,Alert} from 'react-bootstrap';
import Item from './Item';
import Input from'./Input';
import Header from './Header';
import socketIOClient from "socket.io-client";
import LogInForm from './LogInForm';
import Logout from './Logout'
import {endpoint} from '../common/constants';

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
    console.log(window.location.hostname)
    this.getItems();
    const socket = socketIOClient();
    socket.on("get items", data => {
      this.getItems();
    });
    socket.on('update items',data=>{
      this.getItems();
    })
    socket.on('update status',data=>{
      let index = this.state.items.indexOf(data);
      let newAr = this.state.items;
      newAr.splice(index,1);
      console.log("status")
      this.setState({
        items:newAr
      })
      this.getItems();
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
        <Logout/>
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
