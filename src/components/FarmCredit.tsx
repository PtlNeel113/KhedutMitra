import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CreditCard, TrendingUp, CheckCircle, Clock, 
  DollarSign, FileText, Award, AlertCircle, Calculator
} from 'lucide-react';
import { UserRole } from '../App';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface FarmCreditProps {
  userRole: UserRole;
}

export function FarmCredit({ userRole }: FarmCreditProps) {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [loanTenure, setLoanTenure] = useState('12');

  const creditScore = {
    score: 750,
    rating: 'Excellent',
    factors: [
      { name: 'Repayment History', score: 90, impact: 'positive' },
      { name: 'Land Ownership', score: 85, impact: 'positive' },
      { name: 'Crop Diversity', score: 75, impact: 'positive' },
      { name: 'Carbon Credits', score: 80, impact: 'positive' },
      { name: 'Insurance Coverage', score: 70, impact: 'neutral' },
    ],
  };

  const activeLoans = [
    {
      id: 'LOAN-2024-001',
      amount: '₹2,00,000',
      purpose: 'Seed & Fertilizer Purchase',
      disbursed: '2024-09-01',
      tenure: 12,
      interest: 8.5,
      repaid: 50,
      nextEmi: '₹18,500',
      nextDue: '2024-12-01',
      status: 'active',
    },
    {
      id: 'LOAN-2024-002',
      amount: '₹1,50,000',
      purpose: 'Equipment Purchase',
      disbursed: '2024-08-15',
      tenure: 18,
      interest: 9.0,
      repaid: 33,
      nextEmi: '₹9,200',
      nextDue: '2024-11-15',
      status: 'active',
    },
  ];

  const loanOffers = [
    {
      type: 'Quick Crop Loan',
      amount: 'Up to ₹5,00,000',
      interest: '7.5% p.a.',
      tenure: '3-12 months',
      approval: 'Within 24 hours',
      features: ['No collateral', 'Flexible repayment', 'Seasonal adjustment'],
    },
    {
      type: 'Equipment Finance',
      amount: 'Up to ₹15,00,000',
      interest: '8.5% p.a.',
      tenure: '12-36 months',
      approval: 'Within 48 hours',
      features: ['Asset-backed', 'EMI moratorium', 'Insurance included'],
    },
    {
      type: 'Land Development',
      amount: 'Up to ₹25,00,000',
      interest: '9.0% p.a.',
      tenure: '24-60 months',
      approval: 'Within 72 hours',
      features: ['Long tenure', 'Subsidized rates', 'Grace period'],
    },
  ];

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const rate = 8.5 / 100 / 12; // Monthly interest rate
    const time = parseFloat(loanTenure);
    
    if (principal && rate && time) {
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      return emi.toFixed(0);
    }
    return '0';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Instant Farm Credit</h1>
        <p className="text-gray-600">
          AI-powered credit assessment with quick loan approvals and flexible repayment
        </p>
      </div>

      {/* Credit Score & Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-green-100 md:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-gray-700 mb-2">Your Credit Score</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-green-900">{creditScore.score}</span>
                <Badge variant="default">{creditScore.rating}</Badge>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <Progress value={(creditScore.score / 900) * 100} className="mb-3" />
          <p className="text-gray-600">
            Your excellent score qualifies you for the best interest rates and higher loan amounts.
          </p>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-lg w-fit mb-4">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-green-900 mb-1">₹3,50,000</div>
          <div className="text-gray-600">Active Loans</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg w-fit mb-4">
            <DollarSign className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-green-900 mb-1">₹7,50,000</div>
          <div className="text-gray-600">Credit Available</div>
        </Card>
      </div>

      <Tabs defaultValue="apply" className="mb-8">
        <TabsList>
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="offers">Loan Offers</TabsTrigger>
          <TabsTrigger value="score">Credit Score</TabsTrigger>
        </TabsList>

        <TabsContent value="apply" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 border-green-100">
              <h2 className="text-green-900 mb-6">Quick Loan Application</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-gray-700 mb-2 block">Loan Purpose</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Select purpose</option>
                    <option>Seeds & Fertilizers</option>
                    <option>Equipment Purchase</option>
                    <option>Land Development</option>
                    <option>Irrigation Setup</option>
                    <option>Working Capital</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">Loan Amount (₹)</label>
                    <Input 
                      type="number" 
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">Tenure (months)</label>
                    <Input 
                      type="number" 
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      placeholder="Enter tenure"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 mb-2 block">Collateral (Optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>No collateral required</option>
                    <option>Land papers</option>
                    <option>Equipment</option>
                    <option>Crop insurance</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">Expected Harvest Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-2 block">Crop Type</label>
                    <Input placeholder="e.g., Wheat, Rice" />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="text-green-900 mb-1">AI Pre-Approval</h3>
                      <p className="text-green-800">
                        Based on your credit score and farming history, you are pre-approved for up to ₹7,50,000 
                        at 7.5% interest rate.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">Submit Application</Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 border-green-100">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-green-600" />
                  <h3 className="text-green-900">EMI Calculator</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="text-gray-900">₹{parseInt(loanAmount).toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="text-gray-900">8.5% p.a.</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-600">Tenure</span>
                      <span className="text-gray-900">{loanTenure} months</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Monthly EMI</span>
                      <span className="text-green-900">₹{parseInt(calculateEmi()).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Quick Approval Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">Submit Application</div>
                      <div className="text-gray-600">5 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">AI Assessment</div>
                      <div className="text-gray-600">2-4 hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">Approval</div>
                      <div className="text-gray-600">Within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">Disbursement</div>
                      <div className="text-gray-600">Same day</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="space-y-6">
            {activeLoans.map((loan) => (
              <Card key={loan.id} className="p-6 border-green-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-green-900">{loan.purpose}</h3>
                      <Badge variant="default">{loan.status}</Badge>
                    </div>
                    <div className="text-gray-600">Loan ID: {loan.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-900 mb-1">{loan.amount}</div>
                    <div className="text-gray-600">{loan.interest}% interest</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-gray-600 mb-1">Disbursed On</div>
                    <div className="text-gray-900">{new Date(loan.disbursed).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Tenure</div>
                    <div className="text-gray-900">{loan.tenure} months</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Next EMI</div>
                    <div className="text-gray-900">{loan.nextEmi}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Due Date</div>
                    <div className="text-gray-900">{new Date(loan.nextDue).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Repayment Progress</span>
                    <span className="text-gray-900">{loan.repaid}% completed</span>
                  </div>
                  <Progress value={loan.repaid} />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">View Statement</Button>
                  <Button variant="outline">Pay EMI</Button>
                  <Button>Prepay Loan</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offers" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {loanOffers.map((offer, index) => (
              <Card key={index} className="p-6 border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-green-900 mb-1">{offer.type}</h3>
                    <Badge variant="secondary">{offer.approval}</Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-gray-900">{offer.amount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Interest</span>
                    <span className="text-gray-900">{offer.interest}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Tenure</span>
                    <span className="text-gray-900">{offer.tenure}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-gray-700 mb-2">Features</div>
                  <ul className="space-y-2">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full">Apply Now</Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100">
            <h3 className="text-green-900 mb-4">Why Choose KhedutMitra Farm Credit?</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-gray-900 mb-2">24-Hour Approval</h4>
                <p className="text-gray-600">Quick AI-powered credit decisions</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Low Interest</h4>
                <p className="text-gray-600">Starting from 7.5% per annum</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Flexible Terms</h4>
                <p className="text-gray-600">Seasonal payment options available</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Minimal Paperwork</h4>
                <p className="text-gray-600">100% digital process</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="score" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 border-green-100">
              <h2 className="text-green-900 mb-6">Credit Score Breakdown</h2>
              <div className="space-y-6">
                {creditScore.factors.map((factor, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{factor.name}</span>
                        {factor.impact === 'positive' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <span className="text-gray-900">{factor.score}/100</span>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="text-green-900 mb-1">Improve Your Score</h3>
                    <ul className="text-green-800 space-y-1">
                      <li>• Continue making timely EMI payments</li>
                      <li>• Add more carbon credit certifications</li>
                      <li>• Diversify your crop portfolio</li>
                      <li>• Maintain good insurance coverage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Score Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900 mb-1">Higher Loan Limits</div>
                      <div className="text-gray-600">Up to ₹25 lakh</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900 mb-1">Lower Interest</div>
                      <div className="text-gray-600">From 7.5% p.a.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900 mb-1">Instant Approval</div>
                      <div className="text-gray-600">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Score History</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current</span>
                    <span className="text-green-900">750</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">3 months ago</span>
                    <span className="text-gray-900">720</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">6 months ago</span>
                    <span className="text-gray-900">690</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <TrendingUp className="h-4 w-4" />
                    <span>+60 points improvement!</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
