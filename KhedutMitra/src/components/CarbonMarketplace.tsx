import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Leaf, TrendingUp, TrendingDown, DollarSign, 
  Award, BarChart3, CheckCircle, Clock
} from 'lucide-react';
import { UserRole } from '../App';
import { Progress } from './ui/progress';

interface CarbonMarketplaceProps {
  userRole: UserRole;
}

export function CarbonMarketplace({ userRole }: CarbonMarketplaceProps) {
  const carbonStats = [
    { label: 'Total Credits Earned', value: '450', unit: 'tCO2e', icon: Leaf },
    { label: 'Credits Sold', value: '₹1,35,000', unit: 'revenue', icon: DollarSign },
    { label: 'Credits Available', value: '125', unit: 'tCO2e', icon: Award },
    { label: 'Current Price', value: '₹350', unit: 'per tCO2e', icon: TrendingUp },
  ];

  const marketListings = [
    {
      id: 1,
      seller: 'Green Valley Farms',
      credits: 500,
      price: 345,
      verified: true,
      location: 'Punjab',
      practices: ['No-till farming', 'Cover cropping', 'Composting'],
    },
    {
      id: 2,
      seller: 'Eco Harvest FPO',
      credits: 1200,
      price: 360,
      verified: true,
      location: 'Karnataka',
      practices: ['Agroforestry', 'Organic farming', 'Water conservation'],
    },
    {
      id: 3,
      seller: 'Sustainable Growers',
      credits: 750,
      price: 340,
      verified: true,
      location: 'Maharashtra',
      practices: ['Crop rotation', 'Biochar application', 'Reduced tillage'],
    },
  ];

  const transactions = [
    {
      id: 1,
      type: 'earned',
      credits: 45,
      amount: 15750,
      date: '2024-11-12',
      status: 'verified',
      description: 'Q3 Carbon sequestration - Plot A & B',
    },
    {
      id: 2,
      type: 'sold',
      credits: 100,
      amount: 35000,
      date: '2024-11-08',
      status: 'completed',
      description: 'Sold to Impact Ventures Fund',
    },
    {
      id: 3,
      type: 'earned',
      credits: 30,
      amount: 10500,
      date: '2024-11-05',
      status: 'pending',
      description: 'Agroforestry verification in progress',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Carbon Credit Marketplace</h1>
        <p className="text-gray-600">
          Generate, trade, and track verified carbon credits from regenerative agriculture
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {carbonStats.map((stat, index) => (
          <Card key={index} className="p-6 border-green-100">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
                <stat.icon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="text-green-900 mb-1">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
            <div className="text-gray-500 mt-1">{stat.unit}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="marketplace" className="mb-8">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="my-credits">My Credits</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 p-6 border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-green-900">Market Price Trend</h2>
                <Badge variant="default" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% this week
                </Badge>
              </div>
              <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-green-600 opacity-20" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <div className="text-gray-600 mb-1">24h Volume</div>
                  <div className="text-green-900">₹12.5L</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Avg. Price</div>
                  <div className="text-green-900">₹352/tCO2e</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Total Credits</div>
                  <div className="text-green-900">3,450 tCO2e</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">Quick Trade</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 mb-2 block">Credits to Sell</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter credits"
                  />
                </div>
                <div>
                  <label className="text-gray-700 mb-2 block">Price per tCO2e</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="₹350"
                  />
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Estimated Earnings</span>
                  </div>
                  <div className="text-green-900">₹0</div>
                </div>
                <Button className="w-full">List for Sale</Button>
              </div>
            </Card>
          </div>

          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Available Listings</h2>
            <div className="space-y-4">
              {marketListings.map((listing) => (
                <div key={listing.id} className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{listing.seller}</h3>
                        {listing.verified && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="secondary">{listing.location}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {listing.practices.map((practice, idx) => (
                          <Badge key={idx} variant="outline">
                            <Leaf className="h-3 w-3 mr-1" />
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-900 mb-1">₹{listing.price}/tCO2e</div>
                      <div className="text-gray-600">{listing.credits} credits available</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button>Buy Credits</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="my-credits" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">Credit Generation Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">This Quarter</span>
                    <span className="text-gray-900">75 of 100 tCO2e</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Annual Target</span>
                    <span className="text-gray-900">450 of 600 tCO2e</span>
                  </div>
                  <Progress value={75} />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Credits Sold</span>
                  <span className="text-gray-900">₹1,35,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending Verification</span>
                  <span className="text-gray-900">₹10,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Platform Fee (5%)</span>
                  <span className="text-gray-900">-₹7,275</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-green-900">Net Earnings</span>
                  <span className="text-green-900">₹1,38,225</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Credit Inventory</h2>
            <div className="space-y-4">
              {[
                { plot: 'Plot A - No-till Farming', credits: 45, status: 'Available', verified: true },
                { plot: 'Plot B - Cover Cropping', credits: 50, status: 'Available', verified: true },
                { plot: 'Plot C - Agroforestry', credits: 30, status: 'Pending Verification', verified: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">{item.plot}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.verified ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                        <span className="text-gray-600">{item.credits} tCO2e</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">List for Sale</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Transaction History</h2>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`p-3 rounded-lg ${
                    transaction.type === 'earned' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'earned' ? (
                      <Leaf className="h-5 w-5 text-green-600" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{transaction.description}</h3>
                      <Badge variant={transaction.status === 'completed' ? 'default' : transaction.status === 'verified' ? 'secondary' : 'outline'}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>{transaction.credits} tCO2e</span>
                      <span>₹{transaction.amount.toLocaleString()}</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="outline">Details</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Carbon Credit Verification Process</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">1. Practice Documentation</h3>
                  <p className="text-gray-600 mb-3">
                    Log your regenerative farming practices including no-till farming, cover cropping, composting, etc.
                  </p>
                  <Badge variant="default">Completed</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">2. Satellite Verification</h3>
                  <p className="text-gray-600 mb-3">
                    Our AI analyzes satellite imagery to verify soil carbon sequestration and land use changes.
                  </p>
                  <Badge variant="default">Completed</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">3. Third-Party Audit</h3>
                  <p className="text-gray-600 mb-3">
                    Independent auditors verify your carbon sequestration claims based on global standards.
                  </p>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">4. Credit Issuance</h3>
                  <p className="text-gray-600 mb-3">
                    Upon successful verification, carbon credits are issued and added to your account.
                  </p>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-blue-900 mb-1">Verification Standards</h3>
                  <p className="text-blue-800">
                    All credits verified under Verra VCS and Gold Standard protocols. Average verification time: 45-60 days.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
