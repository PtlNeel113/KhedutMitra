import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, Package, CheckCircle, DollarSign, 
  Calendar, Award, Truck, BarChart3
} from 'lucide-react';
import { UserRole } from '../App';

interface BuyBackGuaranteeProps {
  userRole: UserRole;
}

export function BuyBackGuarantee({ userRole }: BuyBackGuaranteeProps) {
  const guaranteedCrops = [
    {
      crop: 'Organic Basmati Rice',
      minPrice: '₹45/kg',
      marketPrice: '₹52/kg',
      quantity: '500 kg',
      harvestDate: '2024-11-20',
      buyer: 'Organic Foods Ltd',
      status: 'confirmed',
      certification: 'Organic, Zero Pesticide',
    },
    {
      crop: 'Organic Wheat',
      minPrice: '₹28/kg',
      marketPrice: '₹32/kg',
      quantity: '800 kg',
      harvestDate: '2024-12-15',
      buyer: 'HealthFirst Grocers',
      status: 'confirmed',
      certification: 'Residue-Free',
    },
    {
      crop: 'Fresh Vegetables Mix',
      minPrice: '₹35/kg',
      marketPrice: '₹40/kg',
      quantity: '300 kg',
      harvestDate: '2024-11-25',
      buyer: 'Farm Fresh Markets',
      status: 'pending',
      certification: 'Organic',
    },
  ];

  const marketPrices = [
    { crop: 'Basmati Rice', organic: '₹52/kg', conventional: '₹38/kg', premium: '37%' },
    { crop: 'Wheat', organic: '₹32/kg', conventional: '₹24/kg', premium: '33%' },
    { crop: 'Vegetables', organic: '₹40/kg', conventional: '₹28/kg', premium: '43%' },
    { crop: 'Sugarcane', organic: '₹3,200/ton', conventional: '₹2,400/ton', premium: '33%' },
  ];

  const buyerRequirements = [
    {
      buyer: 'Organic Foods Ltd',
      requirement: 'Organic Basmati Rice',
      quantity: '2,000 kg/month',
      price: '₹48-52/kg',
      certification: 'Organic, Zero Pesticide',
      contract: '12 months',
    },
    {
      buyer: 'HealthFirst Grocers',
      requirement: 'Fresh Vegetables',
      quantity: '1,500 kg/week',
      price: '₹38-45/kg',
      certification: 'Residue-Free',
      contract: '6 months',
    },
    {
      buyer: 'Export Partners Inc',
      requirement: 'Premium Wheat',
      quantity: '5,000 kg/month',
      price: '₹30-35/kg',
      certification: 'Organic, Fair Trade',
      contract: '24 months',
    },
  ];

  const pastSales = [
    {
      date: '2024-10-15',
      crop: 'Organic Rice',
      quantity: '500 kg',
      price: '₹50/kg',
      total: '₹25,000',
      buyer: 'Organic Foods Ltd',
    },
    {
      date: '2024-09-20',
      crop: 'Fresh Vegetables',
      quantity: '300 kg',
      price: '₹42/kg',
      total: '₹12,600',
      buyer: 'Farm Fresh Markets',
    },
    {
      date: '2024-08-10',
      crop: 'Organic Wheat',
      quantity: '800 kg',
      price: '₹31/kg',
      total: '₹24,800',
      buyer: 'HealthFirst Grocers',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Buy-Back Guarantee Program</h1>
        <p className="text-gray-600">
          Assured purchase of your residue-free produce at competitive prices
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg w-fit mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-green-900 mb-1">3</div>
          <div className="text-gray-600">Active Contracts</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-lg w-fit mb-4">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-green-900 mb-1">₹1,23,400</div>
          <div className="text-gray-600">Expected Revenue</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg w-fit mb-4">
            <Package className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-green-900 mb-1">1,600 kg</div>
          <div className="text-gray-600">Contracted Quantity</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-3 rounded-lg w-fit mb-4">
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-green-900 mb-1">+38%</div>
          <div className="text-gray-600">Premium vs Market</div>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="mb-8">
        <TabsList>
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="buyers">Find Buyers</TabsTrigger>
          <TabsTrigger value="pricing">Market Pricing</TabsTrigger>
          <TabsTrigger value="history">Sales History</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          <div className="space-y-6">
            {guaranteedCrops.map((contract, index) => (
              <Card key={index} className="p-6 border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-green-900">{contract.crop}</h3>
                      <Badge variant={contract.status === 'confirmed' ? 'default' : 'secondary'}>
                        {contract.status}
                      </Badge>
                      <Badge variant="outline">{contract.certification}</Badge>
                    </div>
                    <div className="text-gray-600 mb-4">Buyer: {contract.buyer}</div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-gray-600 mb-1">Guaranteed Price</div>
                        <div className="text-green-900">{contract.minPrice}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Current Market</div>
                        <div className="text-gray-900">{contract.marketPrice}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Quantity</div>
                        <div className="text-gray-900">{contract.quantity}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Harvest Date</div>
                        <div className="text-gray-900">{new Date(contract.harvestDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-gray-700 mb-1">Estimated Earnings</div>
                      <div className="text-green-900">
                        ₹{(parseInt(contract.minPrice.replace('₹', '').replace('/kg', '')) * 
                           parseInt(contract.quantity.replace(' kg', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">View Contract</Button>
                    <Button>Schedule Pickup</Button>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-green-900 mb-2">Price Protection Guarantee</h3>
                  <p className="text-gray-700 mb-3">
                    Even if market prices drop, you'll receive the minimum guaranteed price. 
                    If market prices rise, you'll benefit from the higher price automatically.
                  </p>
                  <Button>Learn More</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buyers" className="mt-6">
          <Card className="p-6 border-green-100 mb-6">
            <h2 className="text-green-900 mb-6">Active Buyer Requirements</h2>
            <div className="space-y-4">
              {buyerRequirements.map((req, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{req.buyer}</h3>
                        <Badge variant="default">Verified Buyer</Badge>
                      </div>
                      <div className="text-gray-700 mb-3">Looking for: {req.requirement}</div>

                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-gray-600 mb-1">Quantity Needed</div>
                          <div className="text-gray-900">{req.quantity}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Price Range</div>
                          <div className="text-gray-900">{req.price}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Required Certification</div>
                          <div className="text-gray-900">{req.certification}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Contract Duration</div>
                          <div className="text-gray-900">{req.contract}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>Apply for Contract</Button>
                    <Button variant="outline">Contact Buyer</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">How to Get a Buy-Back Contract</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-900">1</span>
                </div>
                <h4 className="text-gray-900 mb-2">Get Certified</h4>
                <p className="text-gray-600">Obtain organic or residue-free certification for your produce</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-900">2</span>
                </div>
                <h4 className="text-gray-900 mb-2">Apply to Buyers</h4>
                <p className="text-gray-600">Submit your farm details and expected harvest to interested buyers</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-900">3</span>
                </div>
                <h4 className="text-gray-900 mb-2">Sign Contract</h4>
                <p className="text-gray-600">Agree on price, quantity, and delivery terms with the buyer</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <Card className="p-6 border-green-100 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-green-900">Organic vs Conventional Pricing</h2>
              <Badge variant="default" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Updated Today
              </Badge>
            </div>

            <div className="space-y-4">
              {marketPrices.map((price, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900">{price.crop}</h3>
                    <Badge variant="default" className="bg-green-600">
                      +{price.premium} Premium
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-gray-600 mb-1">Organic/Residue-Free</div>
                      <div className="text-green-900">{price.organic}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-600 mb-1">Conventional</div>
                      <div className="text-gray-900">{price.conventional}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">Price Factors</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Certification Level</div>
                    <div className="text-gray-600">Higher certifications command better prices</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Quality Grade</div>
                    <div className="text-gray-600">Premium quality gets up to 15% more</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Market Demand</div>
                    <div className="text-gray-600">Seasonal variations affect pricing</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">Maximize Your Earnings</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Get Multiple Certifications</div>
                    <div className="text-gray-600">Organic + Zero Pesticide + Fair Trade</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Maintain Quality</div>
                    <div className="text-gray-600">Regular testing ensures premium pricing</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Plan Harvests</div>
                    <div className="text-gray-600">Time harvests for peak demand periods</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="p-6 border-green-100 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-green-900">Recent Sales</h2>
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>

            <div className="space-y-4">
              {pastSales.map((sale, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{sale.crop}</h3>
                      <Badge variant="default">Completed</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(sale.date).toLocaleDateString()}</span>
                      </div>
                      <span>{sale.quantity} @ {sale.price}</span>
                      <span>→ {sale.buyer}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 mb-1">Total Amount</div>
                    <div className="text-green-900">{sale.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-green-100">
              <h3 className="text-gray-900 mb-2">Total Sales This Year</h3>
              <div className="text-green-900 mb-1">₹62,400</div>
              <div className="text-gray-600">Across 3 transactions</div>
            </Card>
            <Card className="p-6 border-green-100">
              <h3 className="text-gray-900 mb-2">Average Price Premium</h3>
              <div className="text-green-900 mb-1">+38%</div>
              <div className="text-gray-600">vs conventional produce</div>
            </Card>
            <Card className="p-6 border-green-100">
              <h3 className="text-gray-900 mb-2">Total Quantity Sold</h3>
              <div className="text-green-900 mb-1">1,600 kg</div>
              <div className="text-gray-600">Through buy-back program</div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
