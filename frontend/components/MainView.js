import React from 'react';
import {ListGroup,ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap';
import Item from './Item';
import Input from'./Input';
import Header from './Header';
import socketIOClient from "socket.io-client";


export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.getItems=this.getItems.bind(this);
    this.state = {
      endpoint: "http://127.0.0.1:8000",
      items:[]
    };
  }
  componentWillMount(){
    this.getItems();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("get items", data => {
      let newAr = this.state.items;
      this.getItems();
      newAr.push(data)
      this.setState({ items: newAr });
    });
    socket.on('update items',data=>{
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

    let items=this.state.items.length!=0 ? this.state.items.map(food => food._id ?
      <Item item={food} key={food._id}>{food.name}</Item> : ''
    ): '';

    return(
     <div className="container">
       <Header/>
       <ListGroup>
          <Input/>
         {items}
       </ListGroup>
     </div>
    );
  }
}
