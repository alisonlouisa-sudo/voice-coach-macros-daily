import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Search, Download, Users, Award, Building } from 'lucide-react';

// Sample coach data
const coaches = [
  {
    id: 'coach-001',
    name: 'Dr. Michael Chen',
    bio: 'Executive coach with 15+ years experience in tech leadership development. Former VP of Engineering at Fortune 500 companies.',
    expertise: ['Leadership Development', 'Technical Leadership', 'Executive Presence', 'Team Building'],
    priorExperience: ['Google', 'Microsoft', 'Startup CTO'],
    email: 'michael.chen@coachingpartners.com',
    activeEngagements: 3,
    totalEngagements: 12
  },
  {
    id: 'coach-002',
    name: 'Jennifer Walsh',
    bio: 'Sales leadership specialist with proven track record in scaling high-performing sales organizations from startup to IPO.',
    expertise: ['Sales Leadership', 'Revenue Operations', 'Go-to-Market Strategy', 'Performance Management'],
    priorExperience: ['Salesforce', 'HubSpot', 'Series A-C Startups'],
    email: 'jennifer.walsh@coachingpartners.com',
    activeEngagements: 2,
    totalEngagements: 8
  },
  {
    id: 'coach-003',
    name: 'Robert Kim',
    bio: 'Marketing executive turned coach, specializing in brand building, digital transformation, and cross-functional collaboration.',
    expertise: ['Brand Strategy', 'Digital Marketing', 'Product Marketing', 'Strategic Planning'],
    priorExperience: ['Apple', 'Nike', 'Airbnb'],
    email: 'robert.kim@coachingpartners.com',
    activeEngagements: 1,
    totalEngagements: 6
  },
  {
    id: 'coach-004',
    name: 'Dr. Lisa Park',
    bio: 'Product strategy expert with deep experience in user research, product development, and agile methodologies.',
    expertise: ['Product Strategy', 'User Experience', 'Agile Leadership', 'Innovation Management'],
    priorExperience: ['Meta', 'Uber', 'Design Thinking Consultant'],
    email: 'lisa.park@coachingpartners.com',
    activeEngagements: 2,
    totalEngagements: 9
  },
  {
    id: 'coach-005',
    name: 'Marcus Thompson',
    bio: 'Operations and finance leader with expertise in scaling organizations, process optimization, and strategic finance.',
    expertise: ['Operations Excellence', 'Financial Strategy', 'Process Optimization', 'Change Management'],
    priorExperience: ['McKinsey & Company', 'Goldman Sachs', 'COO at Tech Unicorn'],
    email: 'marcus.thompson@coachingpartners.com',
    activeEngagements: 1,
    totalEngagements: 7
  }
];

const CoachDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('');

  // Get all unique expertise areas
  const allExpertise = [...new Set(coaches.flatMap(coach => coach.expertise))];

  // Filter coaches
  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = !expertiseFilter || coach.expertise.includes(expertiseFilter);
    
    return matchesSearch && matchesExpertise;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const exportCoachEmails = () => {
    const emails = coaches.map(coach => coach.email).join(', ');
    navigator.clipboard.writeText(emails);
    // In a real app, you'd show a toast notification here
    alert('Coach emails copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Coach Directory</h1>
          <p className="text-muted-foreground">Our network of executive coaches</p>
        </div>
        <Button onClick={exportCoachEmails}>
          <Mail className="w-4 h-4 mr-2" />
          Export Email List
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coaches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{coaches.length}</div>
            <p className="text-xs text-muted-foreground">Active network</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Engagements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-in-progress">
              {coaches.reduce((sum, coach) => sum + coach.activeEngagements, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Currently coaching</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expertise Areas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{allExpertise.length}</div>
            <p className="text-xs text-muted-foreground">Specialization areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <Input
                placeholder="Search by name, expertise, or experience..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!expertiseFilter ? "default" : "outline"}
                size="sm"
                onClick={() => setExpertiseFilter('')}
              >
                All
              </Button>
              {allExpertise.slice(0, 6).map((expertise) => (
                <Button
                  key={expertise}
                  variant={expertiseFilter === expertise ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExpertiseFilter(expertise === expertiseFilter ? '' : expertise)}
                >
                  {expertise}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coach Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCoaches.map((coach) => (
          <Card key={coach.id} className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(coach.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{coach.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {coach.activeEngagements} active
                    </div>
                    <div>
                      {coach.totalEngagements} total engagements
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {coach.bio}
              </p>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {coach.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Prior Experience</h4>
                <div className="flex flex-wrap gap-1">
                  {coach.priorExperience.map((exp) => (
                    <Badge key={exp} variant="outline" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <a
                  href={`mailto:${coach.email}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm"
                >
                  <Mail className="h-3 w-3" />
                  Contact Coach
                </a>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCoaches.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No coaches found matching your search criteria.</p>
            <Button variant="ghost" onClick={() => { setSearchTerm(''); setExpertiseFilter(''); }} className="mt-2">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoachDirectory;