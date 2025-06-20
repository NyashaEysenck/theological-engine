import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Star, Calendar, TrendingUp, Plus } from 'lucide-react';
import Button from '../common/Button';

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  tags: string[];
}

interface StudyGroup {
  id: string;
  name: string;
  members: number;
  currentBook: string;
  nextMeeting: string;
  isJoined: boolean;
}

interface CommunityPanelProps {
  currentBook?: string;
  currentChapter?: number;
}

const CommunityPanel = ({ currentBook, currentChapter }: CommunityPanelProps) => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'groups' | 'insights'>('discussions');

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Understanding Genesis 1:1 - "In the beginning"',
      author: 'BiblicalScholar',
      replies: 23,
      lastActivity: '2 hours ago',
      tags: ['Genesis', 'Creation', 'Hebrew']
    },
    {
      id: '2',
      title: 'The significance of the Trinity in Genesis 1:26',
      author: 'TheologyStudent',
      replies: 15,
      lastActivity: '5 hours ago',
      tags: ['Trinity', 'Genesis', 'Doctrine']
    },
    {
      id: '3',
      title: 'Archaeological evidence for early Genesis',
      author: 'ArchaeologyFan',
      replies: 8,
      lastActivity: '1 day ago',
      tags: ['Archaeology', 'History', 'Evidence']
    }
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Genesis Deep Dive',
      members: 24,
      currentBook: 'Genesis',
      nextMeeting: 'Tomorrow 7:00 PM',
      isJoined: false
    },
    {
      id: '2',
      name: 'Systematic Theology Study',
      members: 18,
      currentBook: 'Romans',
      nextMeeting: 'Friday 6:30 PM',
      isJoined: true
    },
    {
      id: '3',
      name: 'Hebrew Language Learning',
      members: 12,
      currentBook: 'Psalms',
      nextMeeting: 'Sunday 2:00 PM',
      isJoined: false
    }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-card border border-neutral-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-heading font-semibold text-primary-900 flex items-center uppercase tracking-wider">
          <Users className="h-5 w-5 text-primary-900 mr-3" />
          Community
        </h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-neutral-50 p-1 rounded-xl">
        {[
          { id: 'discussions', label: 'Discussions', icon: MessageCircle },
          { id: 'groups', label: 'Study Groups', icon: Users },
          { id: 'insights', label: 'Insights', icon: TrendingUp }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-primary-900 shadow-card'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="p-6 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-primary-900 mb-3">{discussion.title}</h3>
                <div className="flex items-center justify-between text-sm text-neutral-600 mb-3">
                  <div className="flex items-center space-x-4">
                    <span>by {discussion.author}</span>
                    <span>{discussion.replies} replies</span>
                  </div>
                  <span>{discussion.lastActivity}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-50 text-primary-900 text-xs rounded-full border border-primary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {studyGroups.map((group) => (
              <div
                key={group.id}
                className="p-6 border border-neutral-200 rounded-xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-primary-900">{group.name}</h3>
                  <Button
                    variant={group.isJoined ? "outline" : "primary"}
                    size="sm"
                  >
                    {group.isJoined ? 'Joined' : 'Join'}
                  </Button>
                </div>
                <div className="text-sm text-neutral-600 space-y-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {group.members} members
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Currently reading: {group.currentBook}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next meeting: {group.nextMeeting}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 border border-neutral-200 rounded-xl">
              <h3 className="font-medium text-primary-900 mb-3 uppercase tracking-wider text-sm">Popular This Week</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div>• "The Hebrew word 'bara' in Genesis 1:1" - 156 views</div>
                <div>• "Archaeological findings in Mesopotamia" - 142 views</div>
                <div>• "Understanding ancient Near Eastern creation myths" - 128 views</div>
              </div>
            </div>
            
            <div className="p-6 border border-neutral-200 rounded-xl">
              <h3 className="font-medium text-primary-900 mb-3 uppercase tracking-wider text-sm">Community Insights</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div>• 89% of readers find Genesis 1-3 foundational to their faith</div>
                <div>• Most discussed topic: Creation vs. Evolution</div>
                <div>• Average reading time: 12 minutes per chapter</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityPanel;