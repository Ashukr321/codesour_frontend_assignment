

import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handlePlaceOrder = () => {
    navigate('/payment-checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-4">Add some fresh vegetables to your cart</p>
        <Button onClick={() => navigate('/products')} className="bg-green-600 hover:bg-green-700">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button 
          variant="destructive"
          onClick={() => {
            clearCart()
            toast.success('Cart cleared successfully')
          }}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Cart
        </Button>
      </motion.div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items with scrollbar */}
        <div className="lg:col-span-2">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto space-y-6 pr-6 pb-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={item.image} 
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <motion.div 
                        className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-1"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            removeFromCart(item.id)
                            toast.success(`Removed ${item.name} from cart`)
                          }}
                          className="hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.p 
                      className="font-semibold text-green-600 text-lg"
                      key={item.quantity}
                      animate={{ scale: [1, 1.1, 1] }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary - Sticky */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-24 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md h-fit"
        >
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <motion.span key={getCartTotal()} animate={{ scale: [1, 1.1, 1] }}>
                ${getCartTotal().toFixed(2)}
              </motion.span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span>$5.00</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <motion.span 
                  className="text-green-600 text-xl"
                  key={getCartTotal()}
                  animate={{ scale: [1, 1.1, 1] }}
                >
                  ${(getCartTotal() + 5).toFixed(2)}
                </motion.span>
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 transition-colors text-lg py-6"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </motion.div>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Free delivery for orders above $50
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Cart
