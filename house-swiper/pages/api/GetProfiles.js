async function handler(req,res){
    try {
        const response = await fetch("http://localhost:5000/profiles", {
            credentials: 'include',
            method : "GET",
            headers : {
                "content-type" : "application/json"
            }
        })   
        const data = await response.json() 
        console.log(data) 
        res.json(data)     
        
    } catch (error) {
      console.log("this is from the handler" + error)  
    }
}

export default handler