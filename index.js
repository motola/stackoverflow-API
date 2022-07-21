const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const postRouter = require('./router/postsRoutes');

connectDB();
const app = express(); 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json('Welcome to stackoverflow account')
});



app.use('/posts', postRouter)

 app.listen(port, () => console.log(`Server is running on port ${port}`))