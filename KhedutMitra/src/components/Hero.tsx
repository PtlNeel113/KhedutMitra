import { ArrowRight, Leaf, Shield, Sprout, CreditCard, Award, TrendingUp, Sparkles, Users, BarChart3, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import heroImage1 from 'figma:asset/ea16e4537348c25b62930d289346a074cfe4b4b5.png';
import heroImage2 from 'figma:asset/5f4b0e43e309076be457acc424d9520ef424fa22.png';
import heroImage3 from 'figma:asset/4f0ad3a0694236a0379475e211423a062811c845.png';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const features = [
    {
      icon: Sprout,
      title: 'AI Crop Advisory',
      description: 'Get personalized farming recommendations powered by satellite data, weather analytics, and machine learning',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Leaf,
      title: 'Carbon Credits Trading',
      description: 'Generate, verify, and trade carbon credits from regenerative agriculture practices',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Smart Insurance',
      description: 'Weather-based parametric insurance with automatic payouts when conditions trigger',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: CreditCard,
      title: 'Instant Farm Credit',
      description: 'AI-powered credit scoring and quick loan approvals within 24 hours',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Buy-Back Guarantee',
      description: 'Assured purchase of your residue-free produce at premium prices',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      icon: Award,
      title: 'Farm-to-Fork Tracking',
      description: 'Complete traceability with QR codes for quality assurance and consumer trust',
      gradient: 'from-indigo-400 to-purple-500',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Farmers', icon: Users },
    { value: '₹50 Cr+', label: 'Credits Disbursed', icon: CreditCard },
    { value: '500+', label: 'FPOs Connected', icon: Award },
    { value: '95%', label: 'Satisfaction Rate', icon: BarChart3 },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farmer, Punjab',
      text: 'Carbon credits increased my income by 35%. The AI advisory helped me go completely organic.',
      avatar: 'RK',
    },
    {
      name: 'Green Valley FPO',
      role: 'FPO, Karnataka',
      text: 'Connecting 200+ farmers to premium buyers. The buy-back guarantee changed everything.',
      avatar: 'GV',
    },
    {
      name: 'Organic Foods Ltd',
      role: 'Buyer, Mumbai',
      text: 'Farm-to-fork traceability gives our customers confidence. Best sourcing platform.',
      avatar: 'OF',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Parallax Background */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/85 to-teal-900/90 z-10"></div>
          <img 
            src={heroImage3} 
            alt="Modern Agriculture" 
            className="w-full h-full object-cover animate-slow-zoom"
          />
          {/* Animated Overlay Patterns */}
          <div className="absolute inset-0 z-20 bg-grid-white/5"></div>
          <div className="absolute top-0 -left-4 w-96 h-96 bg-green-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-left">
              <Badge className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 transition-all">
                <Sparkles className="h-4 w-4 mr-2" />
                India's Leading AgriTech Platform
              </Badge>
              
              <h1 className="text-white mb-6 text-4xl lg:text-6xl animate-fade-in-up">
                Transform Your Farm with
                <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent mt-2">
                  Residue-Free Farming
                </span>
              </h1>
              
              <p className="text-green-50 mb-8 text-lg lg:text-xl leading-relaxed animate-fade-in-up animation-delay-200">
                Join 10,000+ farmers earning more through sustainable agriculture. Get AI-powered crop advisory, 
                carbon credits, instant loans, and premium prices for your produce.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 animate-fade-in-up animation-delay-400">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-white text-green-900 hover:bg-green-50 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                >
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-md"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-green-50 animate-fade-in-up animation-delay-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>

            {/* Right Column - Floating Cards */}
            <div className="relative hidden lg:block">
              <div className="relative h-[600px]">
                {/* Floating Card 1 */}
                <Card className="absolute top-0 right-0 p-6 w-64 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl animate-float">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-400 p-2 rounded-lg">
                      <Sprout className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-white">AI Advisory</div>
                  </div>
                  <div className="text-green-100">Real-time crop insights powered by AI</div>
                </Card>

                {/* Floating Card 2 */}
                <Card className="absolute top-32 left-0 p-6 w-64 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl animate-float animation-delay-1000">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-emerald-400 p-2 rounded-lg">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-white">Carbon Credits</div>
                  </div>
                  <div className="text-green-100">Earn from sustainable practices</div>
                </Card>

                {/* Floating Card 3 */}
                <Card className="absolute bottom-32 right-12 p-6 w-64 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl animate-float animation-delay-2000">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-400 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-white">Instant Credit</div>
                  </div>
                  <div className="text-green-100">Get loans approved in 24 hours</div>
                </Card>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up animation-delay-800">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                <stat.icon className="h-6 w-6 text-green-300 mx-auto mb-3" />
                <div className="text-white text-center mb-1 text-2xl">{stat.value}</div>
                <div className="text-green-100 text-center">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section with Background */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/95 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 z-10"></div>
          <img 
            src={heroImage2} 
            alt="Happy Farmer" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-green-900 dark:text-green-300 mb-4">Complete Sustainable Farming Ecosystem</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to transition to profitable, sustainable, and residue-free farming
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group p-6 hover:shadow-2xl transition-all duration-500 border-green-100 dark:border-green-700 hover:-translate-y-4 bg-white/90 dark:bg-slate-800/90 dark:hover:bg-slate-700 backdrop-blur-sm overflow-hidden relative transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-100 dark:from-green-500/30 to-emerald-100 dark:to-emerald-500/30 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-2xl"></div>
                
                <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-green-900 dark:text-green-300 mb-3 group-hover:text-green-600 dark:group-hover:text-green-200 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-20 bg-gradient-to-br from-green-50 dark:from-slate-900 to-emerald-50 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-green-900 dark:text-green-300 mb-4">Trusted by Farmers Across India</h2>
            <p className="text-gray-600 dark:text-gray-400">Real stories from real farmers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-green-100 dark:border-green-700 hover:shadow-xl transition-all bg-white dark:bg-slate-800 transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-100 dark:from-green-600 to-emerald-100 dark:to-emerald-600 p-4 rounded-full w-14 h-14 flex items-center justify-center">
                    <span className="text-green-700 dark:text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Growth Image */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-emerald-900/95 to-teal-900/95 z-10"></div>
          <img 
            src={heroImage1} 
            alt="Growth" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-grid-white/10 z-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-30">
          <h2 className="text-white mb-4 text-3xl lg:text-5xl">Ready to Transform Your Agricultural Journey?</h2>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto text-lg lg:text-xl">
            Join thousands of farmers already benefiting from sustainable practices. 
            Get started in under 5 minutes with zero joining fees.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-green-900 hover:bg-green-50 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            >
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-md shadow-xl"
            >
              Talk to Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
