if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
console.log(process.env.STRIPE_PUBLIC_KEY)
console.log(process.env.STRIPE_SECRET_KEY)

app.get("/store", function (req, res) {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("store.ejs", {
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
        items: JSON.parse(data),
      });
    }
  });
});

app.post("/purchase", function (req, res) {
  console.log(req.body)
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      const itemsJson = JSON.parse(data);
      console.log(itemsJson)
      const itemsArray = itemsJson.music.concat(itemsJson.merch);
      let total = 0;
      req.body.items.forEach(function (item) {
        const itemJson = itemsArray.find(function (i) {
          return i.id == item.id;
        });
        console.log(itemJson)
        if (itemJson != null)
          total = total + itemJson.price * item.quantity;
      });

      stripe.charges
        .create({
          amount: total,
          source: req.body.stripeTokenId,
          description: "Nothing testing",
          currency: "usd",
        })
        .then(function () {
          console.log("Charge Successful");
          res.json({
            message: "Successfully purchased items"
          });
        })
        .catch(function (err) {
          console.log(err)
          console.log("Charge Fail");
          res.status(500).end();
        });
    }
  });
});

app.listen(3000);