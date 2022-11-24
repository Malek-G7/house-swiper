
async function handler(req,res){
    try {
        const response = await fetch("http://localhost:5000/profiles/", {
            method : "POST",
            body : JSON.stringify(req.body),
            headers : {
                "content-type" : "application/json"
            }
        })   
        const data = await response.json()   
        res.json(data)      
    } catch (error) {
      console.error(error)  
    }
}

export default handler