import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Search, QrCode, MapPin, Calendar, User, 
  CheckCircle, Package, Truck, Store, Award
} from 'lucide-react';
import { UserRole } from '../App';
import { useState } from 'react';

interface TraceabilityProps {
  userRole: UserRole;
}

export function Traceability({ userRole }: TraceabilityProps) {
  const [trackingId, setTrackingId] = useState('');

  const sampleProduct = {
    id: 'RUP-2024-001234',
    name: 'Organic Basmati Rice',
    farmer: 'Ramesh Kumar',
    farmLocation: 'Village Kheda, Punjab',
    harvestDate: '2024-10-15',
    quantity: '500 kg',
    status: 'In Transit',
    certifications: ['Organic', 'Residue-Free', 'Zero Pesticide'],
    journey: [
      {
        stage: 'Harvesting',
        date: '2024-10-15',
        location: 'Farm - Kheda, Punjab',
        status: 'completed',
        details: 'Crop harvested using sustainable methods',
      },
      {
        stage: 'Quality Testing',
        date: '2024-10-16',
        location: 'Testing Lab - Ludhiana',
        status: 'completed',
        details: 'Residue testing: Zero pesticides detected',
      },
      {
        stage: 'Processing',
        date: '2024-10-18',
        location: 'Processing Unit - Amritsar',
        status: 'completed',
        details: 'Cleaned and packaged following organic standards',
      },
      {
        stage: 'In Transit',
        date: '2024-11-10',
        location: 'Distribution Center - Delhi',
        status: 'active',
        details: 'En route to buyer via temperature-controlled logistics',
      },
      {
        stage: 'Delivery',
        date: '2024-11-14',
        location: 'Buyer Warehouse - Mumbai',
        status: 'pending',
        details: 'Expected delivery',
      },
    ],
  };

  const myProducts = [
    {
      id: 'RUP-2024-001234',
      name: 'Organic Basmati Rice',
      quantity: '500 kg',
      status: 'In Transit',
      buyer: 'Organic Foods Ltd',
    },
    {
      id: 'RUP-2024-001198',
      name: 'Organic Wheat',
      quantity: '800 kg',
      status: 'Delivered',
      buyer: 'HealthFirst Grocers',
    },
    {
      id: 'RUP-2024-001156',
      name: 'Fresh Vegetables Mix',
      quantity: '300 kg',
      status: 'Quality Check',
      buyer: 'Farm Fresh Markets',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Farm-to-Fork Traceability</h1>
        <p className="text-gray-600">
          Track your produce journey from farm to consumer with complete transparency
        </p>
      </div>

      {/* Track Product Section */}
      <Card className="p-6 border-green-100 mb-8">
        <h2 className="text-green-900 mb-4">Track a Product</h2>
        <div className="flex gap-4 max-w-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Enter tracking ID or scan QR code" 
              className="pl-10"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </div>
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR
          </Button>
          <Button variant="outline">
            Track
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details */}
          <Card className="p-6 border-green-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-green-900 mb-2">{sampleProduct.name}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>ID: {sampleProduct.id}</span>
                  <Badge variant="secondary">{sampleProduct.status}</Badge>
                </div>
              </div>
              <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Farmer</div>
                  <div className="text-gray-900">{sampleProduct.farmer}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Farm Location</div>
                  <div className="text-gray-900">{sampleProduct.farmLocation}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Harvest Date</div>
                  <div className="text-gray-900">{new Date(sampleProduct.harvestDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Quantity</div>
                  <div className="text-gray-900">{sampleProduct.quantity}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-gray-700 mb-3">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {sampleProduct.certifications.map((cert, index) => (
                  <Badge key={index} variant="default" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Journey Timeline */}
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Product Journey</h2>
            <div className="space-y-6">
              {sampleProduct.journey.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-full ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'active' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : step.status === 'active' ? (
                        <Truck className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Store className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    {index < sampleProduct.journey.length - 1 && (
                      <div className={`w-0.5 h-16 mt-2 ${
                        step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">{step.stage}</h3>
                      <Badge variant={
                        step.status === 'completed' ? 'default' :
                        step.status === 'active' ? 'secondary' :
                        'outline'
                      }>
                        {step.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(step.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{step.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quality Metrics */}
          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">Quality Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pesticide Residue</span>
                <Badge variant="default">Zero</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Heavy Metals</span>
                <Badge variant="default">Safe</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Microbial Load</span>
                <Badge variant="default">Within Limits</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Moisture Content</span>
                <Badge variant="secondary">12%</Badge>
              </div>
            </div>
          </Card>

          {/* Environmental Impact */}
          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">Environmental Impact</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">Water Saved</span>
                  <span className="text-gray-900">2,500L</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">Carbon Sequestered</span>
                  <span className="text-gray-900">45 kg CO2</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">Soil Health</span>
                  <span className="text-gray-900">Improved</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Download Documents */}
          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">Documents</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Test Certificate
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Organic Certificate
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Transport Receipt
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* My Products */}
      {userRole === 'farmer' && (
        <Card className="p-6 border-green-100 mt-8">
          <h2 className="text-green-900 mb-6">My Products in Transit</h2>
          <div className="space-y-4">
            {myProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{product.name}</h3>
                    <Badge variant={product.status === 'Delivered' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>{product.id}</span>
                    <span>{product.quantity}</span>
                    <span>→ {product.buyer}</span>
                  </div>
                </div>
                <Button variant="outline">Track</Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
