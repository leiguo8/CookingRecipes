import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.route.params.userId,
            UserProfile : {
                postRecipes:[],
                purchasedRecipes:[],
                sellTransaction:[],
                buyTransaction:[]
            }
        }
        console.log(this.props.route.params.userId)
    }
 
    getUserProfile = async () =>{
        try {
            const response = await fetch(
              `http://localhost:3000/user?id=${Number(this.state.userId)}`
            );
            const json = await response.json();
            if(json.length== 0){
              return
            }
            //console.log(json[0])
            this.setState({UserProfile: json[0]})
            // console.log(json)
          } catch (error) {
            console.error(error);
          }
    }
    componentDidMount(){
        this.getUserProfile()
    }

    componentDidUpdate(){
        this.getUserProfile()
    }
    allRecipesHandler = () =>{
        this.props.navigation.navigate('All Recipes', {username: this.state.UserProfile.username})
    }
    addRecipes = () =>{
        this.props.navigation.navigate('Add Recipes', {username: this.state.UserProfile.username})
    }
    myRecipes = () => {
        this.props.navigation.navigate('My Recipes', {username: this.state.UserProfile.username})
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    User Id: {this.state.UserProfile.id}{"\n"}
                    Username: {this.state.UserProfile.username}{"\n"}
                    CookingCoin: {this.state.UserProfile.cookingCoin}{"\n"}
                    PostRecipes: {this.state.UserProfile.postRecipes.join(", ")}{"\n"}
                    purchasedRecipe: {this.state.UserProfile.purchasedRecipes.join(", ")}{"\n"}
                    sellTransaction: {this.state.UserProfile.sellTransaction.join(", ")}{"\n"}
                    buyTransaction: {this.state.UserProfile.buyTransaction.join(", ")}
                </Text>
                <Button title="View All Recipes" onPress={this.allRecipesHandler}/>
                <Button title="Add Recipes" onPress={this.addRecipes}/>
                <Button title="My Recipes" onPress={this.myRecipes}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text:{
        fontSize:20,
        letterSpacing:1,
    }
});