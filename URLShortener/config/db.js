const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true
        });

        console.log("MongoDB Conneted")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;