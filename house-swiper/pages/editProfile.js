import Nav from '../components/editProfile/Nav'
import Body from "../components/editProfile/Body"
import { useState } from "react"
import axios from "axios"

// export default function EditProfile (){
//     return(
//         <div>
//             <Nav></Nav>
//             <Body></Body>
//         </div>
// }

export default function EditProfile() {  
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")
  
    const submit = async event => {
      event.preventDefault()
  
      const formData = new FormData();
      formData.append("image", file)
      formData.append("caption", caption)
      await axios.post("http://localhost:5000/api/posts", formData, { headers: {'Content-Type': 'multipart/form-data'}})
    } 
  
    return (
       <form onSubmit={submit}>
         <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>
         <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
         <button type="submit">Submit</button>
       </form>
    )
  }