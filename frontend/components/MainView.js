import React from 'react';
import {ListGroup,ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap';
import Item from './Item';
import Input from'./Input';
import Header from './Header';

const square = { width: 610, height: 60 }



export default class MainView extends React.Component {
  render(){
   return(
     <div className="container">
       <Header/>
       <ListGroup>
         <Input/>
         <Item>Milk</Item>
         <Item>Sugar</Item>
       </ListGroup>
     </div>
   );
  }
}
