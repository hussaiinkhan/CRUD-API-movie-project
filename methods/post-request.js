const crypto = require('crypto')    // a core module to generate uuid
const reqBodyParser = require('../util/body-parser')     // because we are getting data from client side to server we need these two
const writeToFile = require('../util/write-to-file')

module.exports = async (req,res)=>{             //To create something new in our data we use POST Method
    if (req.url==='/api/movies')    
    try {
        let body = await reqBodyParser(req)   
        body.id = crypto.randomUUID()
        req.movies.push(body)                   // pushing hte whole body into our data 
        writeToFile(req.movies)                 // pushing the changed data into file
        res.writeHead(201,{'Content-Type':'application/json'})     //we are not pushing data into file so we will not get the updated data in the movies.json which is our database so need to create a file system and I created it in util folder with name 'write-to-file.js'
        res.end()                                       //Whenever we are sending a data stream which is sent by client to the server we need body parser. In express we simply install body parser.
    } catch (error) {                                   //We have created our own body parser in util folder.
            console.log(error)
            res.writeHead(400,{'Content-Type':'application/json'})
            res.end(JSON.stringify({title:'Validation Filed',
                                    message:'Request body not found'
        }))
    }                              
    else {
            res.writeHead(404,{'Content-Type': 'application/json'})
            res.end(JSON.stringify({title : 'Not Found', message : 'Route not Found'}))
          }

}