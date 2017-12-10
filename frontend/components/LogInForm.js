import React from 'react';
import jwt_decode from 'jwt-decode';
import socketIOClient from "socket.io-client";

export default class LogInForm extends React.Component{
  constructor(props){
    super(props)
    this.logIn= this.logIn.bind(this)
  }

  logIn(ev){
    ev.preventDefault();
    const data = 'username=' + encodeURIComponent(this.username.value) +
      '&password=' + encodeURIComponent(this.password.value)+'&role='+encodeURIComponent('user');
    window.fetch('/api/login',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    }).then(data => data.text())
      .then(data => {
        console.log(data)
        const user = jwt_decode(data);
        window.localStorage.accessToken = data;
        const endpoint = `/ws`;
        const socket = socketIOClient(endpoint);
        socket.emit("login", window.localStorage.accessToken)
      })
      .catch(err => console.log(err));


  }

  render(){
    return(
      <form onSubmit={this.logIn}>
        <h4>Please login into the system</h4>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input ref ={ref=>this.username=ref} type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input ref ={ref=>this.password=ref} type="password" className="form-control" id="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    );
  }
}

