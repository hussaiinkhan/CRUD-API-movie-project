const http = require("http")   
require("dotenv").config()

const getReq = require('./methods/get-request')
const postReq = require('./methods/post-request')
const putReq = require('./methods/put-request')
const deleteReq = require('./methods/delete-request')
let movies = require('./data/movies.json')

const PORT = process.env.PORT || 5001            //Creating port if our port is available in environmental variables use it else use 5001

const server = http.createServer((req,res)=>{    //Creating http server. it get req and response as parameter in an arrow function
        req.movies = movies
        switch (req.method) {
            case 'GET':
                getReq(req,res)
                break;
            case 'POST':
                postReq(req,res)
                break;
            case 'PUT':
                putReq(req,res)
                break;
            case 'DELETE':
                deleteReq(req,res)
                break;
            default:
                res.statusCode = 404    //response has 4 part: statusCode, setHeader, write, end
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({title : 'Not Found', message : 'Route not Found'}))
                res.end()
                break;
        }
})

server.listen(PORT,()=>{                         //Listening the server
    console.log(`Server started at ${PORT}`)
})