
import './App.css'
import { ThemeProvider } from './components/ui/theme-provider'
import MainPage from './pages/main/MainPage'
import { Routes, Route} from 'react-router-dom'
import Product from './pages/Product'
import Navbar from './comp/mainpage/Navbar'
import Footer from './comp/mainpage/Footer'
import Cart from './pages/Cart'
import { CartProvider } from '@/context/CartContext'
import PaymentCheckout from './pages/PaymentCheckout'

import { Toaster } from 'sonner'
function App() {
  return (
    <CartProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/products" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment-checkout" element={<PaymentCheckout/>} />

            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right" 
            theme="light"
            toastOptions={{
              style: {
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
                backdropFilter: 'blur(8px)',
                padding: '12px 16px',
                borderRadius: '12px'
              }
            }}
          />
        </div>
      </ThemeProvider>
    </CartProvider>
  )
}

export default App
