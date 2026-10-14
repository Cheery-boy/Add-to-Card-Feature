import React, { useContext } from 'react'
import { CartContext } from './Context'

function ProductCard({ data }) {
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    thumbnail,
    availabilityStatus,
    shippingInformation,
    returnPolicy,
    warrantyInformation,
    tags = [],
    reviews = [],
  } = data

  // Price after applying the discount
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2)

  const lowStock = availabilityStatus === 'Low Stock'

  const {sidebar, setSidebar , dispatch} = useContext(CartContext)
  function handleAddToCart() {
    setSidebar(true)
    // setCross(true)
    dispatch({type: 'ADD_TO_CART' , payload : data})
    console.log(data);
    

  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-56 w-full object-contain"
        />
        <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white">
          -{discountPercentage}%
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
            lowStock ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {availabilityStatus}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="capitalize">{category}</span>
          {brand && <span className="font-medium text-slate-700">{brand}</span>}
        </div>

        <h2 className="text-lg font-semibold leading-snug text-slate-900">{title}</h2>

        <p className="line-clamp-3 text-sm text-slate-600">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-amber-500">★ {rating}</span>
          <span className="text-slate-400">({reviews.length} reviews)</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Extra info */}
        <ul className="space-y-1 text-xs text-slate-500">
          <li>{shippingInformation}</li>
          <li>{returnPolicy}</li>
          <li>{warrantyInformation}</li>
        </ul>

        {/* Price + stock, pinned to the bottom */}
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="text-2xl font-bold text-slate-900">${discountedPrice}</p>
            <p className="text-sm text-slate-400 line-through">${price}</p>
          </div>
          <p className="text-sm text-slate-500">{stock} in stock</p>
        </div>

        <button 
                onClick={handleAddToCart}
          type="button"
          className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard