const express = require('express')
const app = express()
app.use(express.json());
const port = 3000
var mongoose = require('mongoose')
const UUID = require('uuid-int');
const generator = UUID(0);

var mongoDB = 'mongodb://127.0.0.1/CookingRecipes'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    postRecipes: Array,
    purchasedRecipes: Array,
    buyTransaction: Array,
    sellTransaction: Array,
    cookingCoin: Number
}, { collection: 'user' });
const user = mongoose.model('user', userSchema);

const recipeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    author: String,
    purchase: Array
}, { collection: 'recipe' })
const recipe = mongoose.model('recipe', recipeSchema)

const orderSchema = new mongoose.Schema({
    id: Number,
    item: Number,
    date: Date,
    price: Number,
    seller: String,
    buyer: String,
}, { collection: 'order' })
const order = mongoose.model('oder', orderSchema)


app.get('/user', (req, res) => {
    id = req.query.id
    //console.log(id)
    user.find({ id: id }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

app.get('/userBalance', (req, res) => {
    username = req.query.username
    user.find({
        username: username, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                res.json(data)
            }
        }
    })
})

app.get('/recipeById', (req, res) => {
    id = req.query.id
    console.log(id)
    recipe.find({ id: id }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

app.get('/recipe', (req, res) => {
    recipe.find({}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

app.get('/allRecipes', (req, res) => {
    author = req.query.author
    console.log(author)
    recipe.find({ author: author }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            //console.log(data)
            res.json(data)
        }
    })
})

app.post('/addRecipe', (req, res) => {
    console.log(req.body)
    uuid = generator.uuid()
    recipe.insertMany([{
        id: uuid,
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        author: req.body.author,
        purchase: []
    }], function (err) {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.send()
        } else {
            user.findOneAndUpdate({ username: req.body.author }, {
                $addToSet: {
                    postRecipes: uuid
                }
            }, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("success")
                    res.send()
                }
            })
        }
    })

})

app.post('/updateRecipe', (req, res) => {
    console.log(req.body)
    recipe.findOneAndUpdate({
        id: req.body.id
    }, {
        $set: {
            title: req.body.title,
            price: req.body.price, description: req.body.description
        },
    }, function (err, docs) {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.send()
        } else {
            res.send()
        }
    })
})

app.post('/deleteRecipe', (req, res) => {
    console.log(req.query.id)
    id = req.query.id
    recipe.deleteOne({ id: id }, function (err) {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.send()
        } else {
            res.send()
        }
    })
})

app.get('/order', (req, res) => {
    id = req.query.id
    console.log(id)
    order.find({ id: id }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

app.post('/transaction', (req, res) => {
    recipeId = req.body.recipeId
    buyer = req.body.buyer
    seller = req.body.seller
    price = req.body.price
    // console.log(recipeId)
    // console.log(buyer)
    // console.log(seller)
    // console.log(price)
    orderId = generator.uuid()
    getBuyerBalance = async () => await user.find({ username: buyer }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            return data
        }
    })
    getSellerBalance = async () => await user.find({ username: seller }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            return data
        }
    })
    createOrder = async () => await order.insertMany([{
        id: orderId,
        item: recipeId,
        date: new Date(),
        price: price,
        seller: seller,
        buyer: buyer
    }], function (err) {
        if (err) {
            console.log(err)
        }
    })
    substractMoneytoBuyer = async (buyerBalance) => await user.findOneAndUpdate({ username: buyer }, {
        $addToSet: {
            purchasedRecipes: recipeId,
            buyTransaction: orderId
        },
        $set: {
            cookingCoin: buyerBalance - price
        }
    }, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            return doc
        }
    })
    addMoneytoSeller = async (sellerBalance) => await user.findOneAndUpdate({username:seller}, {
        $addToSet:{
            sellTransaction: orderId
        },
        $set: {
            cookingCoin: sellerBalance + price
        }
    }, function(err, doc){
        if(err){
            console.log(err)
            return 
        }else{
            return doc
        }
    })
    updateRecipe = async () => await recipe.findOneAndUpdate({id: recipeId}, {
        $addToSet:{
            purchase: buyer
        }
    }, function(err, doc){
        if(err){
            console.log(err)
        }else{
            return doc
        }
    })
    Promise.all([getBuyerBalance(), getSellerBalance(), createOrder()]).then((values) => {
        buyerBalance = values[0][0].cookingCoin
        sellerBalance = values[1][0].cookingCoin
        console.log(buyerBalance)
        console.log(sellerBalance)
        return Promise.all([addMoneytoSeller(sellerBalance), substractMoneytoBuyer(buyerBalance), updateRecipe()])
    }).then((values) => {
        console.log(values)
        res.send()
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})