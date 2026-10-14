import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function ProductHomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products')
      if (!response.ok) throw new Error('Failed to load products')
      const data = await response.json()
      setProducts(data.products)
      console.log(data.products);
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) {
    return <p className="p-10 text-center text-slate-500">Loading products...</p>
  }

  if (error) {
    return <p className="p-10 text-center text-rose-600">{error}. Please try again.</p>
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Products</h1>

      {/* 1 column on mobile, 2 on tablets, 3 per row on desktop; extra cards wrap to the next row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </main>
  )
}

export default ProductHomePage