import { Button } from "@/components/ui/button"
import { 
  Leaf, Truck, ShoppingBasket, 
  Sprout, Heart, Shield, 
  Store, Award 
} from "lucide-react"
import { useState, useEffect } from "react"

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const farmImages = [
    {
      photo: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
      title: "Our Local Farm"
    },
    {
      photo: "https://images.unsplash.com/photo-1592878940526-0486a0a9c660",
      title: "Organic Farming"
    },
    {
      photo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
      title: "Fresh Harvest"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % farmImages.length)
        setIsAnimating(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [farmImages.length])

  const stats = [
    { number: "10+", label: "Years of Service" },
    { number: "5000+", label: "Happy Customers" },
    { number: "100+", label: "Vegetable Varieties" },
    { number: "50+", label: "Local Farmers" },
  ]

  const values = [
    {
      icon: Leaf,
      title: "100% Fresh",
      description: "We guarantee fresh vegetables straight from local farms to your table."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All our produce meets strict quality and safety standards."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority, always."
    },
    {
      icon: Truck,
      title: "Quick Delivery",
      description: "Same-day delivery to ensure maximum freshness."
    }
  ]

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden="true"></div>

      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center rounded-full border border-green-600/20 px-4 py-1.5 text-sm font-medium bg-green-600/5 mb-6">
            <span className="text-green-600">About Ramesh's Vegetable Shop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Fresh from Farm to
            <span className="text-green-600"> Your Table</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Since 2013, we've been connecting local farmers with customers who appreciate 
            quality fresh vegetables. Our commitment to freshness and service has made us 
            the most trusted vegetable supplier in the region.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="text-center p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-green-600/10 hover:border-green-600/20 transition-all duration-300"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-green-600">
                {stat.number}
              </h3>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Your Local Source for
              <span className="text-green-600"> Fresh Vegetables</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We work directly with local farmers to bring you the freshest vegetables 
              possible. Our careful selection process and quality control ensure that 
              you receive only the best produce for your family.
            </p>
            
            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Store, text: "Local Sourcing" },
                { icon: Sprout, text: "Organic Options" },
                { icon: ShoppingBasket, text: "Fresh Daily" },
                { icon: Award, text: "Best Quality" }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <item.icon className="h-6 w-6 text-green-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                Shop Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-green-600/20 hover:border-green-600/40"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={farmImages[currentImageIndex].photo}
                alt={farmImages[currentImageIndex].title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium text-lg">{farmImages[currentImageIndex].title}</p>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-gray-800/95 p-6 rounded-xl shadow-lg border border-green-600/10 max-w-[250px] hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-600/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Best Quality</p>
                  <p className="text-sm text-green-600">Certified Organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <header className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground">
              We're committed to providing the best quality vegetables with outstanding service
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value) => (
              <div 
                key={value.title}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-green-600/10 hover:border-green-600/20 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-lg bg-green-600/10 flex items-center justify-center mb-4 group-hover:bg-green-600/20 transition-colors">
                  <value.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { text: "The vegetables are always fresh and the service is excellent!", author: "Sarah Johnson" },
              { text: "Best quality produce I've found in the area. Highly recommend!", author: "Mike Thompson" },
              { text: "Love the variety and freshness. Great prices too!", author: "Lisa Chen" }
            ].map((testimonial) => (
              <figure 
                key={testimonial.author}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-green-600/10 hover:border-green-600/20 transition-all duration-300"
              >
                <blockquote className="text-sm text-muted-foreground mb-4">{testimonial.text}</blockquote>
                <figcaption className="font-semibold">- {testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
