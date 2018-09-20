import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";

import ListItem from "./ListItem";

import InputListItem from "./InputListItem";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  _renderItems = ({ item }) => <ListItem title={item.key} />;

  render() {
    return (
      <View>
        <FlatList
          data={[{ key: "Milk" }, { key: "Eggs" }]}
          renderItem={this._renderItems}
        />
        <InputListItem />
      </View>
    );
  }
}
