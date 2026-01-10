import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Leaf, Droplets, TrendingUp, Users, BarChart3, 
  Award, TreePine, Sprout, DollarSign, Target
} from 'lucide-react';
import { UserRole } from '../App';
import { Progress } from './ui/progress';

interface ImpactDashboardProps {
  userRole: UserRole;
}

export function ImpactDashboard({ userRole }: ImpactDashboardProps) {
  const environmentalImpact = [
    { label: 'Carbon Sequestered', value: '450', unit: 'tCO2e', icon: Leaf, color: 'green', progress: 75 },
    { label: 'Water Conserved', value: '12,500', unit: 'liters', icon: Droplets, color: 'blue', progress: 68 },
    { label: 'Soil Health Improved', value: '12.5', unit: 'acres', icon: Sprout, color: 'emerald', progress: 82 },
    { label: 'Pesticide Reduction', value: '95', unit: '%', icon: TreePine, color: 'green', progress: 95 },
  ];

  const financialImpact = [
    { label: 'Carbon Credit Revenue', value: '₹1,35,000', change: '+25%', icon: Leaf },
    { label: 'Premium Pricing', value: '₹85,000', change: '+38%', icon: TrendingUp },
    { label: 'Insurance Payouts', value: '₹75,000', change: '+15%', icon: Award },
    { label: 'Total Earnings', value: '₹2,95,000', change: '+28%', icon: DollarSign },
  ];

  const monthlyData = [
    { month: 'Jun', carbon: 35, revenue: 12000 },
    { month: 'Jul', carbon: 40, revenue: 14000 },
    { month: 'Aug', carbon: 42, revenue: 15000 },
    { month: 'Sep', carbon: 48, revenue: 17000 },
    { month: 'Oct', carbon: 50, revenue: 18500 },
    { month: 'Nov', carbon: 45, revenue: 15750 },
  ];

  const sustainabilityGoals = [
    { goal: 'Carbon Neutral Farming', progress: 75, target: '600 tCO2e by 2025', status: 'on-track' },
    { goal: 'Zero Pesticide Use', progress: 95, target: '100% organic by Dec 2024', status: 'on-track' },
    { goal: 'Water Conservation', progress: 68, target: '20,000L saved annually', status: 'on-track' },
    { goal: 'Biodiversity Enhancement', progress: 55, target: '5 new species by 2025', status: 'in-progress' },
  ];

  const comparisons = [
    { metric: 'Carbon Footprint', yourFarm: '-45%', average: '+12%', better: true },
    { metric: 'Water Usage', yourFarm: '-35%', average: '-5%', better: true },
    { metric: 'Soil Organic Matter', yourFarm: '+28%', average: '+8%', better: true },
    { metric: 'Income per Acre', yourFarm: '+42%', average: '+15%', better: true },
  ];

  const achievements = [
    {
      title: 'Carbon Champion',
      description: 'Sequestered 400+ tCO2e',
      icon: Leaf,
      earned: '2024-09-15',
      color: 'green',
    },
    {
      title: 'Water Warrior',
      description: 'Saved 10,000L+ water',
      icon: Droplets,
      earned: '2024-08-20',
      color: 'blue',
    },
    {
      title: 'Organic Pioneer',
      description: 'Zero pesticide for 6 months',
      icon: Award,
      earned: '2024-07-10',
      color: 'purple',
    },
    {
      title: 'Community Leader',
      description: '50+ farmers helped',
      icon: Users,
      earned: '2024-10-05',
      color: 'orange',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Sustainability Impact Dashboard</h1>
        <p className="text-gray-600">
          Track your environmental and financial impact from sustainable farming practices
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="goals">Goals & Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Environmental Impact */}
          <div className="mb-8">
            <h2 className="text-green-900 mb-6">Environmental Impact</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {environmentalImpact.map((impact, index) => (
                <Card key={index} className="p-6 border-green-100">
                  <div className={`bg-${impact.color}-100 p-3 rounded-lg w-fit mb-4`}>
                    <impact.icon className={`h-5 w-5 text-${impact.color}-600`} />
                  </div>
                  <div className="text-green-900 mb-1">{impact.value}</div>
                  <div className="text-gray-600 mb-3">{impact.label}</div>
                  <div className="text-gray-500">{impact.unit}</div>
                  <Progress value={impact.progress} className="mt-3 h-2" />
                </Card>
              ))}
            </div>
          </div>

          {/* Financial Impact */}
          <div className="mb-8">
            <h2 className="text-green-900 mb-6">Financial Impact</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialImpact.map((impact, index) => (
                <Card key={index} className="p-6 border-green-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
                      <impact.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      {impact.change}
                    </Badge>
                  </div>
                  <div className="text-green-900 mb-1">{impact.value}</div>
                  <div className="text-gray-600">{impact.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-6">Carbon Sequestration Trend</h3>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">{data.month}</span>
                      <span className="text-gray-900">{data.carbon} tCO2e</span>
                    </div>
                    <Progress value={(data.carbon / 50) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-6">Revenue from Sustainability</h3>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">{data.month}</span>
                      <span className="text-gray-900">₹{data.revenue.toLocaleString()}</span>
                    </div>
                    <Progress value={(data.revenue / 20000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Comparison with Average */}
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Your Farm vs. Average Farm</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {comparisons.map((comp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-gray-900 mb-4">{comp.metric}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${comp.better ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="text-gray-600 mb-1">Your Farm</div>
                      <div className={`${comp.better ? 'text-green-900' : 'text-gray-900'}`}>
                        {comp.yourFarm}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-600 mb-1">Average</div>
                      <div className="text-gray-900">{comp.average}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {environmentalImpact.map((impact, index) => (
              <Card key={index} className="p-6 border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-${impact.color}-100 p-3 rounded-lg`}>
                    <impact.icon className={`h-6 w-6 text-${impact.color}-600`} />
                  </div>
                  <Badge variant="default">{impact.progress}%</Badge>
                </div>
                <h3 className="text-green-900 mb-2">{impact.label}</h3>
                <div className="text-gray-900 mb-4">{impact.value} {impact.unit}</div>
                <Progress value={impact.progress} className="mb-2 h-2" />
                <div className="text-gray-600">Target: {impact.progress >= 100 ? 'Achieved!' : 'On track'}</div>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100 mb-6">
            <h2 className="text-green-900 mb-6">Detailed Environmental Metrics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-900 mb-4">Carbon Impact Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">No-Till Farming</span>
                    <span className="text-green-900">180 tCO2e</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Cover Cropping</span>
                    <span className="text-green-900">150 tCO2e</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Composting</span>
                    <span className="text-green-900">80 tCO2e</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Agroforestry</span>
                    <span className="text-green-900">40 tCO2e</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-4">Water Conservation Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Drip Irrigation</span>
                    <span className="text-blue-900">5,000 L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Mulching</span>
                    <span className="text-blue-900">4,500 L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Rainwater Harvesting</span>
                    <span className="text-blue-900">2,500 L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Crop Rotation</span>
                    <span className="text-blue-900">500 L</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <TreePine className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-900 mb-2">Environmental Impact Equivalent</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-4">
                  <div>
                    <div className="text-gray-700 mb-1">Trees Planted Equivalent</div>
                    <div className="text-green-900">~5,400 trees</div>
                  </div>
                  <div>
                    <div className="text-gray-700 mb-1">Cars Off Road</div>
                    <div className="text-green-900">~97 cars/year</div>
                  </div>
                  <div>
                    <div className="text-gray-700 mb-1">Homes Powered</div>
                    <div className="text-green-900">~54 homes/year</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {financialImpact.map((impact, index) => (
              <Card key={index} className="p-6 border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
                    <impact.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    {impact.change}
                  </Badge>
                </div>
                <div className="text-green-900 mb-1">{impact.value}</div>
                <div className="text-gray-600">{impact.label}</div>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100 mb-6">
            <h2 className="text-green-900 mb-6">Income Sources from Sustainability</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Carbon Credit Sales</span>
                  <span className="text-gray-900">₹1,35,000 (46%)</span>
                </div>
                <Progress value={46} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Premium Organic Pricing</span>
                  <span className="text-gray-900">₹85,000 (29%)</span>
                </div>
                <Progress value={29} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Insurance Benefits</span>
                  <span className="text-gray-900">₹75,000 (25%)</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">Cost Savings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reduced Pesticide Costs</span>
                  <span className="text-green-900">₹45,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Conservation</span>
                  <span className="text-green-900">₹12,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Soil Amendment Reduction</span>
                  <span className="text-green-900">₹18,000</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-green-900">Total Savings</span>
                  <span className="text-green-900">₹75,000</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-100">
              <h3 className="text-green-900 mb-4">ROI from Sustainability</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-600 mb-2">Investment in Sustainable Practices</div>
                  <div className="text-gray-900">₹1,25,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Total Returns (1 Year)</div>
                  <div className="text-gray-900">₹3,70,000</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-gray-700 mb-1">Return on Investment</div>
                  <div className="text-green-900">196%</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <div className="mb-8">
            <h2 className="text-green-900 mb-6">Sustainability Goals Progress</h2>
            <div className="space-y-6">
              {sustainabilityGoals.map((goal, index) => (
                <Card key={index} className="p-6 border-green-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-green-900">{goal.goal}</h3>
                        <Badge variant={goal.status === 'on-track' ? 'default' : 'secondary'}>
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="text-gray-600 mb-4">{goal.target}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-900">{goal.progress}%</div>
                      <div className="text-gray-600">Complete</div>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-green-900 mb-6">Achievements & Badges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 border-green-100 text-center">
                  <div className={`bg-${achievement.color}-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <achievement.icon className={`h-8 w-8 text-${achievement.color}-600`} />
                  </div>
                  <h3 className="text-green-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 mb-3">{achievement.description}</p>
                  <div className="text-gray-500">
                    Earned: {new Date(achievement.earned).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-900 mb-2">Set New Goals</h3>
                <p className="text-gray-700 mb-4">
                  Keep challenging yourself with new sustainability targets. Every step towards 
                  sustainable farming makes a difference for the environment and your income.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    Add New Goal
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    View Recommendations
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
