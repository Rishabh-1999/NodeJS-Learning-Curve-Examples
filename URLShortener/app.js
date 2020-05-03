const express = require("express");
const connectDB = require("./config/db");

const app = express();

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

/* Connect to Mongoose */
connectDB()

app.use(
    express.json({
        extented: false,
    })
);

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"))



const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server Running");
});