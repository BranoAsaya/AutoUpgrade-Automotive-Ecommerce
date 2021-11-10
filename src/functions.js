const mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient,
  ObjectId = mongodb.ObjectId,
  url = "mongodb://localhost:27017/",
  client = MongoClient.connect(url),
  // DBname = "store",
  // collection = "products",
  axios = require("axios"),
  fs = require("fs");

const JsonProducts=fs.readFileSync("products.json",'utf8')
const objProducts=JSON.parse(JsonProducts)


//products//

function APIdatabase(req, res, DB, collection) {
  client
    .then((data) => {
      console.log("connected");
      let database = data.db(DB);
      database
        .collection(collection)
        .find({})
        .toArray()
        .then((docs) => {
          res.send(docs);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
function addDocToDB(req, res, DB, collection) {
  let body = req.body;


  client
    .then((data) => {
      console.log("add one");
      let database = data.db(DB);
      database
        .collection(collection)
        .insertOne(body)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
function deleteDocFromDB(req, res, DB, collection) {
  let params = req.params.id;
  
  let object = { _id: ObjectId(params) };
  client
    .then((data) => {
      console.log("delete one");
      let database = data.db(DB);
      database
        .collection(collection)
        .deleteOne(object)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
function updateDocFromDB(req, res, DB, collection) {
  let body = req.body;
  let params = req.params.id;
  let object = { _id: ObjectId(params) };
  let update = {
    $set: {
      name: body.name,
      price: body.price,
      category: body.category,
      description: body.description,
      pics: body.pics,
    },
  };
  client
    .then((data) => {
      console.log("new one");
      let database = data.db(DB);
      database
        .collection(collection)
        .updateOne(object, update)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}


//products//

//Cart//

function createNewCart(req, res, DB, collection) {
  let object = { products: [], sum: 0 };
  client
    .then((data) => {
      let database = data.db(DB);
      database
        .collection(collection)
        .insertOne(object)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

function findDocFromDB(req, res, DB, collection) {
  let params = req.params.id;
  let object = { _id: ObjectId(params) };
  client
    .then((data) => {
      let database = data.db(DB);
      database
        .collection(collection)
        .findOne(object)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

function pushDocToCart(req, res, DB, collection) {
  let id = req.params.id;
  let product = req.body;
  console.log(id);
  let cartId = { _id: ObjectId("61897b6ff3a750cc79ba1f9e") };
  let update = { $push: { products: product } };
  client
    .then((data) => {
      console.log("new item");
      let database = data.db(DB);
      database
        .collection(collection)
        .findOneAndUpdate(cartId, update)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
function deleteDocFromCart(req, res, DB, collection) {
  let params = req.params.id;
  let object = { _id: params };
  let cartId = { _id: ObjectId("61897b6ff3a750cc79ba1f9e") };
  let pull = { $pull: { products: object } };
  client
    .then((data) => {
      console.log("new item");
      let database = data.db(DB);
      database
        .collection(collection)
        .findOneAndUpdate(cartId, pull)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

//Cart//

//Contact//
function createNewMessage(req, res, DB, collection) {
  let params = req.params.id;
  let object = {message:params}
console.log(params);

  client
    .then((data) => {
      let database = data.db(DB);
      database
        .collection(collection)
        .insertOne(object)
        .then((doc) => {
          res.send(doc);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

//Contact//

module.exports = {
  APIdatabase,
  addDocToDB,
  deleteDocFromDB,
  updateDocFromDB,
  findDocFromDB,
  pushDocToCart,
  deleteDocFromCart,
  createNewCart,
  createNewMessage,
  
};
