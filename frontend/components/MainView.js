import React from 'react';
import {ListGroup,ListGroupItem ,FormGroup,FormControl,Button} from 'react-bootstrap';
import Item from './Item';
import Input from'./Input';
import Header from './Header';

const square = { width: 610, height: 60 }



export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
    this.state={
      food:['milk','sugar'],
    }
  }
  componentWillMount(){

  }
  onSubmit(ev){
    ev.preventDefault();
    let ar = this.state.food;
    ar.push(this.input.value);
    this.setState({
      food: ar
    })

    console.log(this.input.value)
  }
  
  render(){
    const items = this.state.food.map(food => <Item key={food}>{food}</Item>)
   return(
     <div className="container">
       <Header/>
       <ListGroup>
         <ListGroupItem>
           <form onSubmit={this.onSubmit}>
             <div className="row-fluid">
               <div className="col-md-11 col-sm-10 col-xs-8">
                 <input ref={ref => this.input = ref} type="text" className="form-control" placeholder="Enter food name and press add"/>
               </div>
               <div className="text-right">
                 <Button bsStyle='primary' type="submit">Submit</Button>
               </div>
             </div>
           </form>
         </ListGroupItem>
         {items}
       </ListGroup>
     </div>
   );
  }
}
