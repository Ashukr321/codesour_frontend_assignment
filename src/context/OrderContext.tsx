import { createContext, useContext, useState, ReactNode } from 'react'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  orderDate: Date
  deliveryAddress: string
}

interface OrderContextType {
  orders: OrderItem[]
  addOrder: (order: Omit<OrderItem, 'id' | 'status' | 'orderDate'>) => void
  cancelOrder: (orderId: number) => void
  getOrderById: (orderId: number) => OrderItem | undefined
  getAllOrders: () => OrderItem[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([])

  const addOrder = (order: Omit<OrderItem, 'id' | 'status' | 'orderDate'>) => {
    setOrders(prev => [...prev, {
      ...order,
      id: Date.now(),
      status: 'pending',
      orderDate: new Date()
    }])
  }

  const cancelOrder = (orderId: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' }
        : order
    ))
  }

  const getOrderById = (orderId: number) => {
    return orders.find(order => order.id === orderId)
  }

  const getAllOrders = () => orders

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      cancelOrder,
      getOrderById,
      getAllOrders
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}