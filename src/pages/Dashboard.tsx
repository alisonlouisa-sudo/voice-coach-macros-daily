import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, TrendingUp, Calendar, DollarSign, Filter, Download } from 'lucide-react';

// Sample data for the coaching platform
const engagements = [
  {
    id: 'ENG-001',
    coacheeName: 'Sarah Johnson',
    title: 'VP of Engineering',
    level: 'VP',
    function: 'Engineering',
    coachName: 'Dr. Michael Chen',
    startDate: '2025-01-15',
    endDate: '2025-06-15',
    status: 'In Progress',
    cost: 15000,
    costCenter: 'ENG-001'
  },
  {
    id: 'ENG-002',
    coacheeName: 'David Rodriguez',
    title: 'Director of Sales',
    level: 'Director',
    function: 'Sales',
    coachName: 'Jennifer Walsh',
    startDate: '2024-11-01',
    endDate: '2025-04-01',
    status: 'Completed',
    cost: 12000,
    costCenter: 'SAL-001'
  },
  {
    id: 'ENG-003',
    coacheeName: 'Emma Thompson',
    title: 'Senior Manager, Marketing',
    level: 'Senior Manager',
    function: 'Marketing',
    coachName: 'Robert Kim',
    startDate: '2025-01-08',
    endDate: '2025-07-08',
    status: 'In Progress',
    cost: 10000,
    costCenter: 'MKT-001'
  },
  {
    id: 'ENG-004',
    coacheeName: 'Alex Chen',
    title: 'Director of Product',
    level: 'Director',
    function: 'Product',
    coachName: 'Dr. Lisa Park',
    startDate: '2024-12-01',
    endDate: '2025-05-01',
    status: 'Paused',
    cost: 13500,
    costCenter: 'PRD-001'
  }
];

const Dashboard = () => {
  const [filteredEngagements, setFilteredEngagements] = useState(engagements);
  const [statusFilter, setStatusFilter] = useState('all');
  const [functionFilter, setFunctionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate summary stats
  const activeEngagements = engagements.filter(e => e.status === 'In Progress').length;
  const completedThisQuarter = engagements.filter(e => 
    e.status === 'Completed' && new Date(e.endDate) >= new Date('2025-01-01')
  ).length;
  const totalCoaches = [...new Set(engagements.map(e => e.coachName))].length;
  const avgDuration = 5; // months - calculated average

  // Filter function
  const applyFilters = () => {
    let filtered = engagements;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    if (functionFilter !== 'all') {
      filtered = filtered.filter(e => e.function === functionFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.coacheeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.coachName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.function.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredEngagements(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [statusFilter, functionFilter, searchTerm]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Badge className="bg-in-progress text-in-progress-foreground">In Progress</Badge>;
      case 'Completed':
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case 'Paused':
        return <Badge className="bg-paused text-paused-foreground">Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Coaching Dashboard</h1>
          <p className="text-muted-foreground">Overview of all coaching engagements</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Engagements</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-in-progress">{activeEngagements}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Quarter</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedThisQuarter}</div>
            <p className="text-xs text-muted-foreground">Q1 2025 completions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coaches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{totalCoaches}</div>
            <p className="text-xs text-muted-foreground">Active coach network</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgDuration}</div>
            <p className="text-xs text-muted-foreground">Months per engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by name, coach, or function..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
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

      {/* Engagements Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Engagements</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredEngagements.length} of {engagements.length} engagements
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coachee Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Coach Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEngagements.map((engagement) => (
                  <TableRow key={engagement.id}>
                    <TableCell className="font-medium">{engagement.coacheeName}</TableCell>
                    <TableCell>{engagement.title}</TableCell>
                    <TableCell>{engagement.level}</TableCell>
                    <TableCell>{engagement.function}</TableCell>
                    <TableCell>{engagement.coachName}</TableCell>
                    <TableCell>{new Date(engagement.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(engagement.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(engagement.status)}</TableCell>
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

export default Dashboard;