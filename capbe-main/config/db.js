import mongoose from "mongoose";

function connectDB() {
    const MONGO_URL = process.env.MONGO_URL;
    mongoose.connect(MONGO_URL);
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log('Error in DB Connection', err);
    });

    db.once('connected', () => {
        console.log('DB Connected');
    });
}
export{connectDB};