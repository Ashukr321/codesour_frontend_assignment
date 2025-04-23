import React from 'react'
import { useState,useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useOrder } from '@/context/OrderContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { CreditCard, ShoppingBag, CheckCircle } from 'lucide-react'

const PaymentCheckout = () => {
  const { getCartTotal, clearCart, cartItems } = useCart()
  const { addOrder } = useOrder()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          // Set a default address based on location
          setAddress(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast.error("Couldn't get your location")
        }
      )
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Create order from cart items with name included
    const deliveryAddress = `${name} - ${address}, ${city}, ${postalCode}`
    
    // Add each cart item as a separate order
    cartItems.forEach(item => {
      addOrder({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        deliveryAddress
      })
    })

    // Simulate payment processing
    setTimeout(() => {
      const items = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ')
      clearCart()
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-semibold">Payment successful!</p>
            <p className="text-sm text-muted-foreground">Order: {items}</p>
          </div>
        </div>
      )
      navigate('/orders')
    }, 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4"
    >
      <div className="container mx-auto max-w-3xl mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-green-600" />
                <CardTitle>Payment Details</CardTitle>
              </div>
              <CardDescription>Complete your purchase securely</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order Summary */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Order Summary</h3>
                  </div>
                  
                  {/* Display ordered items */}
                  <div className="space-y-2 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-green-600">
                          ${(getCartTotal() + 5).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Information */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" required className="mt-1" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/YY"
                        maxLength={5}
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv" 
                        placeholder="123"
                        maxLength={3}
                        type="password"
                        required 
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Billing Address */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="font-semibold">Delivery Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        className="mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input 
                        id="address" 
                        placeholder="123 Main St" 
                        required 
                        className="mt-1"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {userLocation && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Current location: {userLocation.lat.toFixed(2)}, {userLocation.lng.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        placeholder="City" 
                        required 
                        className="mt-1"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode" 
                        placeholder="12345" 
                        required 
                        className="mt-1"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                size="lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    Pay ${(getCartTotal() + 5).toFixed(2)}
                  </motion.div>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PaymentCheckout
