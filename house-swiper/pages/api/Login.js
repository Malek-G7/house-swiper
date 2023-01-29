
async function handler(req,res){
    try {
        const response = await fetch("http://localhost:5000/profiles/login", {
            credentials: 'include',
            method : "POST",
            body : JSON.stringify(req.body),
            headers : {
                "content-type" : "application/json"
            }
        })   
        const data = await response.json() 
        console.log(data)  
        res.json(data)     
        
    } catch (error) {
      console.log(error)  
    }
}

export default handler