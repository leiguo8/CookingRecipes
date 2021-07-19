import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
export default class EditRecipes extends Component {
    constructor(props) {
        super(props)
        let params = this.props.route.params
        this.state = {
            id: params.id,
            title: params.title,
            description: params.description,
            price: String(params.price)
        }
    }
    updateRecipe = () => {
        console.log(this.state)
        fetch("http://localhost:3000/updateRecipe",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then(res => {
            if(res.status == 200){
                alert("Success")
                this.props.navigation.navigate('My Recipes', {username: this.props.route.params.author})
            }
            else{
                alert("Error")
            }
        })
    }
    render() {
        let params = this.props.route.params
        return (
            <View style={styles.container}>
                <Text>Title: </Text>
                <TextInput style = {styles.input} value={this.state.title} 
                onChangeText = {(text) => {this.setState({title: text})}}/>
                <Text>Description: </Text>
                <TextInput style = {styles.input} value={this.state.description} 
                onChangeText = {(text) => {this.setState({description: text})}}/>
                <Text>Price: </Text>
                <TextInput style = {styles.input} value={this.state.price} 
                onChangeText = {(text) => {this.setState({price: text})}}/>
                <Button title= "Submit" onPress = {this.updateRecipe}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
    },
});