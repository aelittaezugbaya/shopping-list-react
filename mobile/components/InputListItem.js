import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.input}
          placeholder={"What do you whant to buy?"}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 70,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "flex-start"
  },
  input: {
    height: 60,
    marginLeft: 10,
    alignSelf: "stretch"
  }
});
