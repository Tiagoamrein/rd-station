import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RDStationAuth from './components/RDStationAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RDStationAuth />
    </>
  )
}

export default App
