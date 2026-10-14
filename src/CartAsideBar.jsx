import React, { useContext } from 'react'
import { CartContext } from './Context'

function CartAsideBar() {
  const { sidebar, setSidebar, state, cart  , dispatch , totalPrice , discountedPrice} = useContext(CartContext)

  return (
    <aside
      className={`fixed top-0 z-50 flex h-screen w-[500px] flex-col bg-black text-white shadow-2xl transition-all duration-300 ${sidebar ? 'right-0' : '-right-[500px]'
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>

        {/* Cross icon (display only, no click handler yet) */}
        <button onClick={() => { setSidebar(false) }} >
          <svg


            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-white/70"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {state.cart.map((ele) => {
        // price after discount
        const discounted = ele.price - (ele.price * ele.discountPercentage) / 100

        return (
          <div
            key={ele.id}
            className="flex items-center gap-4 rounded-lg border border-white/15 p-3"
          >
            {/* Left: product image */}
            <img
              src={ele.thumbnail}
              alt={ele.title}
              className="h-20 w-20 shrink-0 rounded-md bg-white/10 object-cover"
            />

            {/* Middle: title, price, qty, discount */}
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="text-sm font-medium leading-snug">{ele.title}</h3>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  ${discounted.toFixed(2)}
                </span>
                <span className="text-xs text-white/40 line-through">
                  ${ele.price}
                </span>
                <button type="button" onClick={()=>dispatch({type :'DECREMENT', payload: ele.id })}>-</button>
                <span className="text-xs text-white/40">{ele.qty}</span>
                <button type="button" onClick={()=>dispatch({type : 'INCREMENT' , payload: ele.id})}>+</button>
                <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">
                  -{ele.discountPercentage}%
                </span>
              </div>
            </div>

            {/* Right: cross icon (display only for now) */}
            <button
            onClick={()=>dispatch({type : 'REMOVE_ELEMENT', payload:ele.id }) }
            type="button" className="self-start" aria-label="Remove item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white/50 transition hover:text-white"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )
      })}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="mt-10 text-center text-sm text-white/50">
          Your cart is empty. Add a product to get started.
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-white/15 px-5 py-4">
        <div className="mb-4 flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span>${state.totalPrice.toFixed(2)}</span>
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:bg-white/80"
        >
          Checkout
        </button>
      </div>
    </aside>
  )
}

export default CartAsideBar