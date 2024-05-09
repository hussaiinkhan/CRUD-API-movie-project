const writeToFile = require("../util/write-to-file")

module.exports = (req,res)=>{
    let baseUrl = req.url.substring(0,req.url.lastIndexOf('/')+1)   // we got the '/api/theThingWeAreDealingWith/'
    let id = req.url.split('/')[3]   // gave us the id 
    const regexV4 = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i)

    if (baseUrl === '/api/movies/' && regexV4.test(id)){
        const index = req.movies.findIndex((movies)=>{
            return movies.id === id
        })
        if (index ===-1){  // -1 means movie not found. If found its index will be from 0-any number
            res.statusCode = 404
            res.write(JSON.stringify({title : 'Not Found', message : 'Movie not Found'}))
            res.end()
        }
        else{
          req.movies.splice(index,1)  //.splice() is a method in JavaScript that adds or removes elements from an array. It modifies the original array and returns the removed items. The method takes two or more parameters. The first parameter represents the index of the array where the changes will begin. The second parameter is the number of elements that will be deleted starting from the first parameter index. If you don't specify the second parameter or set it to zero, then none of the elements in the array at the specified index will be deleted. You can also add new elements by passing them as parameters starting from the third parameter, and they will be added at the index location.
          writeToFile(req.movies)
          res.writeHead(204,{'Content-Type':'application/json'})
          res.end(JSON.stringify(req.movies))
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