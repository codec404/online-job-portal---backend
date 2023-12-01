//Creating the server

//Libaries
import express from 'express'
import dotenv from 'dotenv' //for more security of private data
import 'express-async-errors'

//Middlewares
import cors from 'cors'
import morgan from 'morgan'

//Files -- >{routes,config,middlewares}
import connectDB from './config/db.js'
import testRoute from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobsRoute from './routes/jobsRoute.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

//Security Packages
import helmet from 'helmet'
import xssClean from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//API Documentation Using Swagger
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'

//configure dotenv
dotenv.config()

//Database Connnection
connectDB()

//Swagger api config
// Swagger api options
const options = {
    definition:{
        //All these Formats are present in the official documentation --> api documentation
        openapi: "3.0.0",
        info:{
            title: 'Job Portal Application',
            description: 'Node ExpressJS Job Portal application'
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    //In which folder that swagger can get the api
    apis: ['./routes/*.js'],
}
const spec = swaggerDoc(options)

// const PORT = 8080

//REST object
const app = express() // Features of express in app

//middlewares -- we need to clarify that we are gonna use json
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//Security Middleware
app.use(helmet())
app.use(xssClean()) // To prevent Cross side scripting attack
//Protecting the database
app.use(mongoSanitize()) //prevents sql injection

//HomeRoute
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec)) //Documentation can be created in the format given in swagger editor

//routes
// app.get('/',(req,res) => {
//     res.send('<h1>Welcome to Job Portal</h1>')
// })
app.use('/api/v1/test',testRoute)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/job', jobsRoute)

//Validation Middleware custom
app.use(errorMiddleware)

//listen to port
const PORT = process.env.PORT || 8080
app.listen(PORT,() => {
    // console.log(`Server Running on port ${PORT}`);
})