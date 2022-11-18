
import Nav from '../components/mainpage/Nav'
import Body from '../components/mainpage/Body'
export default function MainPage(props) {
  return (
    <div >
      <Nav />
      <Body data = {props.text}/>
    </div>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API

  const res = await fetch(`http://localhost:5000/`)
  const data = await res.json()

  // Pass data to the page via props
  return {
     props: {
        text : data.text 
     } 
    }
}