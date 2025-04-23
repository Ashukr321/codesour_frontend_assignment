

import { useOrder } from '@/context/OrderContext'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const Order = () => {
  const { orders, cancelOrder } = useOrder()

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-muted-foreground">
                  Placed on {format(order.orderDate, 'PPP')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Items:</span> {order.name} (x{order.quantity})
              </p>
              <p className="text-sm">
                <span className="font-medium">Total:</span> ${order.price * order.quantity}
              </p>
              <p className="text-sm">
                <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
              </p>
            </div>

            {order.status === 'pending' && (
              <Button
                variant="destructive"
                className="mt-4"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </Button>
            )}
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
