import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus, FileText, Calendar, Users, MessageSquare, ExternalLink } from 'lucide-react';

// Sample forum notes data
const forumNotes = [
  {
    id: 'forum-q1-2025',
    quarter: 'Q1 2025',
    date: '2025-01-25',
    attendees: ['Dr. Michael Chen', 'Jennifer Walsh', 'Robert Kim', 'Dr. Lisa Park', 'Marcus Thompson'],
    notes: `**Q1 2025 Executive Coach Forum - January 25, 2025**

**Key Discussion Points:**

1. **Emerging Leadership Challenges**
   - Increased focus on remote team management
   - Growing need for cross-functional collaboration skills
   - Technical leaders struggling with delegation

2. **Common Coaching Themes**
   - Work-life balance and burnout prevention
   - Communication skills for technical professionals
   - Strategic thinking development

3. **Best Practices Shared**
   - Use of 360-degree feedback tools
   - Structured goal-setting frameworks
   - Regular check-in cadences with coachees

**Action Items:**
- Develop shared resource library for delegation skills
- Create group coaching session template for communication skills
- Establish quarterly theme tracking process`,
    themes: ['remote leadership', 'delegation', 'communication', 'burnout prevention', 'strategic thinking']
  },
  {
    id: 'forum-q4-2024',
    quarter: 'Q4 2024',
    date: '2024-10-22',
    attendees: ['Dr. Michael Chen', 'Jennifer Walsh', 'Robert Kim', 'Dr. Lisa Park'],
    notes: `**Q4 2024 Executive Coach Forum - October 22, 2024**

**Focus Areas:**

1. **Year-End Performance Reviews**
   - Supporting leaders through difficult conversations
   - Goal setting for 2025
   - Career development planning

2. **Scaling Challenges**
   - Leaders managing larger teams
   - Process documentation and standardization
   - Maintaining culture during rapid growth

3. **Coach Development**
   - Continuing education opportunities
   - Peer coaching sessions
   - Knowledge sharing protocols

**Outcomes:**
- Standardized performance review coaching approach
- Monthly coach peer learning sessions established
- Resource sharing Slack channel created`,
    themes: ['performance reviews', 'scaling', 'culture', 'goal setting', 'career development']
  },
  {
    id: 'forum-q3-2024',
    quarter: 'Q3 2024',
    date: '2024-07-18',
    attendees: ['Dr. Michael Chen', 'Jennifer Walsh', 'Robert Kim'],
    notes: `**Q3 2024 Executive Coach Forum - July 18, 2024**

**Summer Coaching Focus:**

1. **Mid-Year Recalibration**
   - Adjusting goals based on H1 performance
   - Addressing summer productivity challenges
   - Preparing for fall strategic planning

2. **Leadership Development Trends**
   - Increased interest in emotional intelligence
   - Data-driven decision making skills
   - Stakeholder management

**Key Insights:**
- Leaders need more support with data interpretation
- Summer months see decreased engagement - need creative approaches
- Strong correlation between EQ development and team performance`,
    themes: ['goal adjustment', 'emotional intelligence', 'data-driven decisions', 'stakeholder management']
  }
];

const CoachForum = () => {
  const [notes, setNotes] = useState(forumNotes);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<typeof forumNotes[0] | null>(null);
  
  // Form state for new forum
  const [newForum, setNewForum] = useState({
    quarter: '',
    date: '',
    attendees: '',
    notes: '',
    themes: ''
  });

  const handleAddForum = () => {
    if (!newForum.quarter || !newForum.date || !newForum.notes) return;

    const forum = {
      id: `forum-${newForum.quarter.toLowerCase().replace(' ', '-')}`,
      quarter: newForum.quarter,
      date: newForum.date,
      attendees: newForum.attendees.split(',').map(a => a.trim()).filter(a => a),
      notes: newForum.notes,
      themes: newForum.themes.split(',').map(t => t.trim()).filter(t => t)
    };

    setNotes([forum, ...notes]);
    setNewForum({ quarter: '', date: '', attendees: '', notes: '', themes: '' });
    setIsAddDialogOpen(false);
  };

  const getQuarterColor = (quarter: string) => {
    if (quarter.includes('2025')) return 'bg-primary text-primary-foreground';
    if (quarter.includes('2024')) return 'bg-secondary text-secondary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Coach Forum Notes</h1>
          <p className="text-muted-foreground">Quarterly executive coach forum documentation</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Forum Notes
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Forum Notes</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quarter">Quarter</Label>
                  <Input
                    id="quarter"
                    placeholder="Q2 2025"
                    value={newForum.quarter}
                    onChange={(e) => setNewForum({ ...newForum, quarter: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newForum.date}
                    onChange={(e) => setNewForum({ ...newForum, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="attendees">Attendees</Label>
                <Input
                  id="attendees"
                  placeholder="Dr. Michael Chen, Jennifer Walsh (comma-separated)"
                  value={newForum.attendees}
                  onChange={(e) => setNewForum({ ...newForum, attendees: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="themes">Key Themes</Label>
                <Input
                  id="themes"
                  placeholder="leadership development, communication, scaling (comma-separated)"
                  value={newForum.themes}
                  onChange={(e) => setNewForum({ ...newForum, themes: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Forum Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter detailed forum notes using markdown formatting..."
                  value={newForum.notes}
                  onChange={(e) => setNewForum({ ...newForum, notes: e.target.value })}
                  rows={8}
                />
              </div>
              <Button onClick={handleAddForum} className="w-full">
                Add Forum Notes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Forum Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forums</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{notes.length}</div>
            <p className="text-xs text-muted-foreground">Forums documented</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {[...new Set(notes.flatMap(n => n.attendees))].length}
            </div>
            <p className="text-xs text-muted-foreground">Active coaches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Common Themes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {[...new Set(notes.flatMap(n => n.themes))].length}
            </div>
            <p className="text-xs text-muted-foreground">Discussion topics</p>
          </CardContent>
        </Card>
      </div>

      {/* Forum Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notes.map((forum) => (
          <Card key={forum.id} className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={getQuarterColor(forum.quarter)}>
                    {forum.quarter}
                  </Badge>
                  <div>
                    <CardTitle className="text-lg">{forum.quarter} Forum</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(forum.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForum(forum)}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Attendees ({forum.attendees.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {forum.attendees.slice(0, 3).map((attendee) => (
                    <Badge key={attendee} variant="outline" className="text-xs">
                      {attendee}
                    </Badge>
                  ))}
                  {forum.attendees.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{forum.attendees.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Key Themes</h4>
                <div className="flex flex-wrap gap-1">
                  {forum.themes.map((theme) => (
                    <Badge key={theme} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Notes Preview</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {forum.notes.split('\n')[0].replace(/\*\*/g, '')}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForum(forum)}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  View Full Notes
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/themes-insights">
                    Link to Themes
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Notes Modal */}
      <Dialog open={!!selectedForum} onOpenChange={() => setSelectedForum(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedForum?.quarter} Coach Forum Notes
            </DialogTitle>
          </DialogHeader>
          {selectedForum && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(selectedForum.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {selectedForum.attendees.length} attendees
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none">
                {selectedForum.notes.split('\n').map((line, index) => (
                  <div key={index} className="mb-2">
                    {line.startsWith('**') && line.endsWith('**') ? (
                      <h3 className="font-bold text-lg mb-1">
                        {line.replace(/\*\*/g, '')}
                      </h3>
                    ) : line.startsWith('**') ? (
                      <h4 className="font-semibold text-base mb-1">
                        {line.replace(/\*\*/g, '')}
                      </h4>
                    ) : line.startsWith('- ') ? (
                      <li className="ml-4">{line.substring(2)}</li>
                    ) : line.trim() ? (
                      <p>{line}</p>
                    ) : (
                      <br />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoachForum;