import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, FileSpreadsheet, Database, CheckCircle, AlertCircle, Lock, Settings } from 'lucide-react';

const Admin = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState('');

  // Column mapping state
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [showColumnMapping, setShowColumnMapping] = useState(false);

  const handleAdminAccess = () => {
    // In a real app, this would check actual admin permissions
    setIsAuthorized(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
      setUploadStatus('idle');
      // Simulate CSV preview for column mapping
      setShowColumnMapping(true);
      setColumnMapping({
        'coachee_name': '',
        'coach_name': '',
        'start_date': '',
        'end_date': '',
        'status': '',
        'function': '',
        'cost': ''
      });
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    setUploadStatus('success');
    setSelectedFile(null);
    setShowColumnMapping(false);
  };

  const dataTypeOptions = [
    { value: 'engagements', label: 'Coaching Engagements' },
    { value: 'coaches', label: 'Coach Information' },
    { value: 'costs', label: 'Cost & Budget Data' },
    { value: 'coachees', label: 'Coachee Information' }
  ];

  const sampleColumns = {
    engagements: ['coachee_name', 'coach_name', 'start_date', 'end_date', 'status', 'function', 'level'],
    coaches: ['name', 'email', 'expertise', 'bio', 'prior_experience'],
    costs: ['engagement_id', 'cost', 'cost_center', 'quarter'],
    coachees: ['name', 'title', 'level', 'function', 'email']
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Administrator Access Required</CardTitle>
            <p className="text-sm text-muted-foreground">
              This page contains administrative functions and requires elevated privileges.
            </p>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                Only designated administrators can access data import and system configuration features.
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
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System administration and data management</p>
        </div>
        <Badge variant="secondary" className="bg-warning/10 text-warning-foreground">
          <Settings className="w-3 h-3 mr-1" />
          Admin Panel
        </Badge>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All tables accessible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Data Sync</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">2 hours ago</div>
            <p className="text-xs text-muted-foreground">Engagement data updated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-success">Optimal</div>
            <p className="text-xs text-muted-foreground">All services running</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Status */}
      {uploadStatus === 'success' && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Data uploaded successfully! The dashboard will reflect the changes within a few minutes.
          </AlertDescription>
        </Alert>
      )}

      {uploadStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Upload failed. Please check your file format and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* CSV Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            CSV Data Import
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload CSV files to update coaching engagement data
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="dataType">Data Type</Label>
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger>
                <SelectValue placeholder="Select data type to upload" />
              </SelectTrigger>
              <SelectContent>
                {dataTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="csvFile">CSV File</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Label
                htmlFor="csvFile"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {selectedFile ? selectedFile.name : 'Click to upload CSV file'}
                </span>
                <span className="text-xs text-muted-foreground">
                  Drag and drop or click to browse
                </span>
              </Label>
            </div>
          </div>

          {/* Expected Format */}
          {dataType && (
            <Alert>
              <FileSpreadsheet className="h-4 w-4" />
              <AlertDescription>
                <strong>Expected columns for {dataTypeOptions.find(opt => opt.value === dataType)?.label}:</strong>
                <br />
                {sampleColumns[dataType as keyof typeof sampleColumns]?.join(', ')}
              </AlertDescription>
            </Alert>
          )}

          {/* Column Mapping */}
          {showColumnMapping && selectedFile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Column Mapping</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Map your CSV columns to our database fields
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(columnMapping).map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>
                        {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                      <Select
                        value={columnMapping[field]}
                        onValueChange={(value) => 
                          setColumnMapping(prev => ({ ...prev, [field]: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select CSV column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="column_a">Column A</SelectItem>
                          <SelectItem value="column_b">Column B</SelectItem>
                          <SelectItem value="column_c">Column C</SelectItem>
                          <SelectItem value="column_d">Column D</SelectItem>
                          <SelectItem value="column_e">Column E</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={simulateUpload}
            disabled={!selectedFile || !dataType || isUploading}
            className="w-full"
          >
            {isUploading ? 'Processing...' : 'Upload and Sync to Dashboard'}
          </Button>
        </CardContent>
      </Card>

      {/* Data Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Backup & Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify Data Integrity
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Update System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;