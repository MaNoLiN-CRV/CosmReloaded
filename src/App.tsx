
import './App.css'
import AnimatedSections from './components/AnimatedSections'
import LanguageScroll from './components/LanguageScroll'

import { LogoIntro } from './components/initial/LogoIntro'
import People from './components/credits/People'
import MobileFrameworks, { Framework } from './components/mobile/MobileFrameworks'


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

const languages = [
  {
    name: 'Rust',
    icon: '/icons/rust.svg',
    color: '#e34f26'
  },
  {
    name: 'TypeScript',
    icon: '/icons/ts.png',
    color: '#1572b6'
  },
  {
    name: 'Java',
    icon: '/icons/java.png',
    color: '#f7df1e'
  },
  {
    name: 'Dart',
    icon: '/icons/dart.png',
    color: '#0175c2'
  },

]

const mobileFrameworks : Framework[] = [
  {
    name: 'Flutter',
    icon: '/mobile_frameworks/flutter.png',
    color: '#02569b'
  },
  {
    name: 'React Native',
    icon: '/mobile_frameworks/react-native.png',
    color: '#61dafb'
  },
  {
    name: 'Kotlin',
    icon: '/mobile_frameworks/kotlin.png',
    color: '#0095d5'
  }
]

function App() {
  return (
    <>
      <AnimatedSections>
         <LogoIntro />
         <LanguageScroll languages={languages}/>
         <MobileFrameworks frameworks={mobileFrameworks}/>
         <People people={team}/>
      </AnimatedSections>
     
    </>
  )
}

export default App
