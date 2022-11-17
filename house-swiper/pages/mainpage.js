
import Nav from '../components/mainpage/Nav'
import Body from '../components/mainpage/Body'
export default function MainPage({data}) {
  return (
    <div >
      <Nav />
      <Body data = {{data}}/>
    </div>
  )
}
export async function getServerSideProps() {
  // Fetch data from external API

  const res = await fetch(`http://localhost:5000/`)
  const data = await res.json()
  console.log("data is " + data)


  // Pass data to the page via props
  return {
     props:  {data}
    }
}