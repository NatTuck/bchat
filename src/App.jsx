import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { init } from './llama';

function App() {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    init();
  });

  return (
    <>
      <h1>Vite + React</h1>
      <p>Wllama?</p>
    </>
  )
}

export default App
