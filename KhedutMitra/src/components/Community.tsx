import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { 
  Users, MessageSquare, Heart, Share2, BookOpen, 
  Video, Award, TrendingUp, Search, Plus
} from 'lucide-react';
import { UserRole } from '../App';
import { useState } from 'react';

interface CommunityProps {
  userRole: UserRole;
}

export function Community({ userRole }: CommunityProps) {
  const [newPostOpen, setNewPostOpen] = useState(false);

  const posts = [
    {
      id: 1,
      author: 'Rajesh Patel',
      role: 'Farmer',
      time: '2 hours ago',
      content: 'Just completed my first carbon credit verification! Got 45 tCO2e credits certified. The satellite verification process was smooth. Happy to help anyone starting their journey.',
      likes: 24,
      comments: 8,
      tags: ['Carbon Credits', 'Success Story'],
      image: true,
    },
    {
      id: 2,
      author: 'Dr. Meera Sharma',
      role: 'Agricultural Expert',
      time: '5 hours ago',
      content: 'Important tip for this season: With rainfall expected to be below normal, consider drought-resistant crop varieties. Also, mulching can help retain soil moisture by up to 40%. Feel free to ask questions!',
      likes: 56,
      comments: 15,
      tags: ['Expert Advice', 'Crop Management'],
      image: false,
    },
    {
      id: 3,
      author: 'Green Valley FPO',
      role: 'FPO',
      time: '1 day ago',
      content: 'We are organizing a free workshop on "Organic Certification Process" next Saturday at our office. All farmers welcome! Registration link in comments.',
      likes: 42,
      comments: 12,
      tags: ['Workshop', 'Organic Farming', 'Training'],
      image: false,
    },
  ];

  const expertVideos = [
    {
      title: 'No-Till Farming: A Complete Guide',
      expert: 'Dr. Suresh Kumar',
      duration: '15:30',
      views: '12.5K',
      topic: 'Soil Conservation',
    },
    {
      title: 'Maximizing Carbon Credits from Your Farm',
      expert: 'Prof. Anita Desai',
      duration: '22:15',
      views: '8.3K',
      topic: 'Carbon Farming',
    },
    {
      title: 'Integrated Pest Management Techniques',
      expert: 'Dr. Vijay Singh',
      duration: '18:45',
      views: '15.2K',
      topic: 'Pest Control',
    },
  ];

  const courses = [
    {
      title: 'Organic Farming Fundamentals',
      lessons: 12,
      duration: '6 hours',
      enrolled: 245,
      rating: 4.8,
      level: 'Beginner',
    },
    {
      title: 'Carbon Credit Generation & Trading',
      lessons: 8,
      duration: '4 hours',
      enrolled: 189,
      rating: 4.9,
      level: 'Intermediate',
    },
    {
      title: 'Advanced Crop Advisory Using AI',
      lessons: 15,
      duration: '8 hours',
      enrolled: 156,
      rating: 4.7,
      level: 'Advanced',
    },
  ];

  const topContributors = [
    { name: 'Rajesh Patel', posts: 45, likes: 234, badge: 'Carbon Expert' },
    { name: 'Dr. Meera Sharma', posts: 38, likes: 567, badge: 'Agricultural Expert' },
    { name: 'Amit Kumar', posts: 32, likes: 189, badge: 'Organic Pioneer' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-green-900 mb-2">Farmer Community & Training Hub</h1>
        <p className="text-gray-600">
          Connect, learn, and grow with fellow farmers and agricultural experts
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-lg w-fit mb-4">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-green-900 mb-1">10,234</div>
          <div className="text-gray-600">Active Members</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-lg w-fit mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-green-900 mb-1">45</div>
          <div className="text-gray-600">Training Courses</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg w-fit mb-4">
            <Video className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-green-900 mb-1">120+</div>
          <div className="text-gray-600">Expert Videos</div>
        </Card>

        <Card className="p-6 border-green-100">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-3 rounded-lg w-fit mb-4">
            <MessageSquare className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-green-900 mb-1">2,450</div>
          <div className="text-gray-600">Discussions</div>
        </Card>
      </div>

      <Tabs defaultValue="feed" className="mb-8">
        <TabsList>
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="training">Training Courses</TabsTrigger>
          <TabsTrigger value="experts">Expert Videos</TabsTrigger>
          <TabsTrigger value="discussions">Q&A Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card className="p-6 border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Input 
                      placeholder="Share your farming experience or ask a question..."
                      onClick={() => setNewPostOpen(!newPostOpen)}
                      readOnly
                      className="cursor-pointer"
                    />
                    {newPostOpen && (
                      <div className="mt-4 space-y-4">
                        <Textarea 
                          placeholder="What's on your mind?"
                          rows={4}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Add Image
                            </Button>
                            <Button variant="outline" size="sm">
                              Add Tags
                            </Button>
                          </div>
                          <Button>Post</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Posts */}
              {posts.map((post) => (
                <Card key={post.id} className="p-6 border-green-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{post.author}</h3>
                        <Badge variant="secondary">{post.role}</Badge>
                      </div>
                      <div className="text-gray-600">{post.time}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{post.content}</p>

                  {post.image && (
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Post Image</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <MessageSquare className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Contributors */}
              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900">{contributor.name}</div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>{contributor.posts} posts</span>
                          <span>•</span>
                          <span>{contributor.likes} likes</span>
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          {contributor.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Trending Topics */}
              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {['Carbon Credits', 'Organic Farming', 'Crop Advisory', 'Insurance Claims', 'Market Prices'].map((topic, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <span className="text-gray-700">#{topic}</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-gray-900 mb-1">Organic Certification Workshop</div>
                    <div className="text-gray-600">Nov 18, 2024 • 10:00 AM</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-gray-900 mb-1">Carbon Trading Webinar</div>
                    <div className="text-gray-600">Nov 20, 2024 • 2:00 PM</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training" className="mt-6">
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="p-6 border-green-100 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-green-600 opacity-50" />
                </div>
                <Badge variant="secondary" className="mb-3">{course.level}</Badge>
                <h3 className="text-green-900 mb-3">{course.title}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4 text-gray-600">
                  <div>{course.lessons} lessons</div>
                  <div>{course.duration}</div>
                  <div>{course.enrolled} enrolled</div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <Button className="w-full">Enroll Now</Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100 mt-8">
            <h3 className="text-green-900 mb-4">Certification Programs</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-2">Organic Farming Certification</h4>
                  <p className="text-gray-600 mb-3">Become a certified organic farming expert</p>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-2">Carbon Credit Specialist</h4>
                  <p className="text-gray-600 mb-3">Master carbon credit generation and trading</p>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="experts" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden border-green-100 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative">
                  <Video className="h-16 w-16 text-green-600 opacity-50" />
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2">{video.topic}</Badge>
                  <h3 className="text-gray-900 mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-gray-600 mb-4">
                    <span>{video.expert}</span>
                    <span>{video.views} views</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Watch Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 border-green-100 mt-8">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-900 mb-2">Live Expert Sessions</h3>
                <p className="text-gray-600 mb-4">
                  Join live Q&A sessions with agricultural experts every Wednesday at 5 PM. 
                  Ask your farming questions and get real-time expert advice.
                </p>
                <Button>Join Next Session</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border-green-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-green-900">Recent Questions</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ask Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      question: 'How to improve soil pH for organic wheat cultivation?',
                      author: 'Suresh Kumar',
                      answers: 5,
                      views: 234,
                      tags: ['Soil Health', 'Organic'],
                    },
                    {
                      question: 'What documents needed for carbon credit verification?',
                      author: 'Priya Sharma',
                      answers: 8,
                      views: 456,
                      tags: ['Carbon Credits', 'Verification'],
                    },
                    {
                      question: 'Best practices for no-till farming in monsoon season?',
                      author: 'Amit Patel',
                      answers: 12,
                      views: 678,
                      tags: ['No-Till', 'Monsoon'],
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                      <h3 className="text-gray-900 mb-2">{item.question}</h3>
                      <div className="flex items-center gap-4 mb-3 text-gray-600">
                        <span>by {item.author}</span>
                        <span>{item.answers} answers</span>
                        <span>{item.views} views</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-green-100">
                <h3 className="text-green-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Crop Management', 'Soil Health', 'Pest Control', 'Carbon Credits', 'Marketing'].map((category, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <span className="text-gray-700">{category}</span>
                      <Badge variant="secondary">{12 + index * 3}</Badge>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
