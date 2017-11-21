import React from 'react';
import {ListGroup,ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap';
import Item from './Item';
import Input from'./Input';
import Header from './Header';

const square = { width: 610, height: 60 }



export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state={
      food:['milk','sugar'],
    }
  }
  componentWillMount(){
    this.getItems();
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
      console.log(data);
      this.setState({
        food:data
      })
    })
  }


  render(){
    const items = this.state.food.map(food => <Item item={food} key={food._id}>{food.name}</Item>)
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
