/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from "react";
import { ListGroupItem, Button, ButtonGroup } from "react-bootstrap";

import { socket } from "../common/constants";

export default class Item extends React.Component {
  onClickDone = ev => socket.emit("change status", this.props.item);
  onClickDelete = () => socket.emit("delete item", this.props.item);

  getButton() {
    const buttonDone = (
      <Button bsStyle="success" key="done" onClick={this.onClickDone}>
        <i className="fa fa-check" />
      </Button>
    );

    const buttonDelete = (
      <Button bsStyle="danger" key="delete" onClick={this.onClickDelete}>
        <i className="fa fa-times" />
      </Button>
    );

    return this.props.item.done ? buttonDelete : buttonDone;
  }

  getText() {
    return this.props.item.done ? (
      <del className="red">{this.props.children}</del>
    ) : (
      this.props.children
    );
  }

  render() {
    const { item } = this.props;
    return (
      <ListGroupItem key={item._id}>
        <div className="row-fluid">
          <div className="line-container">
            <h5 className="main">{this.getText()}</h5>
            <div>{this.getButton()}</div>
          </div>
        </div>
      </ListGroupItem>
    );
  }
}
