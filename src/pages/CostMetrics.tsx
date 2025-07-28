import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, PieChart, BarChart3, Lock, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Sample cost data
const costData = [
  {
    engagementId: 'ENG-001',
    coacheeName: 'Sarah Johnson',
    coachName: 'Dr. Michael Chen',
    cost: 15000,
    costCenter: 'ENG-001',
    quarter: 'Q1 2025',
    function: 'Engineering'
  },
  {
    engagementId: 'ENG-002',
    coacheeName: 'David Rodriguez',
    coachName: 'Jennifer Walsh',
    cost: 12000,
    costCenter: 'SAL-001',
    quarter: 'Q4 2024',
    function: 'Sales'
  },
  {
    engagementId: 'ENG-003',
    coacheeName: 'Emma Thompson',
    coachName: 'Robert Kim',
    cost: 10000,
    costCenter: 'MKT-001',
    quarter: 'Q1 2025',
    function: 'Marketing'
  },
  {
    engagementId: 'ENG-004',
    coacheeName: 'Alex Chen',
    coachName: 'Dr. Lisa Park',
    cost: 13500,
    costCenter: 'PRD-001',
    quarter: 'Q4 2024',
    function: 'Product'
  }
];

const CostMetrics = () => {
  const [quarterFilter, setQuarterFilter] = useState('all');
  const [functionFilter, setFunctionFilter] = useState('all');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Calculate metrics
  const totalSpendThisQuarter = costData
    .filter(item => item.quarter === 'Q1 2025')
    .reduce((sum, item) => sum + item.cost, 0);
  
  const avgCostPerEngagement = costData.reduce((sum, item) => sum + item.cost, 0) / costData.length;
  
  const costByFunction = costData.reduce((acc, item) => {
    acc[item.function] = (acc[item.function] || 0) + item.cost;
    return acc;
  }, {} as Record<string, number>);

  // Filter data
  let filteredData = costData;
  if (quarterFilter !== 'all') {
    filteredData = filteredData.filter(item => item.quarter === quarterFilter);
  }
  if (functionFilter !== 'all') {
    filteredData = filteredData.filter(item => item.function === functionFilter);
  }

  // Admin access simulation
  const handleAdminAccess = () => {
    // In a real app, this would check actual admin permissions
    setIsAuthorized(true);
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Admin Access Required</CardTitle>
            <p className="text-sm text-muted-foreground">
              This page contains sensitive financial information and requires administrator privileges.
            </p>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                Contact your HR administrator or IT department for access to cost and metrics data.
              </AlertDescription>
            </Alert>
            <Button onClick={handleAdminAccess} className="w-full">
              Simulate Admin Access
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cost & Metrics</h1>
          <p className="text-muted-foreground">Financial overview and ROI tracking</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-warning/10 text-warning-foreground">
            Admin Only
          </Badge>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Cost Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend (Q1 2025)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              ${totalSpendThisQuarter.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cost per Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${Math.round(avgCostPerEngagement).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Average investment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Spend Function</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {Object.entries(costByFunction).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
            </div>
            <p className="text-xs text-muted-foreground">
              ${Object.entries(costByFunction).reduce((a, b) => a[1] > b[1] ? a : b)[1].toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Estimate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">3.2x</div>
            <p className="text-xs text-muted-foreground">Estimated return</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Cost Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Select value={quarterFilter} onValueChange={setQuarterFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quarter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quarters</SelectItem>
                <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                <SelectItem value="Q3 2024">Q3 2024</SelectItem>
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

      {/* Cost Breakdown by Function */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown by Function</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(costByFunction).map(([func, cost]) => (
              <div key={func} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{func}</h3>
                  <p className="text-sm text-muted-foreground">
                    {costData.filter(item => item.function === func).length} engagements
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">${cost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    Avg: ${Math.round(cost / costData.filter(item => item.function === func).length).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Cost Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {costData.length} engagements
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Engagement ID</TableHead>
                  <TableHead>Coachee Name</TableHead>
                  <TableHead>Coach Name</TableHead>
                  <TableHead>Cost (USD)</TableHead>
                  <TableHead>Cost Center</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Function</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.engagementId}>
                    <TableCell className="font-medium">{item.engagementId}</TableCell>
                    <TableCell>{item.coacheeName}</TableCell>
                    <TableCell>{item.coachName}</TableCell>
                    <TableCell className="font-mono">${item.cost.toLocaleString()}</TableCell>
                    <TableCell>{item.costCenter}</TableCell>
                    <TableCell>{item.quarter}</TableCell>
                    <TableCell>{item.function}</TableCell>
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

export default CostMetrics;