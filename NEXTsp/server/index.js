require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(express.json()); // Move this line up

const authRouter = require('./Routes/auth');
app.use('/api/auth', authRouter);

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l4ybpeb.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

connectDB();

app.get('/', (req, res) => {
    res.send('Xin chào, đây là trang chính của tôi!');
});

app.listen(port, () => {
    console.log(`Máy chủ Express đang lắng nghe trên cổng ${port}`);
});
