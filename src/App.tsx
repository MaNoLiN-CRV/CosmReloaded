
import './App.css'
import People from './components/People'


const team = [
  {
    name: 'Félix Caba',
    role: 'Founder, Full-Stack Developer',
    image: 'felix.jpg'
  },  
  {
    name: 'Manuel Cervantes',
    role : 'Co-Founder, Full-Stack Developer',
    image : 'manu.jpg'
  }
] 

function App() {
  return (
    <>
     
      <People people={team}/>
    </>
  )
}

export default App
