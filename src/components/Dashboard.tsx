import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Activity, FileText, TrendingUp, Clock, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import PatientsTab from "@/components/dashboard/PatientsTab";
import AppointmentsTab from "@/components/dashboard/AppointmentsTab";
import MedicalRecordsTab from "@/components/dashboard/MedicalRecordsTab";
import ReportsTab from "@/components/dashboard/ReportsTab";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingTests: 0,
    reportsGenerated: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total patients count
        const { count: patientsCount } = await supabase
          .from('patients')
          .select('*', { count: 'exact', head: true });

        // Get today's appointments
        const today = new Date().toISOString().split('T')[0];
        const { count: appointmentsCount } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('appointment_date', today);

        // Get pending medical records (as proxy for pending tests)
        const { count: recordsCount } = await supabase
          .from('medical_records')
          .select('*', { count: 'exact', head: true })
          .eq('record_type', 'Lab Result');

        // Get total reports
        const { count: reportsCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalPatients: patientsCount || 0,
          todayAppointments: appointmentsCount || 0,
          pendingTests: recordsCount || 0,
          reportsGenerated: reportsCount || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Patients",
      value: loading ? "..." : stats.totalPatients.toString(),
      icon: Users,
      change: "+12.5%",
      changeType: "positive" as const
    },
    {
      title: "Today's Appointments", 
      value: loading ? "..." : stats.todayAppointments.toString(),
      icon: Calendar,
      change: "+3.2%",
      changeType: "positive" as const
    },
    {
      title: "Lab Results",
      value: loading ? "..." : stats.pendingTests.toString(),
      icon: Activity,
      change: "-2.1%", 
      changeType: "negative" as const
    },
    {
      title: "Reports Generated",
      value: loading ? "..." : stats.reportsGenerated.toString(),
      icon: FileText,
      change: "+8.7%",
      changeType: "positive" as const
    }
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-medical-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-medical-blue text-white p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/a3425d73-ed94-4bde-9268-945b5a7b8f2b.png" 
              alt="Maranatha Medical Services" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-2xl font-bold">Maranatha Medical Services</h1>
              <p className="text-white/80">Patient Management Dashboard</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <TrendingUp className={`h-3 w-3 ${
                    stat.changeType === 'positive' ? 'text-medical-green' : 'text-medical-red'
                  }`} />
                  <span className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-medical-green' : 'text-medical-red'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts and Additional Content */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-medical-blue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New patient registered</p>
                      <p className="text-xs text-muted-foreground">John Doe - 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-medical-green rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Appointment completed</p>
                      <p className="text-xs text-muted-foreground">Sarah Smith - 15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-medical-orange rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Test results available</p>
                      <p className="text-xs text-muted-foreground">Mike Johnson - 1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <button className="flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted transition-colors">
                    <Users className="w-5 h-5 text-medical-blue" />
                    <div>
                      <p className="font-medium">Register New Patient</p>
                      <p className="text-xs text-muted-foreground">Add a new patient to the system</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted transition-colors">
                    <Calendar className="w-5 h-5 text-medical-green" />
                    <div>
                      <p className="font-medium">Schedule Appointment</p>
                      <p className="text-xs text-muted-foreground">Book a new appointment</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-3 text-left rounded-lg hover:bg-muted transition-colors">
                    <FileText className="w-5 h-5 text-medical-orange" />
                    <div>
                      <p className="font-medium">Generate Report</p>
                      <p className="text-xs text-muted-foreground">Create monthly reports</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients">
          <PatientsTab />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentsTab />
        </TabsContent>

        <TabsContent value="records">
          <MedicalRecordsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;