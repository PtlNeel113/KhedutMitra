import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, Filter, ShoppingCart, Star, Award, 
  Leaf, Package, Truck, Shield
} from 'lucide-react';
import { UserRole } from '../App';
import { useState } from 'react';

interface InputMarketplaceProps {
  userRole: UserRole;
}

export function InputMarketplace({ userRole }: InputMarketplaceProps) {
  const [cartItems, setCartItems] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Organic Neem-Based Pesticide',
      category: 'Pest Control',
      price: 850,
      rating: 4.8,
      reviews: 245,
      certified: true,
      image: 'pesticide',
      inStock: true,
      seller: 'BioCare Solutions',
    },
    {
      id: 2,
      name: 'Bio-Fertilizer NPK Consortium',
      category: 'Fertilizers',
      price: 1200,
      rating: 4.9,
      reviews: 412,
      certified: true,
      image: 'fertilizer',
      inStock: true,
      seller: 'GreenGrow Organics',
    },
    {
      id: 3,
      name: 'Vermicompost - Premium Grade',
      category: 'Soil Enhancers',
      price: 450,
      rating: 4.7,
      reviews: 328,
      certified: true,
      image: 'compost',
      inStock: true,
      seller: 'EarthCare Farms',
    },
    {
      id: 4,
      name: 'Organic Fungicide - Trichoderma',
      category: 'Disease Control',
      price: 980,
      rating: 4.6,
      reviews: 189,
      certified: true,
      image: 'fungicide',
      inStock: true,
      seller: 'BioShield Industries',
    },
    {
      id: 5,
      name: 'Seaweed Extract Growth Promoter',
      category: 'Growth Enhancers',
      price: 1500,
      rating: 4.9,
      reviews: 267,
      certified: true,
      image: 'seaweed',
      inStock: true,
      seller: 'Ocean Nutrients',
    },
    {
      id: 6,
      name: 'Microbial Soil Inoculant',
      category: 'Soil Enhancers',
      price: 750,
      rating: 4.5,
      reviews: 156,
      certified: true,
      image: 'microbial',
      inStock: false,
      seller: 'MicroBio Labs',
    },
  ];

  const categories = [
    { name: 'All Products', count: 156 },
    { name: 'Fertilizers', count: 42 },
    { name: 'Pest Control', count: 38 },
    { name: 'Disease Control', count: 25 },
    { name: 'Soil Enhancers', count: 31 },
    { name: 'Growth Enhancers', count: 20 },
  ];

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Residue-Free Farming Marketplace</h1>
        <p className="text-gray-600">
          Buy certified organic and bio-based agricultural inputs for sustainable farming
        </p>
      </div>

      <Tabs defaultValue="inputs" className="mb-8">
        <TabsList>
          <TabsTrigger value="inputs">Input Marketplace</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="sellers">Verified Sellers</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="mt-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-green-100 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <h3 className="text-gray-900">Filters</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-gray-900 mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <button
                          key={index}
                          className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <span className="text-gray-700">{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <Input type="number" placeholder="Min price" />
                      <Input type="number" placeholder="Max price" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-900 mb-3">Certifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span className="text-gray-700">Organic Certified</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span className="text-gray-700">Residue-Free</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-gray-700">Eco-Friendly</span>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline" className="ml-4">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart ({cartItems})
                </Button>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden border-green-100 hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative">
                      {product.certified && (
                        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      <Package className="h-20 w-20 text-green-600 opacity-20" />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-900">{product.rating}</span>
                        </div>
                        <span className="text-gray-600">({product.reviews} reviews)</span>
                      </div>
                      <p className="text-gray-600 mb-3">By {product.seller}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-green-900">₹{product.price}/kg</div>
                        {product.inStock ? (
                          <Badge variant="default">In Stock</Badge>
                        ) : (
                          <Badge variant="destructive">Out of Stock</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          disabled={!product.inStock}
                          onClick={addToCart}
                        >
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="icon">
                          <Leaf className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">Order #{1000 + order}</h3>
                      <Badge>Delivered</Badge>
                    </div>
                    <p className="text-gray-600">3 items • ₹3,450 • Delivered on Nov 10, 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button>Reorder</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sellers" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['BioCare Solutions', 'GreenGrow Organics', 'EarthCare Farms', 'BioShield Industries', 'Ocean Nutrients', 'MicroBio Labs'].map((seller, index) => (
              <Card key={index} className="p-6 border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900">{seller}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600">4.{7 + index % 3}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Products</span>
                    <span className="text-gray-900">{15 + index * 5}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Orders</span>
                    <span className="text-gray-900">{500 + index * 100}+</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Products
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Trust Indicators */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <Card className="p-6 text-center border-green-100">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">100% Certified</h3>
          <p className="text-gray-600">All products verified</p>
        </Card>
        <Card className="p-6 text-center border-green-100">
          <Truck className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">Free Delivery</h3>
          <p className="text-gray-600">Orders above ₹2,000</p>
        </Card>
        <Card className="p-6 text-center border-green-100">
          <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">Quality Assured</h3>
          <p className="text-gray-600">30-day return policy</p>
        </Card>
        <Card className="p-6 text-center border-green-100">
          <Leaf className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-gray-900 mb-2">Eco-Friendly</h3>
          <p className="text-gray-600">Sustainable packaging</p>
        </Card>
      </div>
    </div>
  );
}
