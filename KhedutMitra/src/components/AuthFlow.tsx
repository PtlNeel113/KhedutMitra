import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  Sprout, Users, Award, TrendingUp, ArrowRight, 
  MapPin, Camera, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { UserData } from '../App';
import authBg from 'figma:asset/4f0ad3a0694236a0379475e211423a062811c845.png';

interface AuthFlowProps {
  onComplete: (userData: UserData) => void;
  onBack: () => void;
}

export function AuthFlow({ onComplete, onBack }: AuthFlowProps) {
  const [step, setStep] = useState<'role' | 'details' | 'permissions' | 'complete'>('role');
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    {
      value: 'farmer',
      icon: Sprout,
      title: 'Farmer',
      description: 'Individual farmer looking to improve farming practices',
      color: 'green',
    },
    {
      value: 'fpo',
      icon: Users,
      title: 'FPO',
      description: 'Farmer Producer Organization managing farmer groups',
      color: 'emerald',
    },
    {
      value: 'buyer',
      icon: Award,
      title: 'Institutional Buyer',
      description: 'Business sourcing organic and residue-free produce',
      color: 'blue',
    },
    {
      value: 'investor',
      icon: TrendingUp,
      title: 'Investor',
      description: 'Invest in carbon credits and sustainable agriculture',
      color: 'purple',
    },
  ];

  const roleStyles: Record<string, { border: string; iconBg: string; iconColor: string; selectedBg: string }> = {
    green: { border: '#16a34a', iconBg: '#ecfdf6', iconColor: '#16a34a', selectedBg: '#ecfdf3' },
    emerald: { border: '#10b981', iconBg: '#ecfdf6', iconColor: '#059669', selectedBg: '#ecfdf3' },
    blue: { border: '#3b82f6', iconBg: '#eff6ff', iconColor: '#2563eb', selectedBg: '#eff6ff' },
    purple: { border: '#8b5cf6', iconBg: '#f5f3ff', iconColor: '#7c3aed', selectedBg: '#f5f3ff' },
    default: { border: '#d1d5db', iconBg: '#f8fafc', iconColor: '#6b7280', selectedBg: '#ffffff' }
  };

  const handleRoleSelect = (role: string) => {
    setUserData({ ...userData, role: role as any });
    setStep('details');
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!userData.name?.trim()) newErrors.name = 'Name is required';
    if (!userData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!userData.phone?.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }

    if (userData.role === 'farmer') {
      if (!userData.farmSize?.trim()) newErrors.farmSize = 'Farm size is required';
      if (!userData.location?.trim()) newErrors.location = 'Location is required';
      if (!userData.crops?.length) newErrors.crops = 'Select at least one crop';
    } else if (userData.role === 'fpo') {
      if (!userData.organizationName?.trim()) newErrors.organizationName = 'Organization name is required';
      if (!userData.memberCount?.trim()) newErrors.memberCount = 'Member count is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsSubmit = () => {
    if (validateDetails()) {
      setStep('permissions');
    }
  };

  const requestCameraPermission = async () => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setUserData({ ...userData, cameraPermission: true });
    } catch (error) {
      setUserData({ ...userData, cameraPermission: false });
      alert('Camera permission denied. You can enable it later in settings.');
    } finally {
      setLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setUserData({ 
        ...userData, 
        locationPermission: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      setUserData({ ...userData, locationPermission: false });
      alert('Location permission denied. You can enable it later in settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    setStep('complete');
    setTimeout(() => {
      onComplete(userData as UserData);
    }, 2000);
  };

  const cropOptions = [
    'Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize',
    'Vegetables', 'Fruits', 'Pulses', 'Oilseeds', 'Spices'
  ];

  const toggleCrop = (crop: string) => {
    const currentCrops = userData.crops || [];
    if (currentCrops.includes(crop)) {
      setUserData({ ...userData, crops: currentCrops.filter(c => c !== crop) });
    } else {
      setUserData({ ...userData, crops: [...currentCrops, crop] });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            {['role', 'details', 'permissions', 'complete'].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === s ? 'bg-green-600 text-white' : 
                  ['role', 'details', 'permissions', 'complete'].indexOf(step) > index ? 'bg-green-200 text-green-700' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {['role', 'details', 'permissions', 'complete'].indexOf(step) > index ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    ['role', 'details', 'permissions', 'complete'].indexOf(step) > index ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-green-900 mb-2">
              {step === 'role' && 'Choose Your Role'}
              {step === 'details' && 'Tell Us About Yourself'}
              {step === 'permissions' && 'Enable Features'}
              {step === 'complete' && 'Welcome to KhedutMitra!'}
            </h1>
            <p className="text-gray-600">
              {step === 'role' && 'Select the option that best describes you'}
              {step === 'details' && 'We need some information to personalize your experience'}
              {step === 'permissions' && 'Allow permissions for enhanced functionality'}
              {step === 'complete' && 'Your account is ready!'}
            </p>
          </div>
        </div>

        {/* Step: Role Selection */}
        {step === 'role' && (
          <Card className="p-8 border-green-100">
            <div className="grid md:grid-cols-2 gap-6">
              {roles.map((role) => {
                const style = roleStyles[role.color] || roleStyles.default;
                const selected = userData.role === role.value;
                return (
                  <button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className={`p-6 border-2 rounded-xl hover:shadow-lg transition-all text-left`}
                    style={{ borderColor: selected ? style.border : undefined, background: selected ? style.selectedBg : undefined }}
                  >
                    <div style={{ background: style.iconBg }} className={`p-4 rounded-lg w-fit mb-4`}>
                      <role.icon className={`h-8 w-8`} style={{ color: style.iconColor }} />
                    </div>
                    <h3 className="text-green-900 mb-2">{role.title}</h3>
                    <p className="text-gray-600">{role.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-green-600">
                      <span>Continue as {role.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={onBack}>
                Back to Home
              </Button>
            </div>
          </Card>
        )}

        {/* Step: User Details */}
        {step === 'details' && (
          <Card className="p-8 border-green-100">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-green-900 mb-4">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={userData.name || ''}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email || ''}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={userData.phone || ''}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Farmer Specific */}
              {userData.role === 'farmer' && (
                <div>
                  <h3 className="text-green-900 mb-4">Farm Details</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="farmSize">Farm Size (in acres) *</Label>
                      <Input
                        id="farmSize"
                        value={userData.farmSize || ''}
                        onChange={(e) => setUserData({ ...userData, farmSize: e.target.value })}
                        placeholder="e.g., 5.5"
                        className={errors.farmSize ? 'border-red-500' : ''}
                      />
                      {errors.farmSize && <p className="text-red-500 text-sm mt-1">{errors.farmSize}</p>}
                    </div>
                    <div>
                      <Label htmlFor="location">Location (Village/City) *</Label>
                      <Input
                        id="location"
                        value={userData.location || ''}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        placeholder="e.g., Kheda, Punjab"
                        className={errors.location ? 'border-red-500' : ''}
                      />
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>
                    <div>
                      <Label htmlFor="experience">Farming Experience</Label>
                      <select
                        id="experience"
                        value={userData.experience || ''}
                        onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label>Crops You Grow *</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cropOptions.map((crop) => (
                        <Badge
                          key={crop}
                          variant={userData.crops?.includes(crop) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleCrop(crop)}
                        >
                          {crop}
                        </Badge>
                      ))}
                    </div>
                    {errors.crops && <p className="text-red-500 text-sm mt-1">{errors.crops}</p>}
                  </div>
                </div>
              )}

              {/* FPO Specific */}
              {userData.role === 'fpo' && (
                <div>
                  <h3 className="text-green-900 mb-4">Organization Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        value={userData.organizationName || ''}
                        onChange={(e) => setUserData({ ...userData, organizationName: e.target.value })}
                        placeholder="e.g., Green Valley FPO"
                        className={errors.organizationName ? 'border-red-500' : ''}
                      />
                      {errors.organizationName && <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="memberCount">Number of Members *</Label>
                      <Input
                        id="memberCount"
                        value={userData.memberCount || ''}
                        onChange={(e) => setUserData({ ...userData, memberCount: e.target.value })}
                        placeholder="e.g., 150"
                        className={errors.memberCount ? 'border-red-500' : ''}
                      />
                      {errors.memberCount && <p className="text-red-500 text-sm mt-1">{errors.memberCount}</p>}
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={userData.location || ''}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        placeholder="e.g., Karnataka"
                        className={errors.location ? 'border-red-500' : ''}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Buyer/Investor Specific */}
              {(userData.role === 'buyer' || userData.role === 'investor') && (
                <div>
                  <h3 className="text-green-900 mb-4">
                    {userData.role === 'buyer' ? 'Business' : 'Investment'} Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationName">
                        {userData.role === 'buyer' ? 'Company' : 'Organization'} Name *
                      </Label>
                      <Input
                        id="organizationName"
                        value={userData.organizationName || ''}
                        onChange={(e) => setUserData({ ...userData, organizationName: e.target.value })}
                        placeholder={userData.role === 'buyer' ? 'e.g., Organic Foods Ltd' : 'e.g., Impact Ventures'}
                        className={errors.organizationName ? 'border-red-500' : ''}
                      />
                      {errors.organizationName && <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={userData.location || ''}
                        onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                        placeholder="e.g., Mumbai"
                        className={errors.location ? 'border-red-500' : ''}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-8">
              <Button variant="outline" onClick={() => setStep('role')}>
                Back
              </Button>
              <Button onClick={handleDetailsSubmit}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step: Permissions */}
        {step === 'permissions' && (
          <Card className="p-8 border-green-100">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-700">
                  Enable these permissions to get the most out of KhedutMitra. You can change these anytime in settings.
                </p>
              </div>

              {/* Camera Permission */}
              <Card className="p-6 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${
                    userData.cameraPermission ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Camera className={`h-6 w-6 ${
                      userData.cameraPermission ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">Camera Access</h3>
                      {userData.cameraPermission && (
                        <Badge variant="default" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Enabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Take photos of your crops for AI-powered disease detection, quality assessment, 
                      and documentation for certifications and insurance claims.
                    </p>
                    <Button
                      variant={userData.cameraPermission ? 'outline' : 'default'}
                      onClick={requestCameraPermission}
                      disabled={loading || userData.cameraPermission}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Requesting...
                        </>
                      ) : userData.cameraPermission ? (
                        'Camera Enabled'
                      ) : (
                        'Enable Camera'
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Location Permission */}
              <Card className="p-6 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${
                    userData.locationPermission ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <MapPin className={`h-6 w-6 ${
                      userData.locationPermission ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">Location Access</h3>
                      {userData.locationPermission && (
                        <Badge variant="default" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Enabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Get hyper-local weather forecasts, soil data, pest alerts, and connect with 
                      nearby farmers, suppliers, and buyers. Essential for accurate crop advisory.
                    </p>
                    <Button
                      variant={userData.locationPermission ? 'outline' : 'default'}
                      onClick={requestLocationPermission}
                      disabled={loading || userData.locationPermission}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Requesting...
                        </>
                      ) : userData.locationPermission ? (
                        'Location Enabled'
                      ) : (
                        'Enable Location'
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {!userData.cameraPermission || !userData.locationPermission ? (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-900 mb-1">Optional Permissions</h4>
                    <p className="text-yellow-800">
                      These permissions are optional but highly recommended for the best experience. 
                      You can enable them later from your profile settings.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between mt-8">
              <Button variant="outline" onClick={() => setStep('details')}>
                Back
              </Button>
              <Button onClick={handleComplete}>
                Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step: Complete */}
        {step === 'complete' && (
          <Card className="p-12 border-green-100 text-center">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-green-900 mb-4">Welcome to KhedutMitra, {userData.name}!</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your account has been successfully created. We're preparing your personalized dashboard...
            </p>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-green-600" />
              <span className="text-gray-600">Setting up your experience</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}