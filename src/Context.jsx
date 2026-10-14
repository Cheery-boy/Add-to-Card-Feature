import { useReducer, useState } from "react";
import { createContext } from "react";
import React from 'react'
import ReducerFn from "./ReducerFn";


export const CartContext = createContext()
const initialState = {
  cart: [],
  totalPrice : 0

}

function Context({ children }) {
  
  const [sidebar, setSidebar] = useState()
  const [state, dispatch] = useReducer(ReducerFn, initialState)

  console.log(state);
  

  return (

    <CartContext.Provider value={{ sidebar, setSidebar, dispatch , state }}>

      {children}
    </CartContext.Provider>
  )
}

export default Context
