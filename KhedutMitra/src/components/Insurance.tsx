import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, CloudRain, Sun, Droplets, Wind, 
  AlertTriangle, CheckCircle, FileText, DollarSign
} from 'lucide-react';
import { UserRole } from '../App';
import { Progress } from './ui/progress';

interface InsuranceProps {
  userRole: UserRole;
}

export function Insurance({ userRole }: InsuranceProps) {
  const activePolicies = [
    {
      id: 'INS-2024-001',
      type: 'Rainfall Insurance',
      coverage: '₹2,00,000',
      premium: '₹8,500',
      status: 'active',
      validUntil: '2025-03-31',
      plots: ['Plot A', 'Plot B'],
    },
    {
      id: 'INS-2024-002',
      type: 'Temperature Protection',
      coverage: '₹1,50,000',
      premium: '₹6,200',
      status: 'active',
      validUntil: '2025-02-28',
      plots: ['Plot C'],
    },
    {
      id: 'INS-2024-003',
      type: 'Crop Damage Insurance',
      coverage: '₹3,00,000',
      premium: '₹12,000',
      status: 'active',
      validUntil: '2025-04-30',
      plots: ['Plot A', 'Plot B', 'Plot C'],
    },
  ];

  const availablePlans = [
    {
      name: 'Rainfall Insurance',
      icon: CloudRain,
      description: 'Protection against excess or deficit rainfall',
      coverage: 'Up to ₹5,00,000',
      premium: 'Starting ₹7,000/season',
      features: ['Automatic payout', 'Satellite-based triggers', 'No field inspection'],
      color: 'blue',
    },
    {
      name: 'Temperature Protection',
      icon: Sun,
      description: 'Coverage for extreme temperature events',
      coverage: 'Up to ₹3,00,000',
      premium: 'Starting ₹5,500/season',
      features: ['Heat wave coverage', 'Cold snap protection', 'Quick claims'],
      color: 'orange',
    },
    {
      name: 'Humidity Insurance',
      icon: Droplets,
      description: 'Protection against high humidity damage',
      coverage: 'Up to ₹2,50,000',
      premium: 'Starting ₹4,500/season',
      features: ['Fungal disease coverage', 'Weather station data', 'Fast settlement'],
      color: 'cyan',
    },
    {
      name: 'Wildlife Damage',
      icon: AlertTriangle,
      description: 'Coverage for crop damage by wildlife',
      coverage: 'Up to ₹1,50,000',
      premium: 'Starting ₹3,000/season',
      features: ['Photo verification', 'Quick assessment', 'Community support'],
      color: 'purple',
    },
  ];

  const claims = [
    {
      id: 'CLM-2024-045',
      type: 'Rainfall Deficit',
      amount: '₹45,000',
      status: 'approved',
      date: '2024-10-25',
      payout: '₹45,000',
    },
    {
      id: 'CLM-2024-038',
      type: 'Excess Rainfall',
      amount: '₹30,000',
      status: 'processing',
      date: '2024-11-05',
      payout: 'Pending',
    },
  ];

  const weatherRisks = [
    { risk: 'Rainfall Deficit', probability: 35, severity: 'Medium', color: 'yellow' },
    { risk: 'Heat Wave', probability: 55, severity: 'High', color: 'red' },
    { risk: 'High Humidity', probability: 25, severity: 'Low', color: 'green' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Dynamic Parametric Insurance</h1>
        <p className="text-gray-600">
          Smart weather-based insurance with automatic payouts for your crops
        </p>
      </div>

      {/* Active Policies Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-green-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-green-900 mb-1">{activePolicies.length}</div>
          <div className="text-gray-600">Active Policies</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-green-900 mb-1">₹6,50,000</div>
          <div className="text-gray-600">Total Coverage</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-green-900 mb-1">2</div>
          <div className="text-gray-600">Claims This Year</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="text-green-900 mb-1">₹75,000</div>
          <div className="text-gray-600">Claims Received</div>
        </Card>
      </div>

      <Tabs defaultValue="policies" className="mb-8">
        <TabsList>
          <TabsTrigger value="policies">My Policies</TabsTrigger>
          <TabsTrigger value="available">Available Plans</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="risks">Weather Risks</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="mt-6">
          <div className="space-y-6">
            {activePolicies.map((policy) => (
              <Card key={policy.id} className="p-6 border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-green-900">{policy.type}</h3>
                      <Badge variant="default">{policy.status}</Badge>
                    </div>
                    <div className="text-gray-600 mb-3">Policy ID: {policy.id}</div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-gray-600 mb-1">Coverage</div>
                        <div className="text-gray-900">{policy.coverage}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Premium Paid</div>
                        <div className="text-gray-900">{policy.premium}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Valid Until</div>
                        <div className="text-gray-900">{new Date(policy.validUntil).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Covered Plots</div>
                        <div className="text-gray-900">{policy.plots.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button variant="outline">File Claim</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {availablePlans.map((plan, index) => (
              <Card key={index} className="p-6 border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`bg-${plan.color}-100 p-3 rounded-lg`}>
                    <plan.icon className={`h-6 w-6 text-${plan.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-gray-600 mb-1">Coverage</div>
                    <div className="text-gray-900">{plan.coverage}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Premium</div>
                    <div className="text-gray-900">{plan.premium}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-gray-700 mb-2">Key Features</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full">Get Quote</Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100 mt-6">
            <h3 className="text-green-900 mb-4">How Parametric Insurance Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-900">1</span>
                </div>
                <h4 className="text-gray-900 mb-2">Choose Your Plan</h4>
                <p className="text-gray-600">Select coverage based on your local weather risks</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-900">2</span>
                </div>
                <h4 className="text-gray-900 mb-2">Automatic Monitoring</h4>
                <p className="text-gray-600">Weather stations and satellites track conditions 24/7</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-900">3</span>
                </div>
                <h4 className="text-gray-900 mb-2">Instant Payout</h4>
                <p className="text-gray-600">When triggers are met, get paid automatically within 48 hours</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Claim History</h2>
            <div className="space-y-4">
              {claims.map((claim) => (
                <div key={claim.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`p-3 rounded-lg ${
                    claim.status === 'approved' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {claim.status === 'approved' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{claim.type}</h3>
                      <Badge variant={claim.status === 'approved' ? 'default' : 'secondary'}>
                        {claim.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>Claim ID: {claim.id}</span>
                      <span>Filed: {new Date(claim.date).toLocaleDateString()}</span>
                      <span>Amount: {claim.amount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 mb-1">Payout</div>
                    <div className="text-green-900">{claim.payout}</div>
                  </div>
                  <Button variant="outline">Details</Button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-blue-900 mb-1">No Hassle Claims</h3>
                  <p className="text-blue-800">
                    Our parametric insurance uses automated weather data for instant claim processing. 
                    No field inspections needed - when weather triggers are met, you get paid automatically.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 border-green-100 mb-6">
                <h2 className="text-green-900 mb-6">30-Day Weather Risk Forecast</h2>
                <div className="space-y-6">
                  {weatherRisks.map((risk, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-gray-900">{risk.risk}</h3>
                          <Badge variant={
                            risk.severity === 'High' ? 'destructive' :
                            risk.severity === 'Medium' ? 'secondary' :
                            'default'
                          }>
                            {risk.severity}
                          </Badge>
                        </div>
                        <span className="text-gray-900">{risk.probability}%</span>
                      </div>
                      <Progress value={risk.probability} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="text-red-900 mb-1">Heat Wave Alert</h4>
                        <p className="text-red-800">
                          High probability of extreme temperatures. Consider increasing irrigation and applying mulch.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <CloudRain className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="text-yellow-900 mb-1">Rainfall Deficit Expected</h4>
                        <p className="text-yellow-800">
                          Consider purchasing additional rainfall insurance for Plot B.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 border-green-100 mb-6">
                <h3 className="text-green-900 mb-4">Coverage Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rainfall</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temperature</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Humidity</span>
                    <span className="text-gray-400">Not Covered</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Wildlife</span>
                    <span className="text-gray-400">Not Covered</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Add More Coverage
                </Button>
              </Card>

              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Contact Support</h3>
                <p className="text-gray-600 mb-4">
                  Have questions about your policy or claims?
                </p>
                <Button className="w-full">Talk to Expert</Button>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
