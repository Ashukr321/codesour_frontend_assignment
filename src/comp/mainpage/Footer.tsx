import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Leaf,
  Clock,
  Shield,
  ShoppingBasket
} from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white to-[#F8FAFC] dark:from-gray-900 dark:to-gray-950 border-t">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">Green<span className="text-green-600">Basket</span></span>
            </div>
            <p className="text-muted-foreground">
              Your trusted source for fresh, organic vegetables delivered straight to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-green-600" />
                <span>Hotline: +1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-green-600" />
                <span>info@greenbasket.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>123 Fresh Market Street, City</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-green-600" />
                <span>Mon - Sun: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fresh Updates</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get updates on fresh arrivals and seasonal offers.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-green-600/20 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600/20"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Section - Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-600/10 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">100% Fresh</h4>
              <p className="text-sm text-muted-foreground">Farm fresh produce</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-600/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Quality Assured</h4>
              <p className="text-sm text-muted-foreground">Best quality</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-600/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Fast Delivery</h4>
              <p className="text-sm text-muted-foreground">Same day delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-600/10 flex items-center justify-center">
              <ShoppingBasket className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Easy Shopping</h4>
              <p className="text-sm text-muted-foreground">Order online</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-600 transition-colors">Shipping Policy</a>
            <a href="#" className="hover:text-green-600 transition-colors">FAQs</a>
          </div>
          <p>© {currentYear} GreenBasket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
