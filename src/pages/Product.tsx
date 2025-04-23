import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import FilterDropdown from '@/components/FilterDropdown'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'
import Loader from '@/comp/Loader'
interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const { addToCart } = useCart()
  const [loading, setLoading] = useState(true)
 

  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  
  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast.success(`Added ${product.name} to cart`)
  }

  const [products] = useState<Product[]>([
    
    {
      id: 1,
      name: "Fresh Spinach",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
      category: "leafy greens",
      description: "Fresh organic spinach leaves"
    },
    {
      id: 2,
      name: "Carrots",
      price: 1.99,
      image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300&h=300&fit=crop",
      category: "root vegetables",
      description: "Sweet organic carrots"
    },
    {
      id: 3,
      name: "Broccoli",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop",
      category: "cruciferous",
      description: "Fresh broccoli crowns"
    },
    {
      id: 4,
      name: "Tomatoes",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1546470427-1ec0a5a6c2c8?w=300&h=300&fit=crop",
      category: "nightshades",
      description: "Ripe red tomatoes"
    },
    {
      id: 5,
      name: "Red Onions",
      price: 1.29,
      image: "https://images.unsplash.com/photo-1618512496248-a01f6a18a5af?w=300&h=300&fit=crop",
      category: "allium",
      description: "Fresh red onions"
    },
    {
      id: 6,
      name: "Zucchini",
      price: 1.99,
      image: "https://images.unsplash.com/photo-1596185600711-5c3f2b66159e?w=300&h=300&fit=crop",
      category: "gourds",
      description: "Fresh green zucchini"
    }
  ])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })

  return (
    loading ? (
      <div className='h-screen flex justify-center item-center'  >
        <Loader /> 
      </div>
    ): (
      <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fresh Vegetables</h1>
          <p className="text-muted-foreground">Choose from our selection of fresh, organic vegetables</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="w-full md:w-[400px]">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <FilterDropdown category={category} setCategory={setCategory} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                  <Button 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
    )
 
  )
}

export default Product
