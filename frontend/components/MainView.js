import React from 'react';
import {ListGroup,ListGroupItem ,FieldGroup} from 'react-bootstrap';
import Item from './Item';

const square = { width: 610, height: 60 }



export default class MainView extends React.Component {
  render(){
   return(
     <div className="container">
       <ListGroup>
         <ListGroupItem>
         </ListGroupItem>
         <Item>Milk</Item>
         <Item>Sugar</Item>
       </ListGroup>
     </div>
   );
  }
}
