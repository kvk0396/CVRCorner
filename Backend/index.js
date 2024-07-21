const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute');
const cookieParser = require('cookie-parser');
const app = express()
const PORT = process.env.PORT || 3000;
//Database connection
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected...');
    }
    catch(err){
        console.error(err.message);
        
    }
}

dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})