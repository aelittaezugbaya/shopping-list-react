import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>{this.props.title}</Text>
          <TouchableOpacity style={styles.button}>
            <Text> Check </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 70,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    marginLeft: 10
  },
  button: {
    marginRight: 10
  }
});
