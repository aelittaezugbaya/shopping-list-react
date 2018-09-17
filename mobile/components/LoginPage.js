import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Username"}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={this.onPressLogin}>
            <Text style={styles.buttonText}> Log in </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  input: {
    width: 300,
    height: 40,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 40
  },
  button: {
    backgroundColor: "black",
    width: 300,
    height: 45,
    marginTop: 10,
    padding: 5,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    color: "#fff"
  }
});
