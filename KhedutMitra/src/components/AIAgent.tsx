import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MessageSquare, Send, X, Maximize2, Minimize2, 
  Sparkles, Bot, User, Camera, Mic, Paperclip, Loader2,
  XCircle, ScanLine, CheckCircle, AlertTriangle, Volume2, VolumeX, Globe
} from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string;
  analysis?: {
    disease?: string;
    confidence?: number;
    recommendation?: string;
  };
}

interface AIAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AIAgentPropsExtra extends AIAgentProps {
  initialPrompt?: string | undefined;
}

export function AIAgent({ isOpen, onClose, initialPrompt }: AIAgentPropsExtra) {
  const { language, t } = useLanguage();
  const [aiLanguage, setAiLanguage] = useState<Language>(language);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t('ai.greeting'),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Voice language codes for speech recognition
  const voiceLanguageCodes = {
    en: 'en-IN',
    hi: 'hi-IN',
    gu: 'gu-IN'
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Update recognition language when AI language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = voiceLanguageCodes[aiLanguage];
    }
  }, [aiLanguage]);

  const startVoiceRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Text-to-speech for responses
  const speakResponse = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLanguageCodes[aiLanguage];
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // When opened with an external initial prompt (e.g., "Call Dhariyo..."), enqueue it
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim()) {
      const userMessage: Message = {
        role: 'user',
        content: initialPrompt,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate assistant connecting to Dhariyo and starting a conversation
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: `Connecting to Dhariyo...\n\nDhariyo: नमस्ते! मैं यहाँ आपकी मदद के लिए हूँ। आपने कहा: ${initialPrompt}\n\nHow would you like Dhariyo to assist you?`,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        speakResponse(assistantMessage.content);
      }, 1500);
    }
  }, [isOpen, initialPrompt]);

  const quickQuestions = [
    "What's the best time to plant wheat?",
    "How to identify pest infestation?",
    "Soil pH management tips",
    "Water conservation methods",
    "Organic fertilizer recommendations",
  ];

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert('Camera access denied. Please enable camera permissions in your browser settings.');
      console.error('Camera error:', error);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setCapturedImage(null);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        
        // Stop video stream after capture
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  const analyzeCropImage = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    setShowCamera(false);

    // Add user message with image
    const userMessage: Message = {
      role: 'user',
      content: "Please analyze this crop image",
      timestamp: new Date(),
      image: capturedImage,
    };
    setMessages(prev => [...prev, userMessage]);
    setCapturedImage(null);

    // Simulate AI analysis
    setTimeout(() => {
      const diseases = [
        {
          disease: 'Early Blight',
          confidence: 87,
          recommendation: 'Apply copper-based fungicide. Remove infected leaves immediately. Ensure proper spacing for air circulation. Avoid overhead watering.',
        },
        {
          disease: 'Leaf Spot Disease',
          confidence: 92,
          recommendation: 'Remove affected leaves. Apply neem oil spray every 7 days. Improve drainage. Reduce nitrogen fertilizer.',
        },
        {
          disease: 'Healthy Crop',
          confidence: 95,
          recommendation: 'Your crop looks healthy! Continue current practices. Maintain regular monitoring. Apply preventive organic sprays.',
        },
        {
          disease: 'Nutrient Deficiency (Nitrogen)',
          confidence: 85,
          recommendation: 'Apply organic compost or well-rotted manure. Use green manure crops. Apply foliar spray of liquid seaweed.',
        },
        {
          disease: 'Aphid Infestation',
          confidence: 90,
          recommendation: 'Spray neem oil solution. Introduce ladybugs as natural predators. Remove heavily infested parts. Avoid over-fertilization.',
        },
      ];

      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: `### Analysis Complete! 🔍\n\n**Detected:** ${randomDisease.disease}\n**Confidence:** ${randomDisease.confidence}%\n\n**Recommendations:**\n${randomDisease.recommendation}\n\n**Next Steps:**\n• Monitor the crop daily\n• Take action within 24-48 hours\n• Document progress with photos\n• Contact our expert if condition worsens\n\nWould you like more detailed information about treatment methods?`,
        timestamp: new Date(),
        analysis: randomDisease,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsAnalyzing(false);
      speakResponse(assistantMessage.content);
    }, 3000);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your location and current season, I recommend the following approach...",
        "Great question! Let me provide you with detailed guidance on this...",
        "According to the latest agricultural research and your farm's conditions...",
        "I can help you with that. Here's what you need to know...",
        "This is an important aspect of farming. Let me break it down for you...",
      ];

      const detailedResponses: Record<string, string> = {
        "wheat": "🌾 **Best Time to Plant Wheat:**\n\n**Northern India (Punjab, Haryana, UP):**\n• Sowing: October 15 - November 30\n• Soil temp: 10-15°C\n\n**Central India:**\n• Sowing: November 1-30\n\n**Key Requirements:**\n✓ Use certified seeds (40-50 kg/acre)\n✓ Ensure proper soil moisture\n✓ Apply basal fertilizers before sowing\n✓ Maintain row spacing of 20-23 cm\n\nWould you like specific variety recommendations?",
        
        "pest": "🐛 **Pest Infestation Identification:**\n\n**Visual Signs:**\n• Yellow/brown spots on leaves\n• Holes in leaves or fruits\n• Wilting despite watering\n• Visible insects on plants\n• Webbing or silk threads\n• Sticky residue (honeydew)\n\n**Action Steps:**\n1. Take a photo and use our camera feature\n2. Check undersides of leaves\n3. Monitor early morning/evening\n4. Look for egg clusters\n\n💡 Use the camera button to scan your crops for instant AI detection!",
        
        "soil": "🌱 **Soil pH Management Guide:**\n\n**Ideal pH Range:**\n• Most crops: 6.0-7.5\n• Rice: 5.5-6.5\n• Vegetables: 6.0-7.0\n\n**To Increase pH (Acidic Soil):**\n✓ Add agricultural lime (2-3 tons/acre)\n✓ Wood ash (500 kg/acre)\n✓ Dolomite for Mg deficiency\n\n**To Decrease pH (Alkaline Soil):**\n✓ Elemental sulfur (100-300 kg/acre)\n✓ Organic compost\n✓ Acidifying fertilizers\n\n**Best Practices:**\n• Test soil every 6 months\n• Adjust gradually (0.5 pH/year)\n• Apply during land preparation\n\nNeed crop-specific recommendations?",
        
        "water": "💧 **Water Conservation Methods:**\n\n**1. Drip Irrigation**\n• Water saving: 40-60%\n• ROI: 2-3 years\n• Best for: All crops\n\n**2. Mulching**\n• Evaporation reduction: 50%\n• Materials: Straw, plastic, organic matter\n• Depth: 5-10 cm\n\n**3. Rainwater Harvesting**\n• Collect in farm ponds\n• Recharge groundwater\n• Use for dry periods\n\n**4. Smart Irrigation Timing**\n• Early morning (4-8 AM)\n• Late evening (6-8 PM)\n• Avoid midday heat\n\n**5. Crop Rotation**\n• Rotate with low-water crops\n• Improve soil structure\n• Reduce water needs\n\nImplementing all can reduce water usage by 70%!",
        
        "fertilizer": "🌿 **Organic Fertilizer Recommendations:**\n\n**1. Vermicompost**\n• Dose: 2-3 tons/acre\n• NPK: 2-1-1 + micronutrients\n• Best time: 2 weeks before sowing\n\n**2. Farmyard Manure (FYM)**\n• Dose: 5-7 tons/acre\n• Improves soil structure\n• Apply well-decomposed only\n\n**3. Green Manure**\n• Grow: Dhaincha, Sunhemp\n• Incorporate before flowering\n• Adds nitrogen naturally\n\n**4. Neem Cake**\n• Dose: 200-500 kg/acre\n• Dual benefit: Fertilizer + Pest control\n• Release nutrients slowly\n\n**5. Bio-fertilizers**\n• Rhizobium for legumes\n• Azotobacter for cereals\n• PSB for phosphorus\n\n**Application Tips:**\n✓ Apply 2-3 weeks before sowing\n✓ Mix with soil thoroughly\n✓ Ensure adequate moisture\n✓ Combine different types for best results\n\nWant crop-specific dosage?",
      };

      let response = responses[Math.floor(Math.random() * responses.length)];
      
      // Check for keywords and provide detailed responses
      const lowerInput = input.toLowerCase();
      for (const [keyword, detailedResponse] of Object.entries(detailedResponses)) {
        if (lowerInput.includes(keyword)) {
          response = detailedResponse;
          break;
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      speakResponse(assistantMessage.content);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed ${isExpanded ? 'inset-4' : 'bottom-4 right-4'} z-50 transition-all duration-300`}>
      <Card className={`${isExpanded ? 'w-full h-full' : 'w-96 h-[600px]'} flex flex-col shadow-2xl border-green-200 overflow-hidden bg-white`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur animate-pulse-slow">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-white flex items-center gap-2">
                AI Farming Assistant
                <Badge variant="secondary" className="bg-white/20 text-white border-none animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="text-green-100 text-sm">Powered by Advanced AI</div>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4 text-white" />
              ) : (
                <Maximize2 className="h-4 w-4 text-white" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Camera View */}
        {showCamera && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col">
            <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur">
              <div className="text-white flex items-center gap-2">
                <ScanLine className="h-5 w-5 animate-pulse" />
                <span>Scan Your Crop</span>
              </div>
              <button
                onClick={closeCamera}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-white" />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Scanning Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-4 border-green-500/50"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-500 animate-scan"></div>
                
                {/* Corner Markers */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
                <div className="absolute bottom-20 left-4 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
                <div className="absolute bottom-20 right-4 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="p-6 bg-black/80 backdrop-blur">
              <div className="text-center mb-4">
                <p className="text-white mb-2">Position the crop clearly in the frame</p>
                <p className="text-green-300 text-sm">AI will analyze for diseases, pests & health</p>
              </div>
              <Button
                onClick={captureImage}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6 text-lg"
              >
                <Camera className="mr-2 h-6 w-6" />
                Capture & Analyze
              </Button>
            </div>
          </div>
        )}

        {/* Captured Image Preview */}
        {capturedImage && !showCamera && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col">
            <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur">
              <div className="text-white">Preview Image</div>
              <button
                onClick={() => setCapturedImage(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-white" />
              </button>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center p-4">
              <img src={capturedImage} alt="Captured crop" className="max-w-full max-h-full object-contain rounded-lg" />
            </div>
            
            <div className="p-6 bg-black/80 backdrop-blur space-y-3">
              <Button
                onClick={analyzeCropImage}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" />
                    Analyze Crop Health
                  </>
                )}
              </Button>
              <Button
                onClick={() => setCapturedImage(null)}
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10"
              >
                Retake Photo
              </Button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50/30 to-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              {message.role === 'assistant' && (
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-full h-10 w-10 flex-shrink-0 shadow-md">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-white border-2 border-green-100 text-gray-800 shadow-md'
                }`}
              >
                {message.image && (
                  <img src={message.image} alt="Crop scan" className="rounded-lg mb-3 max-w-full" />
                )}
                {message.analysis && (
                  <div className="mb-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {message.analysis.confidence && message.analysis.confidence > 80 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      )}
                      <span className="font-semibold text-green-900">{message.analysis.disease}</span>
                    </div>
                    <div className="text-sm text-green-700">
                      Confidence: {message.analysis.confidence}%
                    </div>
                  </div>
                )}
                <div className="whitespace-pre-line">{message.content}</div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-2 rounded-full h-10 w-10 flex-shrink-0 shadow-md">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fade-in-up">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-full h-10 w-10 shadow-md">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <div className="bg-white border-2 border-green-100 rounded-2xl px-4 py-3 shadow-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                  <span className="text-gray-600">AI is analyzing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-green-600" />
              Try asking:
            </div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-2 bg-white hover:bg-green-100 text-green-700 rounded-lg transition-all text-sm border border-green-200 shadow-sm hover:shadow-md"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-green-100 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <button 
              onClick={openCamera}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600 relative group"
            >
              <Camera className="h-5 w-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Scan Crop
              </div>
            </button>
            <button
              onClick={voiceEnabled ? startVoiceRecording : stopVoiceRecording}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600 relative group"
            >
              {isRecording ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isRecording ? 'Stop Recording' : 'Record Voice'}
              </div>
            </button>
            <button
              onClick={toggleVoice}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600 relative group"
            >
              {voiceEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {voiceEnabled ? 'Enable Voice' : 'Disable Voice'}
              </div>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600 relative group"
              >
                <Globe className="h-5 w-5" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Change Language
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => setAiLanguage('en')}
                  className={aiLanguage === 'en' ? 'bg-green-100' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('hi')}
                  className={aiLanguage === 'hi' ? 'bg-green-100' : ''}
                >
                  Hindi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('bn')}
                  className={aiLanguage === 'bn' ? 'bg-green-100' : ''}
                >
                  Bengali
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('mr')}
                  className={aiLanguage === 'mr' ? 'bg-green-100' : ''}
                >
                  Marathi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('ta')}
                  className={aiLanguage === 'ta' ? 'bg-green-100' : ''}
                >
                  Tamil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('te')}
                  className={aiLanguage === 'te' ? 'bg-green-100' : ''}
                >
                  Telugu
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('ur')}
                  className={aiLanguage === 'ur' ? 'bg-green-100' : ''}
                >
                  Urdu
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('gu')}
                  className={aiLanguage === 'gu' ? 'bg-green-100' : ''}
                >
                  Gujarati
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('kn')}
                  className={aiLanguage === 'kn' ? 'bg-green-100' : ''}
                >
                  Kannada
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('ml')}
                  className={aiLanguage === 'ml' ? 'bg-green-100' : ''}
                >
                  Malayalam
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('or')}
                  className={aiLanguage === 'or' ? 'bg-green-100' : ''}
                >
                  Oriya
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('pa')}
                  className={aiLanguage === 'pa' ? 'bg-green-100' : ''}
                >
                  Punjabi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('sd')}
                  className={aiLanguage === 'sd' ? 'bg-green-100' : ''}
                >
                  Sindhi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('si')}
                  className={aiLanguage === 'si' ? 'bg-green-100' : ''}
                >
                  Sinhala
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAiLanguage('ur')}
                  className={aiLanguage === 'ur' ? 'bg-green-100' : ''}
                >
                  Urdu
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600">
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about crops, pests, soil, weather..."
              className="flex-1 border-green-200 focus:border-green-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Floating button to open AI Agent
interface AIAgentButtonProps {
  onClick: () => void;
}

export function AIAgentButton({ onClick }: AIAgentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:to-emerald-700 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 animate-bounce-slow hover:animate-none group transform hover:scale-110"
    >
      <MessageSquare className="h-7 w-7 group-hover:scale-110 transition-transform" />
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-semibold shadow-lg">
        AI
      </div>
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
    </button>
  );
}