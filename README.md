# CookingRecipes

Implemented Functionality: User add, delete, edit recipes. Users buy recipes. User profile. Show all recipes.  Data consistency: update recipe buyers and sellers info and their cooking coin correspondingly. 
 
Don’t have time to do: transaction history, favorite list, dynamoDB connection, lambda connection. 
 
1. I use expo to simulate the app on an ios device. Frontend was written by React Native. Please go to Cooking Recipes and run “expo start” the app on a stimulator.
 
2. I use backend Node js and local mongoDB for testing. Backend is in the folder and can be run as "Node app.js"
 
3. For the database, I import some user information before the testing since I didn't implement the user registration function. "user1.json" and "user2.json" are two files I import to my local mongoDB.
 
4. I put the DynamoDB set up file in a folder in CookingRecipes since I don't have time to connect with my app.
 
5. For the lambda challenge, I am still learning how to connect it with DynamoDB.