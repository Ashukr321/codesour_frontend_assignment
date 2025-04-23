import { useState, useEffect } from "react"

const Hero = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200",
      title: "Fresh Vegetables",
      desc: "Farm-fresh vegetables delivered to your doorstep"
    },
    {
      url: "https://images.unsplash.com/photo-1557844352-761f2565b576?q=80&w=1200",
      title: "Organic Produce",
      desc: "100% organic and locally sourced vegetables"
    },
    {
      url: "https://images.unsplash.com/photo-1618591258686-ae331fede2f5?q=80&w=1200",
      title: "Seasonal Selection",
      desc: "Best seasonal vegetables at great prices"
    },
    {
      url: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200",
      title: "Fresh Market",
      desc: "Direct from local farmers to your table"
    }
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsAnimating(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  
  return (
    <section id="hero" role="banner" aria-label="Fresh Vegetable Shop Introduction" className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left content remains the same */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-green-600/20 px-4 py-1.5 text-sm font-medium bg-green-600/5">
                <span className="text-green-600" role="text" aria-label="Special Offer">✨ Special Offer</span>
                <span className="mx-2 text-green-600" aria-hidden="true">•</span>
                <span className="text-green-600">20% Off on First Order</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Fresh Vegetables <br />
                Delivered <span className="text-green-600 relative">
                  Daily
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-green-600/10 rounded-full" aria-hidden="true">
                    <div className="absolute inset-0 bg-green-600 rounded-full animate-pulse opacity-40"></div>
                  </div>
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the freshness of farm-to-table vegetables. Order from Ramesh's 
                Vegetable Shop for quality produce delivered right to your doorstep.
              </p>

              {/* Key Services Pills */}
              <div className="flex flex-wrap gap-2" role="list" aria-label="Available Services">
                {[
                  "Fresh Vegetables", 
                  "Organic Produce", 
                  "Local Farmers", 
                  "Same Day Delivery",
                  "Best Prices",
                  "Seasonal Specials"
                ].map((service) => (
                  <span 
                    key={service}
                    role="listitem"
                    className="px-3 py-1 rounded-full text-sm bg-green-600/10 text-green-700 dark:text-green-500"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Rest of the component structure remains the same, just update colors from #00A19B to green-600 */}
          </div>

          {/* Right content - Fixed structure */}
          <div className="relative h-[400px] lg:h-[600px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-green-600/10">
              <div className="absolute inset-0 bg-green-600/10 mix-blend-multiply" aria-hidden="true"></div>
              <img 
                src={images[currentImageIndex].url}
                alt={images[currentImageIndex].title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isAnimating ? "scale-105 opacity-80" : "scale-100 opacity-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold">{images[currentImageIndex].title}</h3>
                  <p className="mt-2 text-white/80">{images[currentImageIndex].desc}</p>
                </div>
              </div>
            </div>

            {/* Image navigation dots */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? "bg-green-600 w-8" 
                      : "bg-green-600/30 hover:bg-green-600/50"
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
)
}
export default Hero;

