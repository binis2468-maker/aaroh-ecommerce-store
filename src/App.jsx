
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import products from './data/products.json'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function AppContent() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aaroh-cart')) || []
    } catch {
      return []
    }
  })
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    localStorage.setItem('aaroh-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const categories = ['All', 'Audio', 'Wearables', 'Accessories', 'Apparel']

  function addToCart(product, variant) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id && item.variant === variant
      )

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...previousItems, { ...product, variant, quantity: 1 }]
    })
  }

  function updateQuantity(id, variant, quantity) {
    if (quantity <= 0) {
      removeFromCart(id, variant)
      return
    }

    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    )
  }

  function removeFromCart(id, variant) {
    setCartItems((items) =>
      items.filter(
        (item) => !(item.id === id && item.variant === variant)
      )
    )
  }

  function placeOrder() {
    const newOrderId = `AAROH-${Date.now()}`
    setOrderId(newOrderId)
    setCartItems([])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || product.category === category

    return matchesSearch && matchesCategory
  })

  if (sort === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="flex items-center justify-between px-6 py-5 shadow-sm">
        <button onClick={() => navigate('/')}
          className="text-2xl font-bold text-indigo-600">
          AAROH<span className="text-gray-900">.</span>
        </button>

        <div className="hidden gap-8 font-medium md:flex">
          <button onClick={() => navigate('/')}>Home</button>
          <a href="/#categories">Categories</a>
          <a href="/#products">Products</a>
        </div>

        <button onClick={() => navigate('/cart')}
          className="rounded-full bg-indigo-600 px-5 py-2 text-white">
          🛒 Cart ({cartCount})
        </button>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <section className="bg-indigo-50 px-6 py-20 text-center">
              <p className="mb-4 font-semibold text-indigo-600">
                WELCOME TO AAROH STORE
              </p>
              <h1 className="mx-auto max-w-3xl text-4xl font-bold md:text-6xl">
                Discover Products That Match Your Style
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-gray-600">
                Explore quality products, amazing collections and
                a shopping experience designed for you.
              </p>
              <a href="#products"
                className="mt-8 inline-block rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700">
                Explore Collection →
              </a>
            </section>

            <section id="categories" className="px-6 py-12">
              <h2 className="mb-6 text-3xl font-bold">Shop by Category</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {categories.slice(1).map((item) => (
                  <button key={item}
                    onClick={() => {
                      setCategory(item)
                      document.getElementById('products')?.scrollIntoView()
                    }}
                    className="rounded-xl bg-gray-100 p-8 font-bold hover:bg-indigo-100">
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section id="products" className="px-6 py-12">
              <h2 className="mb-6 text-3xl font-bold">Our Collection</h2>

              <div className="mb-6 flex flex-col gap-4 md:flex-row">
                <input type="text" placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 rounded-xl border px-5 py-3 outline-none focus:border-indigo-500" />

                <select value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-xl border px-4 py-3">
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>

                <select value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-xl border px-4 py-3">
                  <option value="default">Sort By</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>

              <p className="mb-5 text-gray-500">
                Showing {filteredProducts.length} products
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div key={product.id}
                    className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <img src={product.image} alt={product.name}
                      className="h-52 w-full object-cover" />

                    <div className="p-5">
                      <p className="text-sm text-indigo-600">
                        {product.category}
                      </p>
                      <h3 className="mt-2 min-h-12 font-bold">
                        {product.name}
                      </h3>
                      <p className="mt-2 font-semibold">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      <p className="mt-2 text-sm text-yellow-600">
                        ⭐ {product.rating} / 5
                      </p>
                      <p className={`mt-2 text-sm font-medium ${
                        product.inStock ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>

                      <button disabled={!product.inStock}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400">
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        } />

        <Route path="/product/:id" element={
          <ProductDetails products={products} addToCart={addToCart} />
        } />

        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        } />

        <Route path="/checkout" element={
          <Checkout
            cartItems={cartItems}
            onPlaceOrder={placeOrder}
            orderId={orderId}
          />
        } />

        <Route path="*" element={
          <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <button onClick={() => navigate('/')}
              className="mt-5 text-indigo-600">
              Back to Store
            </button>
          </div>
        } />
      </Routes>

      <footer className="bg-gray-900 px-6 py-8 text-center text-white">
        © 2026 Aaroh Store. All rights reserved.
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
