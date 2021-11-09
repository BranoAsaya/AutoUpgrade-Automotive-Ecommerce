const express = require("express"),
  app = express(),
  path = require("path"),
  publicPath = path.join(__dirname, "..", "public"),
  functions = require("./functions");

app.use(express.json());
app.use(express.static(publicPath));

app.get("/", (req, res) => {});

//products//

app.get("/productsAPI", (req, res) => {
  functions.APIdatabase(req, res, "store", "products");
});
app.post("/AddProduct", (req, res) => {
  functions.addDocToDB(req, res, "store", "products");
});
app.delete("/deleteProduct/:id", (req, res) => {
  functions.deleteDocFromDB(req, res, "store", "products");
});
app.patch("/updateProduct/:id", (req, res) => {
  functions.updateDocFromDB(req, res, "store", "products");
});
app.get("/findOneProduct/:id", (req, res) => {
  functions.findDocFromDB(req, res, "store", "products");
});
//Cart//
app.get("/cartsAPI", (req, res) => {
  functions.APIdatabase(req, res, "store", "carts");
});
app.post("/newCart", (req, res) => {
  functions.createNewCart(req, res, "store", "carts");
});
app.get("/findOneCart/:id", (req, res) => {
  functions.findDocFromDB(req, res, "store", "carts");
});
app.patch("/addToCartProducts", (req, res) => {
  functions.pushDocToCart(req, res, "store", "carts");
});
app.patch("/deleteFromCart/:id", (req, res) => {
  functions.deleteDocFromCart(req, res, "store", "carts");
});

//Cart//

//Contact//
app.get("/contactsAPI", (req, res) => {
  functions.APIdatabase(req, res, "store", "contacts");
});
app.post("/newContactsMassage", (req, res) => {
  functions.createNewMessage(req, res, "store", "contacts");
});

//Contact//

app.listen(8080);
