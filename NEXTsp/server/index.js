require('dotenv').config();
const express = require('express');
const app = express();
const port = 3101;
const mongoose = require('mongoose');

app.use(express.json()); // Move this line up

const authRouter = require('./Routes/auth');
const postRouter = require('./Routes/post');

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

// Connect to MongoDB
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

// Routes
// create API for get data from server
app.get('/api', (req, res) => {
    res.json({ success: true, message: 'This is API for Nextsp' });
});
//create API for login and register form client

app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({ success: true });
});
app.post('/api/login', (req, res) => {
    console.log(req.body);
    res.json({ success: true });
});



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Máy chủ Express đang lắng nghe trên cổng ${port}`);
});

 
