/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from 'react';
import {ListGroupItem,Button,ButtonGroup} from 'react-bootstrap';

export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state={
      buttons:[<Button bsStyle="success" onClick={()=>this.onClickDone()}>Done</Button>,
        <Button bsStyle="danger" onClick={()=>this.onClickDelete()}>Delete</Button> ],
      text:[this.props.children,<del>{this.props.children}</del>]
    }

  }
  componentWillMount(){
    let index = this.props.item.done ? 1 : 0;
    this.setState({
      index: index
    })
  }
  onClickDone(ev){
    console.log(this.props.item._id)
    window.fetch(`/api/items/${this.props.item._id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        this.setState({
          index:1
        })
      })

  }

  onClickDelete(){
    window.fetch(`/api/delete/${this.props.item._id}`,{
      method: 'DELETE',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then(res=>res.json())
      .then(data=>console.log(data))
  }

  render(){
    const button = this.state.buttons[this.state.index];
    const text = this.state.text[this.state.index];
    return(
      <ListGroupItem key={this.props.item._id}>
        <div className="row-fluid">
          <div className="col-md-9 col-sm-2 col-xs-1">
            <h5>{text}</h5>
          </div>
          <div className="text-right">
            {button}
          </div>
        </div>
      </ListGroupItem>

    )
  }
}
