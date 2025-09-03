import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Plus, Download, BarChart3, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Report {
  id: string;
  report_name: string;
  report_type: string;
  generated_by?: string;
  generated_at: string;
  report_data?: any;
}

const ReportsTab = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('generated_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleReport = async (reportType: string, reportName: string) => {
    try {
      // Generate sample data based on report type
      let sampleData = {};
      
      switch (reportType) {
        case 'Patient Summary':
          sampleData = {
            totalPatients: Math.floor(Math.random() * 1000) + 100,
            newPatientsThisMonth: Math.floor(Math.random() * 50) + 10,
            averageAge: Math.floor(Math.random() * 20) + 35,
            genderDistribution: {
              male: Math.floor(Math.random() * 50) + 25,
              female: Math.floor(Math.random() * 50) + 25
            }
          };
          break;
        case 'Appointment Stats':
          sampleData = {
            totalAppointments: Math.floor(Math.random() * 500) + 100,
            completedAppointments: Math.floor(Math.random() * 400) + 80,
            cancelledAppointments: Math.floor(Math.random() * 50) + 10,
            noShowRate: (Math.random() * 10 + 2).toFixed(1) + '%'
          };
          break;
        case 'Revenue Report':
          sampleData = {
            monthlyRevenue: '$' + (Math.floor(Math.random() * 50000) + 10000).toLocaleString(),
            averagePerVisit: '$' + (Math.floor(Math.random() * 200) + 50),
            topServices: ['Consultation', 'Lab Tests', 'Imaging']
          };
          break;
        default:
          sampleData = { message: 'Sample report data' };
      }

      const { error } = await supabase
        .from('reports')
        .insert({
          report_name: reportName,
          report_type: reportType,
          generated_by: 'System',
          report_data: sampleData
        });

      if (error) throw error;
      await fetchReports(); // Refresh the list
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const filteredReports = reports.filter(report =>
    report.report_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.report_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.generated_by?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'Patient Summary':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Appointment Stats':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Revenue Report':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'Medical Analysis':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p>Loading reports...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Report Generation */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => generateSampleReport('Patient Summary', 'Monthly Patient Summary')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-medical-blue" />
              <div>
                <h3 className="font-semibold text-sm">Patient Summary</h3>
                <p className="text-xs text-muted-foreground">Generate monthly patient report</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => generateSampleReport('Appointment Stats', 'Appointment Statistics')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-medical-green" />
              <div>
                <h3 className="font-semibold text-sm">Appointment Stats</h3>
                <p className="text-xs text-muted-foreground">Appointment analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => generateSampleReport('Revenue Report', 'Monthly Revenue Report')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-medical-orange" />
              <div>
                <h3 className="font-semibold text-sm">Revenue Report</h3>
                <p className="text-xs text-muted-foreground">Financial overview</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => generateSampleReport('Medical Analysis', 'Medical Trends Analysis')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-medical-red" />
              <div>
                <h3 className="font-semibold text-sm">Medical Analysis</h3>
                <p className="text-xs text-muted-foreground">Health trends report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Generated Reports ({filteredReports.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Custom Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Generated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <p className="font-medium">{report.report_name}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getReportTypeColor(report.report_type)}>
                        {report.report_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.generated_by || 'System'}</TableCell>
                    <TableCell>
                      {new Date(report.generated_at).toLocaleDateString()} {' '}
                      {new Date(report.generated_at).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {searchTerm ? 'No reports found matching your search.' : 'No reports generated yet. Click on the cards above to generate sample reports.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;