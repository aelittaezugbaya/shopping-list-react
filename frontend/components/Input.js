/**
 * Created by aelittaezugbaa on 20/11/2017.
 */
import React from "react";
import { ListGroupItem, FormGroup, FormControl, Button } from "react-bootstrap";
import { socket } from "../common/constants";

export default class Input extends React.Component {
  onSubmit = ev => {
    ev.preventDefault();

    if (this.input.value.trim() !== "") {
      socket.emit("new item", {
        name: this.input.value
      });
      this.form.reset();
    }
  };

  render() {
    return (
      <ListGroupItem key="input">
        <form ref={ref => (this.form = ref)} onSubmit={this.onSubmit}>
          <div className="line-container">
            <input
              ref={ref => (this.input = ref)}
              type="text"
              className="form-control main"
              placeholder="Enter food name and press add"
            />
            <div className="text-right">
              <Button bsStyle="primary" type="submit">
                <i className="fa fa-plus" />
              </Button>
            </div>
          </div>
        </form>
      </ListGroupItem>
    );
  }
}
