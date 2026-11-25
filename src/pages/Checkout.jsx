
import { useNavigate } from 'react-router-dom'

function Checkout({ cartItems, onPlaceOrder, orderId }) {
  const navigate = useNavigate()

  if (orderId) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl text-green-500">✓</div>
        <h1 className="mt-5 text-3xl font-bold">Order Confirmed!</h1>
        <p className="mt-3 text-gray-600">
          Thank you for shopping with Aaroh Store.
        </p>
        <div className="mt-6 rounded-xl bg-indigo-50 p-5">
          <p className="text-sm text-gray-500">Your Order ID</p>
          <p className="mt-2 text-xl font-bold text-indigo-600">{orderId}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-8 rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <button
          onClick={() => navigate('/')}
          className="mt-5 rounded-lg bg-indigo-600 px-6 py-3 text-white"
        >
          Back to Store
        </button>
      </div>
    )
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const gst = subtotal * 0.18
  const shipping = subtotal > 1999 ? 0 : 99
  const total = subtotal + gst + shipping

  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    onPlaceOrder(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <form onSubmit={handleSubmit}
            className="space-y-5 rounded-xl bg-white p-6 shadow-sm md:col-span-2">

            <h2 className="text-xl font-bold">Shipping Information</h2>

            <div>
              <label className="mb-2 block font-medium">Full Name</label>
              <input name="fullName" type="text" required
                placeholder="Enter your full name"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500" />
            </div>

            <div>
              <label className="mb-2 block font-medium">Phone Number</label>
              <input name="phone" type="tel" required
                pattern="[6-9][0-9]{9}" maxLength="10"
                placeholder="10-digit mobile number"
                title="Enter a valid 10-digit Indian mobile number"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500" />
            </div>

            <div>
              <label className="mb-2 block font-medium">Address</label>
              <textarea name="address" required rows="3"
                placeholder="House name, street and area"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">City</label>
                <input name="city" type="text" required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500" />
              </div>

              <div>
                <label className="mb-2 block font-medium">State</label>
                <input name="state" type="text" required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium">PIN Code</label>
              <input name="pincode" type="text" required
                pattern="[0-9]{6}" maxLength="6"
                placeholder="6-digit PIN code"
                title="Enter a valid 6-digit PIN code"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500" />
            </div>

            <button type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700">
              Place Order
            </button>
          </form>

          <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={`${item.id}-${item.variant}`}
                className="mb-4 flex justify-between gap-3 text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="space-y-3 border-t pt-4 text-sm">
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
              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
