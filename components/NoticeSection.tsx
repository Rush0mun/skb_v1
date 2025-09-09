"use client"
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NoticeCard from './notices/NoticeCard';
import NoticeDetailModal from './notices/NoticeDetailModal';
import { Notice } from '@/types/notice';
import { useState } from 'react';

// Sample notices data - this will be replaced with API calls in the future
const sampleNotices: Notice[] = [
  {
    id: '1',
    title: 'National Shotokan Championship 2024',
    content: 'We are excited to announce the upcoming National Shotokan Championship 2024. This prestigious tournament will bring together the finest karate practitioners from across Bangladesh. Registration is now open for all belt levels. The event will feature individual kata and kumite competitions, team events, and special demonstrations by master instructors.',
    category: 'tournament',
    date: '2024-03-15',
    createdAt: new Date('2024-01-15'),
    location: 'National Sports Complex, Dhaka',
    organizer: 'Bangladesh Karate Federation',
    registrationDeadline: '2024-02-28T23:59:59'
  },
  {
    id: '2',
    title: 'New Training Schedule Effective February 2024',
    content: 'Please note that starting February 1st, 2024, we will be implementing a new training schedule to better accommodate our growing membership. Evening classes will now start 30 minutes earlier, and we are adding weekend morning sessions for beginners. All members are requested to check the updated timetable posted on our notice board.',
    category: 'notice',
    date: '2024-01-28',
    createdAt: new Date('2024-01-28')
  },
  {
    id: '3',
    title: 'Belt Grading Examination - March 2024',
    content: 'The quarterly belt grading examination is scheduled for March 10th, 2024. Students who have completed the required training hours and wish to advance to the next belt level should submit their applications by February 25th. The examination will cover kata performance, basic techniques, and sparring skills appropriate to each belt level.',
    category: 'event',
    date: '2024-03-10',
    createdAt: new Date('2024-01-20'),
    location: 'SKB Main Dojo, Gulshan',
    organizer: 'SKB Grading Committee'
  },
  {
    id: '4',
    title: 'Dojo Maintenance and Cleaning Day',
    content: 'We will be conducting our monthly dojo maintenance and deep cleaning on January 30th, 2024. All classes scheduled for that day will be cancelled. We encourage all members to volunteer and help maintain our training facility. Light refreshments will be provided for all volunteers.',
    category: 'notice',
    date: '2024-01-30',
    createdAt: new Date('2024-01-18')
  },
  {
    id: '5',
    title: 'Guest Instructor Workshop - Advanced Kata Techniques',
    content: 'We are honored to host Sensei Takeshi Yamamoto, 7th Dan, for a special workshop on advanced kata techniques. This exclusive session will focus on the finer points of kata performance, breathing techniques, and the spiritual aspects of karate practice. Limited seats available - registration required.',
    category: 'event',
    date: '2024-02-20',
    createdAt: new Date('2024-01-12'),
    location: 'SKB Main Dojo, Gulshan',
    organizer: 'Shotokan Karate Bangladesh'
  },
  {
    id: '6',
    title: 'Updated Safety Protocols',
    content: 'In line with our commitment to student safety, we have updated our dojo safety protocols. All students must now wear appropriate protective gear during sparring sessions. New safety equipment is available for purchase at the dojo reception. Please familiarize yourself with the updated guidelines.',
    type: 'announcement',
    date: '2024-01-10',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '7',
    title: 'Inter-Dojo Friendship Tournament',
    content: 'Join us for our annual Inter-Dojo Friendship Tournament where we welcome students from partner dojos across the region. This friendly competition emphasizes sportsmanship, technique, and cultural exchange. Spectators are welcome, and there will be food stalls and cultural performances.',
    type: 'event',
    date: '2024-04-05',
    createdAt: new Date('2024-01-08')
  }
];

export default function NoticeSection() {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort notices by creation date (newest first) and take only the 5 most recent
  const recentNotices = sampleNotices
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-16 bg-gray-50" aria-labelledby="notices-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 id="notices-heading" className="text-3xl font-bold text-gray-900">
                Latest Notices
              </h2>
              <p className="text-gray-600 mt-1">
                Stay updated with our latest announcements and upcoming events
              </p>
            </div>
          </div>
          
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link href="/notices" className="flex items-center gap-2">
              See All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Loading State Placeholder */}
        {recentNotices.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Notices Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentNotices.map((notice) => (
              <NoticeCard 
                key={notice.id} 
                notice={notice} 
                onClick={() => handleNoticeClick(notice)}
              />
            ))}
          </div>
        )}

        {/* Mobile See All Button */}
        <div className="flex justify-center sm:hidden">
          <Button asChild className="w-full max-w-xs">
            <Link href="/notices" className="flex items-center justify-center gap-2">
              See All Notices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      </section>

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNotice(null);
        }}
      />
    </>
  );
}