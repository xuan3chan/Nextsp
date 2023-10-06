require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./Routes/auth');
const port = 3101;
const mongoose = require('mongoose');
const usermodel = require('./models/User');
const cors = require('cors');
app.use(express.json()); 
app.use(cors());
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

// //Register
// app.post('/register', (req, res) => {
//     const { fullName, email, accountName, password } = req.body;

//     // Check if user exists
//     usermodel.findOne({ $or: [{ email }, { accountName }] })
//         .then(user => {
//             if (user) {
//                 res.json({ message: "Email hoặc tên đăng nhập đã tồn tại" });
//             } else {
//                 const newUser = new usermodel({
//                     fullName,
//                     email,
//                     accountName,
//                     password,
//                 });

//                 newUser.save()
//                     .then(user => {
//                         res.json({ message: "Đăng ký thành công" });
//                     })
//                     .catch(err => {
//                         console.error(err);
//                         res.status(500).json({ success: false, message: 'Internal Server Error' });
//                     });
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ success: false, message: 'Internal Server Error' });
//         });
// });

// app.post('/login', (req, res) => {
//     const { accountName,email, password } = req.body;
//     //check nếu đúng email hoặc tên đăng nhập
//     usermodel.findOne({ $or: [{ email }, { accountName }] })
//         .then(user => {
//             if (user) {
//                 if (user.password === password && user.accountName === accountName || user.email === email) {
//                     res.json({ message: "Đăng nhập thành công" });
//                 } else {
//                     res.json({ message: "Mật khẩu không đúng" });
//                 }
//             } else { message: "Email hoặc tên đăng nhập không tồn tại" });
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ success: false, message: 'Internal Server Error' });
//         });
 
//     });
// Routes
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Máy chủ Express đang lắng nghe trên cổng ${port}`);
});
