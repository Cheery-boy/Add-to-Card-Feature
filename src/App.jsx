import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ProductHomePage from './ProductHomePage'
import CartAsideBar from './CartAsideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductHomePage/>
      <CartAsideBar/>
    </>
  )
}

export default App
