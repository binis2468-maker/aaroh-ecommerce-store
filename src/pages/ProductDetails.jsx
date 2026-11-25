
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetails({ products, addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find((item) => item.id === id)
  const [selectedVariant, setSelectedVariant] = useState('')

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <button onClick={() => navigate('/')}
          className="mt-5 rounded-lg bg-indigo-600 px-6 py-3 text-white">
          Back to Store
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <button onClick={() => navigate('/')}
        className="mb-8 font-semibold text-indigo-600">
        ← Back to Store
      </button>

      <div className="mx-auto grid max-w-5xl gap-10 rounded-2xl bg-white p-6 shadow md:grid-cols-2">

        <img
          src={product.image}
          alt={product.name}
          className="h-96 w-full rounded-xl object-cover"
        />

        <div>
          <p className="font-semibold text-indigo-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            {product.name}
          </h1>

          <p className="mt-3 text-yellow-500">
            ⭐ {product.rating} / 5
          </p>

          <h2 className="mt-5 text-3xl font-bold">
            ₹{product.price.toLocaleString('en-IN')}
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description}
          </p>

          <p className={`mt-5 font-semibold ${
            product.inStock ? 'text-green-600' : 'text-red-500'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          <h3 className="mt-6 font-bold">Select Variant</h3>

          <div className="mt-3 flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`rounded-lg border px-4 py-2 ${
                  selectedVariant === variant
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300 hover:border-indigo-600'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>

          <button
            disabled={!product.inStock || !selectedVariant}
            onClick={() => {
              addToCart(product, selectedVariant)
              navigate('/cart')
            }}
            className="mt-8 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Add to Cart
          </button>

          {!selectedVariant && product.inStock && (
            <p className="mt-2 text-sm text-red-500">
              Please select a variant before adding to cart.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
