import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBasket, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

// Function to generate a random token
const generateToken = () => {
  const tokenLength = 32
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return token
}

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate name (at least 2 characters)
      if (!formData.name || formData.name.length < 2) {
        throw new Error('Please enter a valid name (minimum 2 characters)')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Check if email already exists
      const existingEmail = localStorage.getItem('userEmail')
      if (existingEmail === formData.email) {
        throw new Error('Email already registered. Please login instead')
      }

      // Validate password (minimum 6 characters)
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Check password match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Generate and store token
      const token = generateToken()
      localStorage.setItem('userToken', token)
      localStorage.setItem('token', token)

      // Store user data
      localStorage.setItem('userEmail', formData.email)
      localStorage.setItem('userPassword', formData.password)
      localStorage.setItem('userName', formData.name)
      
      // Trigger storage event for navbar update
      window.dispatchEvent(new Event('storage'))
      
      // Show success message and redirect
      toast.success('Registration successful! Welcome to GreenBasket', {
        duration: 2000,
      })
      
      // Redirect after success message
      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (error) {
      // Clear password fields on error
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }))
      
      // Show error message
      toast.error(error instanceof Error ? error.message : 'An error occurred', {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        duration: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen lex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 mt-24 md:mt-18">
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Join GreenBasket for fresh vegetables delivery
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
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 h-11 md:h-12"
              />
            </div>
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 h-11 md:h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 h-11 md:h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 h-11 md:h-12 text-base"
              >
                Sign up
              </Button>
            </motion.div>
          </div>

          <div className="text-center text-sm md:text-base">
            <span className="text-muted-foreground">Already have an account? </span>
            <Button 
              variant="link" 
              className="text-green-600 hover:text-green-700 p-0"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Register
