import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'

export default class MyRecipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ""
        }
    }
    componentDidMount() {
        this.getMyRecipes()
    }
    componentDidUpdate(){
        this.getMyRecipes()
    }
    getMyRecipes = async () => {
        try {
            let response = await fetch(`http://localhost:3000/allRecipes?author=${this.props.route.params.username}`)
            const json = await response.json();
            //console.log(json)
            this.setState({ data: json })
        } catch (err) {
            console.log(err)
        }
    }
    removeHandler = (id) => {
        fetch(`http://localhost:3000/deleteRecipe?id=${id}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if(res.status == 200){
                alert("success")
                this.getMyRecipes()
            }else{
                alert("error")
            }
        })
    }
    editHandler = (item) => {
        this.props.navigation.navigate('Edit Recipes', item)
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data} renderItem={({ item }) =>
                    <View>
                        <Text style = {styles.text}>
                            Recipe Id: {item.id} {"\n"}
                            Recipe Title: {item.title} {"\n"}
                            Recipe Description: {item.description} {"\n"}
                            Recipe Price: {item.price} {"\n"}
                            Recipe Author: {item.author} {"\n"}
                            Recipe Purchasers: {item.purchasers}
                        </Text>
                        <Button title="Remove" onPress= {this.removeHandler.bind(this, item.id)}></Button>
                        <Button title="Edit" onPress = {this.editHandler.bind(this, item)}></Button>
                    </View>
                } keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
            </View>
        )
    }
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
    text: {
        fontSize: 20,
        letterSpacing: 1,
    }
});