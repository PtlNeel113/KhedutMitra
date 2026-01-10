import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Sprout, Satellite, CloudRain, Bug, Droplets, 
  TrendingUp, AlertCircle, CheckCircle, Calendar, Sparkles
} from 'lucide-react';
import { UserRole, UserData } from '../App';
import { Progress } from './ui/progress';
import { AIAgent, AIAgentButton } from './AIAgent';
import { useState } from 'react';

interface CropAdvisoryProps {
  userRole: UserRole;
  userData: UserData | null;
}

export function CropAdvisory({ userRole, userData }: CropAdvisoryProps) {
  const [aiAgentOpen, setAiAgentOpen] = useState(false);

  const plots = [
    { id: 1, name: 'Plot A - Wheat', health: 85, area: '5 acres', status: 'excellent' },
    { id: 2, name: 'Plot B - Rice', health: 72, area: '4 acres', status: 'good' },
    { id: 3, name: 'Plot C - Sugarcane', health: 65, area: '3.5 acres', status: 'needs-attention' },
  ];

  const recommendations = [
    {
      title: 'Irrigation Adjustment Needed',
      plot: 'Plot C - Sugarcane',
      priority: 'high',
      icon: Droplets,
      description: 'Soil moisture at 45%. Increase irrigation by 15% over next 3 days.',
      action: 'View Irrigation Schedule',
    },
    {
      title: 'Pest Alert - Early Stage',
      plot: 'Plot B - Rice',
      priority: 'medium',
      icon: Bug,
      description: 'Satellite imagery shows potential pest activity. Apply organic neem-based treatment.',
      action: 'Order Treatment',
    },
    {
      title: 'Optimal Harvest Window',
      plot: 'Plot A - Wheat',
      priority: 'low',
      icon: Calendar,
      description: 'Crop maturity at 90%. Weather forecast favorable for harvest in 5-7 days.',
      action: 'Schedule Harvest',
    },
  ];

  const soilMetrics = [
    { label: 'Nitrogen (N)', value: 78, status: 'good', unit: 'kg/ha' },
    { label: 'Phosphorus (P)', value: 65, status: 'moderate', unit: 'kg/ha' },
    { label: 'Potassium (K)', value: 82, status: 'good', unit: 'kg/ha' },
    { label: 'pH Level', value: 6.8, status: 'optimal', unit: '' },
    { label: 'Organic Matter', value: 3.2, status: 'good', unit: '%' },
    { label: 'Moisture', value: 55, status: 'good', unit: '%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">AI-Powered Crop Advisory</h1>
        <p className="text-gray-600">
          Personalized recommendations based on satellite data, soil testing, and weather analytics
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
          <TabsTrigger value="weather">Weather Forecast</TabsTrigger>
          <TabsTrigger value="satellite">Satellite Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Plot Health Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plots.map((plot) => (
              <Card key={plot.id} className="p-6 border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-green-900 mb-1">{plot.name}</h3>
                    <p className="text-gray-600">{plot.area}</p>
                  </div>
                  <Badge variant={plot.status === 'excellent' ? 'default' : plot.status === 'good' ? 'secondary' : 'destructive'}>
                    {plot.health}%
                  </Badge>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Health Score</span>
                  </div>
                  <Progress value={plot.health} className="h-2" />
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Today's Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high' ? 'border-red-500 bg-red-50' :
                    rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      rec.priority === 'high' ? 'bg-red-100' :
                      rec.priority === 'medium' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <rec.icon className={`h-5 w-5 ${
                        rec.priority === 'high' ? 'text-red-600' :
                        rec.priority === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{rec.title}</h3>
                        <Badge variant="outline">{rec.plot}</Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{rec.description}</p>
                      <Button size="sm" variant="outline">
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="soil" className="space-y-6 mt-6">
          <Card className="p-6 border-green-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-green-900 mb-2">Satellite Soil Testing Results</h2>
                <p className="text-gray-600">Last updated: 2 days ago</p>
              </div>
              <Button variant="outline">
                <Satellite className="mr-2 h-4 w-4" />
                Request New Scan
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soilMetrics.map((metric, index) => (
                <Card key={index} className="p-4 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{metric.label}</span>
                    {metric.status === 'good' || metric.status === 'optimal' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="text-green-900 mb-1">
                    {metric.value}{metric.unit}
                  </div>
                  <Badge variant={metric.status === 'good' || metric.status === 'optimal' ? 'default' : 'secondary'}>
                    {metric.status}
                  </Badge>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Sprout className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-blue-900 mb-1">Soil Health Recommendation</h3>
                  <p className="text-blue-800">
                    Overall soil health is good. Consider adding organic compost to Plot C to increase phosphorus levels. 
                    Recommended: 200 kg/acre of well-decomposed farmyard manure.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6 mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">7-Day Weather Forecast</h2>
            <div className="grid md:grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <Card key={index} className="p-4 text-center border-gray-200">
                  <div className="text-gray-700 mb-2">{day}</div>
                  <CloudRain className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <div className="text-gray-900 mb-1">28°C</div>
                  <div className="text-gray-600">60%</div>
                </Card>
              ))}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900 mb-3">Rainfall Forecast</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="text-gray-900">45mm expected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Week</span>
                    <span className="text-gray-900">12mm expected</span>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900 mb-3">Temperature Range</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average High</span>
                    <span className="text-gray-900">32°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Low</span>
                    <span className="text-gray-900">24°C</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="satellite" className="space-y-6 mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Satellite Crop Monitoring</h2>
            <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center">
                <Satellite className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <p className="text-gray-700">Satellite imagery view of your farm plots</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900 mb-2">NDVI Index</h3>
                <div className="text-green-900 mb-1">0.78</div>
                <p className="text-gray-600">Healthy vegetation</p>
              </Card>
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900 mb-2">Canopy Coverage</h3>
                <div className="text-green-900 mb-1">85%</div>
                <p className="text-gray-600">Excellent growth</p>
              </Card>
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900 mb-2">Stress Level</h3>
                <div className="text-green-900 mb-1">Low</div>
                <p className="text-gray-600">Minimal stress detected</p>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Agent */}
      <AIAgentButton onClick={() => setAiAgentOpen(true)} />
      <AIAgent isOpen={aiAgentOpen} onClose={() => setAiAgentOpen(false)} />
    </div>
  );
}