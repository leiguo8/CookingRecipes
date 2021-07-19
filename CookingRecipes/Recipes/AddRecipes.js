import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Form from 'react-native-form'

export default class AddRecipes extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            description: "",
            price: "",
            author: props.route.params.username,
        }
    }

    submitHandler = () => {
        fetch("http://localhost:3000/addRecipe", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then(res => {
            if(res.status == 200){
                alert("Success")
                this.setState({title: "", price: "", description: ""})
            }
            else{
                alert("Error")
            }
        })
    }

    render() {
        return (
            /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
            <Form>
                <Text>Title:</Text>
                <View>
                    <TextInput type="TextInput" style={styles.input} name="title" 
                    onChangeText = {(text) => {this.setState({title: text})}} value = {this.state.title}/>
                </View>
                <Text>Description:</Text>
                <View>
                    <TextInput type="TextInput" style={styles.input} name="description" 
                    onChangeText = {(text) => {this.setState({description: text})}} value = {this.state.description}/>
                </View>
                <Text>Price:</Text>
                <View>
                    <TextInput type="TextInput"  style={styles.input} name="price" 
                    onChangeText = {(text) => {this.setState({price: text})}} keyboardType="numeric" value = {this.state.price}/>
                </View>
                <Button title="Submit" onPress = {this.submitHandler}/>
            </Form>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        letterSpacing: 1,
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
    },
});