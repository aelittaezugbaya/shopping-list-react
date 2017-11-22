import React from 'react';
import MainView from './MainView';
import socketIOClient from "socket.io-client";

export default class App extends React.Component {

  render (){
    return(
      <div>
        <MainView/>
      </div>
    );
  }
}