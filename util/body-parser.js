module.exports = async (req)=>{
    return new Promise((resolve,reject)=>{
        try {
            let body = ""
            req.on('data',(chunk)=>{
                body += chunk
            })
            req.on('end',()=>{
                resolve(JSON.parse(body))    //JSON parsing is the process of converting a JSON object in text format to a Javascript object that can be used inside a program. 
            })                            //stringify() : This method takes a JavaScript object and then transforms it into a JSON string. JSON. parse() : This method takes a JSON string and then transforms it into a JavaScript object.
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}