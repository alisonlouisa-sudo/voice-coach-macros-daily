import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Brain, TrendingUp, FileText, Sparkles, Calendar, Tag } from 'lucide-react';

// Sample themes data
const themes = [
  {
    id: 'theme-001',
    date: '2025-01-20',
    function: 'Engineering',
    keywords: ['work-life balance', 'technical debt', 'team scaling'],
    notes: 'Multiple engineering leaders discussing challenges with managing technical debt while scaling teams rapidly.'
  },
  {
    id: 'theme-002',
    date: '2025-01-18',
    function: 'Sales',
    keywords: ['pipeline management', 'forecasting accuracy', 'remote selling'],
    notes: 'Sales directors focusing on improving forecast accuracy and adapting to remote selling environments.'
  },
  {
    id: 'theme-003',
    date: '2025-01-15',
    function: 'Product',
    keywords: ['user research', 'product-market fit', 'roadmap prioritization'],
    notes: 'Product leaders seeking guidance on balancing user feedback with strategic roadmap decisions.'
  },
  {
    id: 'theme-004',
    date: '2025-01-12',
    function: 'Marketing',
    keywords: ['brand positioning', 'content strategy', 'attribution modeling'],
    notes: 'Marketing executives working on unified brand messaging and improving marketing attribution.'
  },
  {
    id: 'theme-005',
    date: '2025-01-10',
    function: 'Engineering',
    keywords: ['communication skills', 'cross-functional collaboration', 'technical leadership'],
    notes: 'Senior engineers transitioning to leadership roles, focusing on non-technical skills development.'
  },
  {
    id: 'theme-006',
    date: '2025-01-08',
    function: 'Sales',
    keywords: ['team motivation', 'performance management', 'coaching skills'],
    notes: 'Sales managers learning to coach their teams more effectively and handle performance conversations.'
  }
];

const ThemesInsights = () => {
  const [themeEntries, setThemeEntries] = useState(themes);
  const [quarterFilter, setQuarterFilter] = useState('all');
  const [functionFilter, setFunctionFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

  // Form state for new theme entry
  const [newTheme, setNewTheme] = useState({
    date: '',
    function: '',
    keywords: '',
    notes: ''
  });

  // Get all unique keywords for word cloud
  const allKeywords = themeEntries.flatMap(theme => theme.keywords);
  const keywordFrequency = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort keywords by frequency
  const sortedKeywords = Object.entries(keywordFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20); // Top 20 keywords

  // Filter themes
  const filteredThemes = themeEntries.filter(theme => {
    const matchesQuarter = quarterFilter === 'all' || 
      (quarterFilter === 'Q1 2025' && new Date(theme.date) >= new Date('2025-01-01'));
    const matchesFunction = functionFilter === 'all' || theme.function === functionFilter;
    return matchesQuarter && matchesFunction;
  });

  const handleAddTheme = () => {
    if (!newTheme.date || !newTheme.function || !newTheme.keywords) return;

    const theme = {
      id: `theme-${Date.now()}`,
      date: newTheme.date,
      function: newTheme.function,
      keywords: newTheme.keywords.split(',').map(k => k.trim()),
      notes: newTheme.notes
    };

    setThemeEntries([theme, ...themeEntries]);
    setNewTheme({ date: '', function: '', keywords: '', notes: '' });
    setIsAddDialogOpen(false);
  };

  const generateAISummary = async () => {
    setIsGeneratingSummary(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a realistic summary based on the themes
    const topKeywords = sortedKeywords.slice(0, 5).map(([keyword]) => keyword);
    const functions = [...new Set(filteredThemes.map(t => t.function))];
    
    const summary = `Based on ${filteredThemes.length} coaching themes analyzed across ${functions.length} functions, several key patterns emerge:

**Top Focus Areas:** ${topKeywords.join(', ')} are the most frequently discussed topics, indicating shared challenges across leadership levels.

**Cross-Functional Trends:** Teams are consistently grappling with scaling challenges, remote work adaptation, and the balance between technical excellence and leadership development.

**Emerging Needs:** There's a notable emphasis on improving communication skills and cross-functional collaboration, particularly among individual contributors transitioning to leadership roles.

**Recommendations for Q2:** Consider group coaching sessions around ${topKeywords[0]} and ${topKeywords[1]}, and develop targeted resources for ${functions.join(' and ')} functions to address common challenges.`;

    setAiSummary(summary);
    setIsGeneratingSummary(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Themes & Insights</h1>
          <p className="text-muted-foreground">Track coaching conversation themes and patterns</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateAISummary} disabled={isGeneratingSummary}>
            {isGeneratingSummary ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                AI Summary
              </>
            )}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Theme
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Theme Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTheme.date}
                    onChange={(e) => setNewTheme({ ...newTheme, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="function">Function/Group</Label>
                  <Select value={newTheme.function} onValueChange={(value) => setNewTheme({ ...newTheme, function: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="keywords">Theme Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="communication, leadership, technical skills (comma-separated)"
                    value={newTheme.keywords}
                    onChange={(e) => setNewTheme({ ...newTheme, keywords: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional context or observations..."
                    value={newTheme.notes}
                    onChange={(e) => setNewTheme({ ...newTheme, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddTheme} className="w-full">
                  Add Theme Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* AI Summary */}
      {aiSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              AI-Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {aiSummary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0">
                  {paragraph.startsWith('**') ? (
                    <span className="font-medium">{paragraph.replace(/\*\*/g, '')}</span>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={quarterFilter} onValueChange={setQuarterFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quarter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                <SelectItem value="Q4 2024">Q4 2024</SelectItem>
              </SelectContent>
            </Select>
            <Select value={functionFilter} onValueChange={setFunctionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Function" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Functions</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Word Cloud */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Most Common Themes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sortedKeywords.map(([keyword, count]) => (
              <Badge 
                key={keyword} 
                variant="outline" 
                className="text-sm"
                style={{ 
                  fontSize: `${Math.min(16 + count * 2, 24)}px`,
                  opacity: Math.min(0.6 + count * 0.1, 1)
                }}
              >
                {keyword} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Themes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Theme Entries
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredThemes.length} of {themeEntries.length} entries
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredThemes.map((theme) => (
                  <TableRow key={theme.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(theme.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{theme.function}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {theme.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground truncate">
                        {theme.notes}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemesInsights;