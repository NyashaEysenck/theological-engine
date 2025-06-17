import { motion } from 'framer-motion';
import { Book, Search, Shield, ScrollText, ChevronRight, Users, Compass, BookOpen, Target, Lightbulb, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import LandingNav from '../components/landing/LandingNav';

const LandingPage = () => {
  return (
    <div className="bg-secondary-200 min-h-screen">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-paper-texture opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
              <Book className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Micaiah's Stand
            </h1>
            <p className="text-xl text-primary-100 mb-4 leading-relaxed">
              AI-Powered Biblical Study Through Intelligent Visualization
            </p>
            <p className="text-lg text-primary-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              Ancient wisdom meets intelligent discovery. Unlock scriptural depth using cutting-edge technology for theological exploration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="group bg-white text-primary-800 hover:bg-secondary-50 shadow-soft"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
                >
                  Live Demo Available
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution Grid */}
      <section className="py-24 bg-secondary-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-primary-700 text-white rounded-2xl overflow-hidden shadow-strong"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-accent-400 mr-3" />
                  <h2 className="text-2xl font-heading font-bold">THE CHALLENGE</h2>
                </div>
                <div className="space-y-4 text-primary-100">
                  <p className="text-lg leading-relaxed">
                    Traditional tools miss deep thematic and contextual links across scripture
                  </p>
                  <p className="leading-relaxed">
                    Students and scholars need an intelligent way to explore semantic relationships and interconnected theology across the Bible
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tech Innovation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-card border border-secondary-300"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Lightbulb className="h-8 w-8 text-accent-500 mr-3" />
                  <h2 className="text-2xl font-heading font-bold text-primary-800">TECH INNOVATION</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800">Google AI Semantic Power</h3>
                      <p className="text-neutral-600 text-sm">Gemini 2.0 Flash for theological explanations</p>
                      <p className="text-neutral-600 text-sm">Text Embedding 004 for deep vector search</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800">RAG Architecture</h3>
                      <p className="text-neutral-600 text-sm">Ensures scripturally grounded responses</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* The Solution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary-700 text-white rounded-2xl overflow-hidden shadow-strong"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-accent-400 mr-3" />
                  <h2 className="text-2xl font-heading font-bold">THE SOLUTION</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-primary-100 leading-relaxed">
                    Scripture-Threads unlocks scriptural depth using
                  </p>
                  <div className="space-y-3 text-primary-100">
                    <div className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-accent-400 mr-2 flex-shrink-0" />
                      <span><strong>Google-AI Flash</strong> for theological explanations</span>
                    </div>
                    <div className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-accent-400 mr-2 flex-shrink-0" />
                      <span><strong>Text Embedding 004</strong> for deep vector search</span>
                    </div>
                    <div className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-accent-400 mr-2 flex-shrink-0" />
                      <span><strong>MongoDB</strong> for scalable, flexible vector-based thematic retrieval</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results & Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-card border border-secondary-300"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-8 w-8 text-accent-500 mr-3" />
                  <h2 className="text-2xl font-heading font-bold text-primary-800">RESULTS & IMPACT</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-accent-500 mr-2" />
                      <h3 className="font-semibold text-primary-800">Achievements</h3>
                    </div>
                    <div className="space-y-1 text-sm text-neutral-600 ml-7">
                      <p>1,254 semantically indexed passages</p>
                      <p>20+ AI-linked theological themes</p>
                      <p>Sub-second response times</p>
                      <p>10x faster than keyword-based</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-5 w-5 text-accent-500 mr-2" />
                      <h3 className="font-semibold text-primary-800">Transformative Learning</h3>
                    </div>
                    <div className="space-y-1 text-sm text-neutral-600 ml-7">
                      <p>Rapid concept discovery</p>
                      <p>Thematic clarity for scholars & pastors</p>
                      <p>Visual theology across all devices</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Architecture */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading font-bold text-primary-800 mb-4">
              Tech Architecture
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Built with cutting-edge AI and modern web technologies for seamless biblical exploration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-primary-700 text-white rounded-2xl p-8 shadow-strong"
            >
              <div className="flex items-center mb-6">
                <Compass className="h-8 w-8 text-accent-400 mr-3" />
                <h3 className="text-2xl font-heading font-bold">TECH ARCHITECTURE</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary-100">Data Pipeline</h4>
                  <div className="space-y-2 text-primary-200">
                    <p><strong>Tetree Panel Interface</strong></p>
                    <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                      <li>Theme Explorer—</li>
                      <li>AI-categorized theological topics</li>
                      <li>Interactive Timeline.</li>
                      <li>Instant AI explanations + cross-references</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary-100">Key Features</h4>
                  <div className="space-y-2 text-sm text-primary-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mr-3"></div>
                      <span>Semantic search by meaning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mr-3"></div>
                      <span>Visual arcs across books & testaments</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mr-3"></div>
                      <span>Interface adapts to user exploration</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mr-3"></div>
                      <span>Cross-device responsive design</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-card border border-secondary-300"
            >
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-accent-500 mr-3" />
                <h3 className="text-2xl font-heading font-bold text-primary-800">TECH STACK</h3>
              </div>
              
              <div className="space-y-4 text-neutral-700">
                <div>
                  <span className="font-semibold">Backend:</span> FastAPI + Python
                </div>
                <div>
                  <span className="font-semibold">Frontend:</span> React (Vite) + Tailwind CSS
                </div>
                <div>
                  <span className="font-semibold">Database:</span> MongoDB Atlas
                </div>
                <div>
                  <span className="font-semibold">AI Services:</span> Gemini 2.0 Flash<br />
                  <span className="ml-16">Text Embedding 004</span>
                </div>
                <div>
                  <span className="font-semibold">Deployment:</span> Google Cloud
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Demo CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-8">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-heading font-bold mb-6">
              LIVE DEMO AVAILABLE
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore 2,000+ years of scripture with AI-powered visual storytelling
            </p>
            <p className="text-lg text-primary-200 mb-12 italic">
              Ancient wisdom meets intelligent discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="group bg-white text-primary-800 hover:bg-secondary-50 shadow-soft"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
                >
                  Try Live Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">Scripture Threads</h3>
                  <p className="text-primary-200 text-sm">Micaiah's Stand</p>
                </div>
              </div>
              <p className="text-primary-200 mb-6 max-w-md leading-relaxed">
                An AI-powered biblical study platform that unlocks scriptural depth through intelligent visualization and semantic exploration.
              </p>
              <p className="text-primary-300 text-sm italic">
                Ancient wisdom meets intelligent discovery.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">Features</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/myths" className="text-primary-200 hover:text-white transition-colors text-sm">
                    Myth Deconstruction
                  </Link>
                </li>
                <li>
                  <Link to="/doctrines" className="text-primary-200 hover:text-white transition-colors text-sm">
                    Core Doctrines
                  </Link>
                </li>
                <li>
                  <Link to="/query" className="text-primary-200 hover:text-white transition-colors text-sm">
                    AI Query Engine
                  </Link>
                </li>
                <li>
                  <Link to="/bible-reading" className="text-primary-200 hover:text-white transition-colors text-sm">
                    Scripture Threads
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">Get Started</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/register" className="text-primary-200 hover:text-white transition-colors text-sm">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-primary-200 hover:text-white transition-colors text-sm">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/bible-reading" className="text-primary-200 hover:text-white transition-colors text-sm">
                    Live Demo
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-300 mb-4 md:mb-0">
              © {new Date().getFullYear()} Scripture Threads. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-primary-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-primary-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-primary-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;