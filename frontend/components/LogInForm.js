import React from 'react';
import jwt_decode from 'jwt-decode';
import MainView from './MainView';
import {Button} from 'react-bootstrap'


export default class LogInForm extends React.Component{
  constructor(props){
    super(props)
    this.logIn= this.logIn.bind(this)

    if( window.localStorage.accessToken) {
      const jwt = jwt_decode(window.localStorage.accessToken);
      const expired = new Date(jwt.exp * 1000);
      const now = new Date();

      if( expired < now) {
        delete window.localStorage.accessToken;
      }
    }

    this.state={
      jwt: window.localStorage.accessToken
    }
  }

  logIn(ev){



    ev.preventDefault();
    const data = 'username=' + encodeURIComponent(this.username.value) +
      '&password=' + encodeURIComponent(this.password.value, {
        path: '/ws'
      });
    window.fetch('/api/login',{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    }).then(data => data.text())
      .then(data => {
        const user = jwt_decode(data);
        window.localStorage.accessToken = data;
        this.setState({
          jwt:data
        });
      })
      .catch(err => console.log(err));


  }

  Logout(){
    delete window.localStorage.accessToken;
    this.setState({
      jwt:window.localStorage.accessToken
    });
  }

  render(){
    let {jwt}=this.state;
    return(
      <div>
      {jwt ?
        <div>
          <Button bsStyle="link" className='logout' onClick={()=>this.Logout()}>Log out <i className="fa fa-sign-out" aria-hidden="true"></i></Button>
          <MainView/>
        </div>
        :
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
       }
      </div>
    );
  }
}

