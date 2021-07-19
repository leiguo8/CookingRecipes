
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class User extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {text: ''}
  }
  userHandler = () => {
      this.props.navigation.navigate('User Profile', {userId: this.state.text})
  };
  onChangeTextHandler = (text) => {
    this.setState({text:text})
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Use user ID to view profile</Text>
        <TextInput style={styles.input} onChangeText={this.onChangeTextHandler} 
        value={this.state.text} keyboardType="numeric" />
        <Button title="View Profile" onPress={this.userHandler} />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
  },
});