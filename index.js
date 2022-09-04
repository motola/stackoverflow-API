const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const connectDB = require('./config/db');

const postRouter = require('./router/postsRoutes');
const userRouter = require('./router/userRoutes');


connectDB();
const app = express(); 
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 3000
 


// Home route 
app.get('/', (req, res) => {
    res.json('Welcome to stackoverflow account')
});

// Configuring Swagger Api
const options = {   
    definition: {
        openapi: "3.0.0",
        info: {
            title: "A Stackoverflow Api",
            version: "1.0.0",
            description:"A stackoverflow Library API"
        },
        servers: [
            {
                url:"http://localhost:3000" 
            }
        ],
    },
    apis: ['./controllers/*.js']
}
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// Declaring Routes
app.use('/posts', postRouter);
app.use('/auth', userRouter);
app.use('/user', userRouter);

 app.listen(port, () => console.log(`Server
  is running on port ${port}`))