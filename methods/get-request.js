module.exports = (req,res)=>{
    let baseUrl = req.url.substring(0,req.url.lastIndexOf('/')+1)   // we got the '/api/theThingWeAreDealingWith/'
    let id = req.url.split('/')[3]   // gave us the id 
    const regexV4 = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i)

    if (req.url==='/api/movies') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(req.movies))     //req.movies? we have imported movies data in server.js file and declared req.movies = movies
        res.end()
    }
    else if (baseUrl === '/api/movies/' && regexV4.test(id)){
        res.setHeader('Content-Type', 'application/json')
        let filteredMovie = req.movies.filter((movie)=>{   
            return movie.id === id
        })
        if (filteredMovie.length > 0){  // filter function gives us array so if false array will be empty if true the length of array will be greater than 0
            res.statusCode = 200
            res.write(JSON.stringify(filteredMovie))
            res.end()
        }
        else{
            res.statusCode = 404
            res.write(JSON.stringify({title : 'Not Found', message : 'Movie not Found'}))
            res.end()
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