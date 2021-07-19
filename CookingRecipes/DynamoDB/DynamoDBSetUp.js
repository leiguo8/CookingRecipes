const config = require('./config.js');

var AWS = require("aws-sdk");

AWS.config.update(config.aws_remote_config);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Order",
    KeySchema: [       
        { AttributeName: "buyer", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "N" },
        { AttributeName: "item", AttributeType: "N" },
        { AttributeName: "date", AttributeType: "S" },
        { AttributeName: "price", AttributeType: "N" },
        { AttributeName: "seller", AttributeType: "S" },
        { AttributeName: "buyer", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

