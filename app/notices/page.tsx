"use client";

import { useState } from 'react';
import { Bell, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NoticeCard from '@/components/notices/NoticeCard';
import TournamentCard from '@/components/notices/TournamentCard';
import NoticeDetailModal from '@/components/notices/NoticeDetailModal';
import TournamentRegistrationForm from '@/components/notices/TournamentRegistrationForm';
import { Notice } from '@/types/notice';

// Extended sample data with all categories
const allNotices: Notice[] = [
  {
    id: '1',
    title: 'National Shotokan Championship 2024',
    content: 'We are excited to announce the upcoming National Shotokan Championship 2024. This prestigious tournament will bring together the finest karate practitioners from across Bangladesh. The championship will feature individual kata and kumite competitions, team events, and special demonstrations by master instructors. Participants will compete in various age groups and skill levels, ensuring fair competition for everyone.',
    category: 'tournament',
    date: '2024-03-15T09:00:00',
    createdAt: new Date('2024-01-15'),
    location: 'National Sports Complex, Dhaka',
    organizer: 'Bangladesh Karate Federation',
    contactInfo: 'championship@shotokanbd.com | +880-1712-345678',
    rules: 'Tournament will follow WKF rules and regulations. All participants must be registered members of SKB. Protective gear is mandatory for kumite events. Age categories: Under 12, Under 16, Under 21, and Senior divisions.',
    prizeStructure: '1st Place: Gold Medal + 50,000 BDT\n2nd Place: Silver Medal + 30,000 BDT\n3rd Place: Bronze Medal + 20,000 BDT\nParticipation certificates for all contestants',
    registrationDeadline: '2024-02-28T23:59:59',
    maxParticipants: 200,
    currentParticipants: 87
  },
  {
    id: '2',
    title: 'Inter-Dojo Friendship Tournament',
    content: 'Join us for our annual Inter-Dojo Friendship Tournament where we welcome students from partner dojos across the region. This friendly competition emphasizes sportsmanship, technique, and cultural exchange. The event promotes unity within the karate community and provides valuable competitive experience for students of all levels.',
    category: 'tournament',
    date: '2024-04-05T10:00:00',
    createdAt: new Date('2024-01-08'),
    location: 'SKB Main Dojo, Gulshan',
    organizer: 'Shotokan Karate Bangladesh',
    contactInfo: 'events@shotokanbd.com | +880-1798-765432',
    rules: 'Friendly tournament format with emphasis on technique and sportsmanship. All belt levels welcome. Kata and light-contact kumite divisions available.',
    prizeStructure: 'Trophies for 1st, 2nd, and 3rd place in each category\nParticipation medals for all contestants\nSpecial recognition for best technique and sportsmanship',
    registrationDeadline: '2024-03-25T18:00:00',
    maxParticipants: 150,
    currentParticipants: 45
  },
  {
    id: '3',
    title: 'Guest Instructor Workshop - Advanced Kata Techniques',
    content: 'We are honored to host Sensei Takeshi Yamamoto, 7th Dan, for a special workshop on advanced kata techniques. This exclusive session will focus on the finer points of kata performance, breathing techniques, and the spiritual aspects of karate practice. Sensei Yamamoto brings over 30 years of experience and will share insights from traditional Japanese karate training methods.',
    category: 'event',
    date: '2024-02-20T15:00:00',
    createdAt: new Date('2024-01-12'),
    location: 'SKB Main Dojo, Gulshan',
    organizer: 'Shotokan Karate Bangladesh',
    contactInfo: 'workshop@shotokanbd.com | +880-1712-345678'
  },
  {
    id: '4',
    title: 'Belt Grading Examination - March 2024',
    content: 'The quarterly belt grading examination is scheduled for March 10th, 2024. Students who have completed the required training hours and wish to advance to the next belt level should submit their applications by February 25th. The examination will cover kata performance, basic techniques, and sparring skills appropriate to each belt level. Senior instructors will evaluate candidates based on technical proficiency, understanding of karate principles, and demonstration of proper etiquette.',
    category: 'event',
    date: '2024-03-10T14:00:00',
    createdAt: new Date('2024-01-20'),
    location: 'SKB Main Dojo, Gulshan',
    organizer: 'SKB Grading Committee',
    contactInfo: 'grading@shotokanbd.com | +880-1798-765432'
  },
  {
    id: '5',
    title: 'New Training Schedule Effective February 2024',
    content: 'Please note that starting February 1st, 2024, we will be implementing a new training schedule to better accommodate our growing membership. Evening classes will now start 30 minutes earlier, and we are adding weekend morning sessions for beginners. All members are requested to check the updated timetable posted on our notice board. The new schedule includes specialized classes for different age groups and skill levels, ensuring optimal learning environments for all students.',
    category: 'notice',
    date: '2024-01-28T00:00:00',
    createdAt: new Date('2024-01-28')
  },
  {
    id: '6',
    title: 'Updated Safety Protocols',
    content: 'In line with our commitment to student safety, we have updated our dojo safety protocols. All students must now wear appropriate protective gear during sparring sessions. New safety equipment is available for purchase at the dojo reception. Please familiarize yourself with the updated guidelines. These protocols ensure the wellbeing of all practitioners while maintaining the authentic spirit of karate training.',
    category: 'notice',
    date: '2024-01-10T00:00:00',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '7',
    title: 'Dojo Maintenance and Cleaning Day',
    content: 'We will be conducting our monthly dojo maintenance and deep cleaning on January 30th, 2024. All classes scheduled for that day will be cancelled. We encourage all members to volunteer and help maintain our training facility. Light refreshments will be provided for all volunteers. This community effort helps us maintain the high standards of cleanliness and safety that our dojo is known for.',
    category: 'notice',
    date: '2024-01-30T00:00:00',
    createdAt: new Date('2024-01-18')
  }
];

export default function NoticesPage() {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Notice | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Sort notices by creation date (newest first)
  const sortedNotices = allNotices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Filter notices based on active tab
  const filteredNotices = activeTab === 'all' 
    ? sortedNotices 
    : sortedNotices.filter(notice => notice.category === activeTab);

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsDetailModalOpen(true);
  };

  const handleTournamentRegister = (tournament: Notice) => {
    setSelectedTournament(tournament);
    setIsRegistrationModalOpen(true);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'all') return sortedNotices.length;
    return sortedNotices.filter(notice => notice.category === category).length;
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Bell className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Notices & Events</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with announcements, events, and tournaments
          </p>
        </div>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            All ({getCategoryCount('all')})
          </TabsTrigger>
          <TabsTrigger value="notice" className="flex items-center gap-2">
            Notices ({getCategoryCount('notice')})
          </TabsTrigger>
          <TabsTrigger value="event" className="flex items-center gap-2">
            Events ({getCategoryCount('event')})
          </TabsTrigger>
          <TabsTrigger value="tournament" className="flex items-center gap-2">
            Tournaments ({getCategoryCount('tournament')})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No {activeTab === 'all' ? 'notices' : activeTab + 's'} available
              </h3>
              <p className="text-gray-500">Check back later for updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotices.map((notice) => (
                notice.category === 'tournament' ? (
                  <TournamentCard
                    key={notice.id}
                    notice={notice}
                    onViewDetails={() => handleNoticeClick(notice)}
                    onRegister={() => handleTournamentRegister(notice)}
                  />
                ) : (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    onClick={() => handleNoticeClick(notice)}
                  />
                )
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedNotice(null);
        }}
      />

      <TournamentRegistrationForm
        tournament={selectedTournament}
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          setIsRegistrationModalOpen(false);
          setSelectedTournament(null);
        }}
      />
    </div>
  );
}