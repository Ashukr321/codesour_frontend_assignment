

import { useOrder } from '@/context/OrderContext'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Package, X, ShoppingBag, Navigation, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Order = () => {
  const { orders, cancelOrder, clearOrders } = useOrder()
  const navigate = useNavigate()
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
        },
        (error) => {
          console.error("Error getting location:", error)
          toast.error("Couldn't get your location")
        }
      )
    }
  }, [])

  // Dummy addresses near user location
  const getDummyAddress = () => {
    const addresses = [
      "123 Green Street, Freshville, 12345",
      "456 Veggie Lane, Organictown, 67890",
      "789 Farm Road, Produceville, 34567",
      "321 Garden Avenue, Healthyburg, 89012",
      "654 Market Street, Freshtown, 56789"
    ]
    return addresses[Math.floor(Math.random() * addresses.length)]
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // Add this function to check for cancelled orders
  const hasCancelledOrders = orders.some(order => order.status === 'cancelled')

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-green-60A0" />
            <h1 className="text-3xl font-bold">My Orders</h1>
          </div>
          <div className="flex items-center gap-4">
            {userLocation && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Navigation className="h-4 w-4" />
                <span>Location: {userLocation.lat.toFixed(2)}, {userLocation.lng.toFixed(2)}</span>
              </div>
            )}
            {hasCancelledOrders && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Remove Cancelled Orders
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Cancelled Orders</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove all cancelled orders from your history. Active orders will not be affected.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep All</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        clearOrders()
                        toast.success('Cancelled orders have been removed')
                      }}
                    >
                      Remove Cancelled
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {orders.map((order) => (
            <motion.div 
              key={order.id}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on {format(order.orderDate, 'PPP')}
                  </p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <ShoppingBag className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Items:</span>
                  <span>{order.name} (x{order.quantity})</span>
                </div>
                <p className="text-sm flex items-center gap-2">
                  <span className="font-medium">Total:</span>
                  <span className="text-green-600 font-semibold">
                    ${(order.price * order.quantity).toFixed(2)}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Delivery Address:</span>
                  <span className="ml-2 text-muted-foreground">{order.deliveryAddress}</span>
                </p>
              </div>

              {order.status === 'pending' && (
                <Button
                  variant="destructive"
                  className="mt-4 gap-2"
                  onClick={() => {
                    cancelOrder(order.id)
                    toast.success('Order cancelled successfully')
                  }}
                >
                  <X className="h-4 w-4" />
                  Cancel Order
                </Button>
              )}
            </motion.div>
          ))}

          {orders.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No orders found</p>
              <p className="text-muted-foreground">Your order history will appear here</p>
              <Button 
                className="mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/products')}
              >
                Start Shopping
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Order
