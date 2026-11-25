
import { useNavigate } from 'react-router-dom'

function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const navigate = useNavigate()

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const gst = subtotal * 0.18
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99
  const grandTotal = subtotal + gst + shipping

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-5 md:col-span-2">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.variant}`}
                className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row">
                <img src={item.image} alt={item.name}
                  className="h-28 w-full rounded-lg object-cover sm:w-28" />

                <div className="flex-1">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Variant: {item.variant}
                  </p>
                  <p className="mt-2 font-semibold">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                      className="rounded border px-3 py-1">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                      className="rounded border px-3 py-1">+</button>
                  </div>

                  <button onClick={() => removeFromCart(item.id, item.variant)}
                    className="mt-3 text-sm font-semibold text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="border-t pt-4 text-lg font-bold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')}
              className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
