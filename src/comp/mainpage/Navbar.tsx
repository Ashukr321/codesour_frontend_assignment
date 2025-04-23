import { useState, useEffect } from 'react'
import { 
  Menu, 
  LogOut,
  LogIn,
  UserPlus,
  Home, 
  Info, 
  ShoppingBasket, 
  Package, 
  ShoppingCart 
} from "lucide-react"
import {  motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '@/context/CartContext'  // Add this import at the top

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }


  // Update the useEffect to watch for token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }

    checkAuth()
    // Check auth status on focus
    window.addEventListener('focus', checkAuth)
    // Check auth on storage change
    window.addEventListener('storage', checkAuth)
    // Check auth on document visibility change
    document.addEventListener('visibilitychange', checkAuth)

    return () => {
      window.removeEventListener('focus', checkAuth)
      window.removeEventListener('storage', checkAuth)
      document.removeEventListener('visibilitychange', checkAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
    toast.success('Logged out successfully')
    // Force a check of auth status
    window.dispatchEvent(new Event('storage'))
  }

  const { cartItems } = useCart()  // Add this hook
  
  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Products', href: '/products', icon: ShoppingBasket },
    { name: 'Order', href: '/order', icon: Package },
    { name: 'Cart', href: '/cart', icon: ShoppingCart, badge: cartItemCount },
  ]



  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between container mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBasket className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Green<span className="text-green-600">Basket</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleHashLink(e, item.href)}
                className="text-sm font-medium transition-colors hover:text-primary relative group flex items-center gap-2"
              >
                <div className="relative">
                  <item.icon className="h-4 w-4" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary relative group flex items-center gap-2"
              >
                <div className="relative">
                  <item.icon className="h-4 w-4" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            )
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key="logout"
            >
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="gap-2 px-6"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4"
              key="login-register"
            >
              <Button variant="outline" asChild className="px-6">
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button variant="default" asChild className="bg-green-600 hover:bg-green-700 px-6">
                <Link to="/register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full">
            <div className="flex flex-col items-center gap-6 mt-8">
              {/* Navigation Items */}
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleHashLink(e, item.href)}
                    className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5" />
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5" />
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.name}
                  </Link>
                )
              ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col w-full gap-2 mt-4">
                {isLoggedIn ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key="mobile-logout"
                    className="w-full"
                  >
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-6"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="text-base">Logout</span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3 w-full"
                    key="mobile-login-register"
                  >
                    <Button variant="outline" className="w-full py-6" asChild>
                      <Link to="/login" className="flex items-center justify-center gap-2">
                        <LogIn className="h-5 w-5" />
                        <span className="text-base">Login</span>
                      </Link>
                    </Button>
                    <Button variant="default" className="w-full bg-green-600 hover:bg-green-700 py-6" asChild>
                      <Link to="/register" className="flex items-center justify-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        <span className="text-base">Register</span>
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
