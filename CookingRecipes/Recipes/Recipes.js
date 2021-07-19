import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

export default class Recipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ""
        }
    }
    componentDidMount() {
        this.renderRecipes()
    }
    renderRecipes = async () => {
        try {
            let response = await fetch("http://localhost:3000/recipe")
            const json = await response.json();
            //console.log(json)
            this.setState({ data: json })
        } catch (err) {
            console.log(err)
        }
    }
    buyHandler = (data) => {
        // console.log(recipeId),
        // console.log(buyer),
        // console.log(seller)
        //console.log(data) 
        let requestBody = {
            recipeId: data[0],
            buyer: data[1],
            seller: data[2],
            price: data[3]
        }
        console.log(requestBody)
        fetch("http://localhost:3000/transaction", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(requestBody)
        }).then(res => {
            if(res.status == 200){
                alert("Success!")
            }else{
                alert("error")
            }
        })
    }
    render() {
        let buyer = this.props.route.params.username
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data} renderItem={({ item }) =>{
                    if(item.author !== buyer){
                        return (<View>
                            <Text style={styles.text}>
                                Recipe Id: {item.id} {"\n"}
                                Recipe Title: {item.title} {"\n"}
                                Recipe Description: {item.description} {"\n"}
                                Recipe Price: {item.price} {"\n"}
                                Recipe Author: {item.author} {"\n"}
                                Recipe Purchasers: {item.purchasers}
                            </Text>
                            <Button title="Buy Me" onPress = {this.buyHandler.bind(this, [item.id, buyer, item.author, item.price])} />
                            <Text>{"\n"}</Text>
                            </View>
                        )
                    }
                    else{
                        return(
                            <View>
                            <Text style={styles.text}>
                                Recipe Id: {item.id} {"\n"}
                                Recipe Title: {item.title} {"\n"}
                                Recipe Description: {item.description} {"\n"}
                                Recipe Price: {item.price} {"\n"}
                                Recipe Author: {item.author} {"\n"}
                                Recipe Purchasers: {item.purchasers}
                            </Text>
                            <Text>{"\n"}</Text>
                        </View>
                        )
                    }
                }                  
                } keyExtractor={(item, index) => index.toString()} />
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
    text: {
        fontSize: 20,
        letterSpacing: 1,
    }
});