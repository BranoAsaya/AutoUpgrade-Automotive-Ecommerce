const express = require("express"),
  app = express(),
  path = require("path"),
  publicPath = path.join(__dirname, "..", "public"),
  functions = require("./functions"),
  DBname="store";

app.use(express.json());
app.use(express.static(publicPath));

app.get("/", (req, res) => {});

//products//

app.get("/productsAPI", (req, res) => {
  functions.APIdatabase(req, res, DBname, "products");
});
app.post("/AddProduct", (req, res) => {
  functions.addDocToDB(req, res, DBname, "products");
});
app.delete("/deleteProduct/:id", (req, res) => {
  functions.deleteDocFromDB(req, res, DBname, "products");
});
app.patch("/updateProduct/:id", (req, res) => {
  functions.updateDocFromDB(req, res, DBname, "products");
});
app.get("/findOneProduct/:id", (req, res) => {
  functions.findDocFromDB(req, res, DBname, "products");
});

//Cart//
app.get("/cartsAPI", (req, res) => {
  functions.APIdatabase(req, res, DBname, "carts");
});
app.post("/newCart", (req, res) => {
  functions.createNewCart(req, res, DBname, "carts");
});
app.get("/findOneCart/:id", (req, res) => {
  functions.findDocFromDB(req, res, DBname, "carts");
});
app.patch("/addToCartProducts", (req, res) => {
  functions.pushDocToCart(req, res, DBname, "carts");
});
app.patch("/deleteFromCart/:id", (req, res) => {
  functions.deleteDocFromCart(req, res, DBname, "carts");
});

//Cart//

//Contact//
app.get("/contactsAPI", (req, res) => {
  functions.APIdatabase(req, res, DBname, "contacts");
});
app.post("/newContactsMassage/:id", (req, res) => {
  functions.createNewMessage(req, res, DBname, "contacts");
});
app.delete("/deleteMassage/:id", (req, res) => {
  functions.deleteDocFromDB(req, res, DBname, "contacts");
});

//Contact//
const PORT = process.env.PORT
app.listen(PORT);
