
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBasket, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form fields
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields')
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Get stored credentials
      const storedEmail = localStorage.getItem('userEmail')
      const storedPassword = localStorage.getItem('userPassword')

      // Check if user exists
      if (!storedEmail || !storedPassword) {
        throw new Error('Account not found. Please register first')
      }

      // Validate credentials
      if (formData.email !== storedEmail || formData.password !== storedPassword) {
        throw new Error('Invalid email or password')
      }

      // If all validations pass, proceed with login
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
      localStorage.setItem('token', token)
      
      // Show success message and redirect
      toast.success('Login successful! Welcome back', {
        duration: 2000,
      })
      
      // Redirect after success message
      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (error) {
      // Clear password on error
      setFormData(prev => ({ ...prev, password: '' }))
      
      // Show error message
      toast.error(error instanceof Error ? error.message : 'An error occurred', {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        duration: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 mt-16 md:mt-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-6 md:space-y-8 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg mx-auto"
      >
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <span className="text-xl md:text-2xl font-bold">Green<span className="text-green-600">Basket</span></span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Welcome back to GreenBasket
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-6 md:mt-8 space-y-4 md:space-y-6"
        >
          <div className="space-y-3 md:space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 h-11 md:h-12"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 h-11 md:h-12"
              />
            </div>
          </div>

          <div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 h-11 md:h-12 text-base"
              >
                Sign in
              </Button>
            </motion.div>
          </div>

          <div className="text-center text-sm md:text-base">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button 
              variant="link" 
              className="text-green-600 hover:text-green-700 p-0"
              onClick={() => navigate('/register')}
            >
              Sign up
            </Button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Login
