import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { CloudRain, Bug, Droplets, Calendar } from 'lucide-react';
import type { UserRole, UserData } from '../App';
import { Progress } from './ui/progress';
import { AIAgent, AIAgentButton } from './AIAgent';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* Leaflet icon fix */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CropAdvisoryProps {
  userRole: UserRole;
  userData: UserData | null;
}

export function CropAdvisory(_props: CropAdvisoryProps) {
  const [aiAgentOpen, setAiAgentOpen] = useState(false);
  const [satelliteActive, setSatelliteActive] = useState(false);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  /* 🔹 PLOT DATA + LOCATION (CHANGE COORDS IF NEEDED) */
  const plots = [
    {
      id: 1,
      name: 'Plot A - Wheat',
      health: 85,
      area: '5 acres',
      status: 'excellent',
      coords: [23.0225, 72.5714], // Ahmedabad
    },
    {
      id: 2,
      name: 'Plot B - Rice',
      health: 72,
      area: '4 acres',
      status: 'good',
      coords: [23.1025, 72.6714],
    },
    {
      id: 3,
      name: 'Plot C - Sugarcane',
      health: 65,
      area: '3.5 acres',
      status: 'needs-attention',
      coords: [23.1525, 72.5214],
    },
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

  /* 🌍 INIT MAP ONLY WHEN SATELLITE TAB IS OPEN */
  useEffect(() => {
    if (!satelliteActive) return;
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: plots[0].coords as [number, number],
      zoom: 13,
    });

    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    plots.forEach((plot) => {
      const marker = L.marker(plot.coords as [number, number]).addTo(map);

      marker.bindPopup(`
        <strong>${plot.name}</strong><br/>
        Area: ${plot.area}<br/>
        Health: ${plot.health}%
      `);

      const pulse = L.circleMarker(plot.coords as [number, number], {
        radius: 12,
        color: '#16a34a',
        fillColor: '#16a34a',
        fillOpacity: 0.3,
      }).addTo(map);

      let r = 12;
      let grow = true;
      const animate = () => {
        if (!mapRef.current) return;
        r += grow ? 0.15 : -0.15;
        if (r > 20) grow = false;
        if (r < 12) grow = true;
        pulse.setRadius(r);
        requestAnimationFrame(animate);
      };
      animate();
    });

    setTimeout(() => map.invalidateSize(), 300);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [satelliteActive]);

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
          <TabsTrigger value="satellite" onClick={() => setSatelliteActive(true)}>
            Satellite Monitoring
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {plots.map((plot) => (
              <Card key={plot.id} className="p-6 border-green-100">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-green-900 mb-1">{plot.name}</h3>
                    <p className="text-gray-600">{plot.area}</p>
                  </div>
                  <Badge>{plot.health}%</Badge>
                </div>
                <Progress value={plot.health} />
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-6">Today's Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${rec.priority === 'high'
                      ? 'border-red-500 bg-red-50'
                      : rec.priority === 'medium'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-green-500 bg-green-50'
                    }`}
                >
                  <div className="flex gap-4">
                    <rec.icon className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="text-gray-900">{rec.title}</h3>
                      <p className="text-gray-700">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* SOIL */}
        <TabsContent value="soil" className="space-y-6 mt-6">
          <Card className="p-6 border-green-100">
            <div className="grid md:grid-cols-3 gap-6">
              {soilMetrics.map((metric, index) => (
                <Card key={index} className="p-4 border-gray-200">
                  <span className="text-gray-700">{metric.label}</span>
                  <div className="text-green-900">
                    {metric.value}{metric.unit}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* WEATHER */}
        <TabsContent value="weather" className="space-y-6 mt-6">
          <Card className="p-6 border-green-100">
            <div className="grid md:grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <Card key={i} className="p-4 text-center border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{day}</div>
                  <CloudRain className="mx-auto text-blue-500" />
                  <div className="text-gray-900">28°C</div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* SATELLITE */}
        <TabsContent value="satellite" className="mt-6">
          <Card className="p-6 border-green-100">
            <h2 className="text-green-900 mb-4">Satellite Crop Monitoring</h2>

            <div
              ref={mapContainerRef}
              className="w-full rounded-lg border"
              style={{ height: 420 }}
            />

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900">NDVI Index</h3>
                <div className="text-green-900">0.78</div>
              </Card>
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900">Canopy Coverage</h3>
                <div className="text-green-900">85%</div>
              </Card>
              <Card className="p-4 border-gray-200">
                <h3 className="text-gray-900">Stress Level</h3>
                <div className="text-green-900">Low</div>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <AIAgentButton onClick={() => setAiAgentOpen(true)} />
      <AIAgent isOpen={aiAgentOpen} onClose={() => setAiAgentOpen(false)} />
    </div>
  );
}