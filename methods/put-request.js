module.exports = async (req,res)=>{   //to update any existing data we use PUT Method
const reqBodyParser = require('../util/body-parser')    // because we are getting data from client side to server we need these two
const writeToFile = require('../util/write-to-file')
let baseUrl = req.url.substring(0,req.url.lastIndexOf('/')+1)   // we got the '/api/theThingWeAreDealingWith/'
let id = req.url.split('/')[3]   // gave us the id 
const regexV4 = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i)

    if (baseUrl === '/api/movies/' && regexV4.test(id)){
        let body = await reqBodyParser(req)
        const index = req.movies.findIndex((movies)=>{
            return movies.id === id
        })
        if (index ===-1){  // -1 means movie not found. If found its index will be from 0-any number
            res.statusCode = 404
            res.write(JSON.stringify({title : 'Not Found', message : 'Movie not Found'}))
            res.end()
        }
        else{
          req.movies[index]= {id,...body}  // this will keep the id of the movie same and replace the content of the required movie
          writeToFile(req.movies)
          res.writeHead(204,{'Content-Type':'application/json'})
          res.end(JSON.stringify(req.movies[index]))
        }
        }
    else if (!regexV4.test(id)){
        res.writeHead(400,{'Content-Type': 'application/json'})
        res.end(JSON.stringify({title : 'Validation Failed', message : 'UUID not Found'}))
    }
    else {
        res.writeHead(404,{'Content-Type': 'application/json'})
        res.end(JSON.stringify({title : 'Not Found', message : 'Route not Found'}))
    }
}

