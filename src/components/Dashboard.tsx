import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  UserCheck, 
  Clock,
  Plus,
  Search,
  Bell,
  Settings
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "22",
      change: "+12% dari bulan lalu",
      icon: Users,
      trend: "up"
    },
    {
      title: "Total Appointments",
      value: "142",
      change: "+5% dari bulan lalu", 
      icon: Calendar,
      trend: "up"
    },
    {
      title: "Patient Visits",
      value: "50",
      change: "-8% dari bulan lalu",
      icon: UserCheck,
      trend: "down"
    }
  ];

  const doctors = [
    {
      name: "Dr. Bambang Saptono",
      specialty: "Poli Umum",
      status: "Aktif",
      schedule: "08:30 - 12:00",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Dr. Bella Sulastri", 
      specialty: "IGD",
      status: "Aktif",
      schedule: "08:30 - 12:00",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Dr. Joko Santoso",
      specialty: "Poli Anak", 
      status: "Non Aktif",
      schedule: "08:30 - 12:00",
      avatar: "/placeholder-avatar.jpg"
    },
    {
      name: "Dr. Cindy Claudia",
      specialty: "Poli Umum",
      status: "Non Aktif", 
      schedule: "07:30 - 09:00",
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  const patients = [
    {
      id: "PSN25-13",
      name: "Raisa Anggiani",
      time: "10:57",
      date: "11-07-2025",
      doctor: "Dr. Bambang Saptono",
      service: "Poli Umum",
      status: "Dalam Antrian"
    },
    {
      id: "PSN25-25", 
      name: "Keisya Korieen",
      time: "10:10",
      date: "11-07-2025",
      doctor: "Dr. Bambang Saptono",
      service: "Poli Umum", 
      status: "Dalam Proses"
    },
    {
      id: "PSN25-33",
      name: "Fatiaa Permana",
      time: "09:37",
      date: "11-07-2025", 
      doctor: "Dr. Bella Sulastri",
      service: "IGD",
      status: "Dalam Proses"
    },
    {
      id: "PSN25-11",
      name: "Panungkus",
      time: "09:28", 
      date: "11-07-2025",
      doctor: "Dr. Joko Santoso",
      service: "Poli Anak",
      status: "Selesai"
    },
    {
      id: "PSN25-53",
      name: "Safira Randi",
      time: "09:01",
      date: "11-07-2025",
      doctor: "Dr. Kevin Hartono", 
      service: "Poli Gigi",
      status: "Selesai"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dalam Antrian":
        return "bg-warning text-warning-foreground";
      case "Dalam Proses": 
        return "bg-primary text-primary-foreground";
      case "Selesai":
        return "bg-success text-success-foreground";
      case "Aktif":
        return "bg-success text-success-foreground";
      case "Non Aktif":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-medical-light">
      {/* Header */}
      <header className="bg-white border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-medical-blue rounded flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Wellness+</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Ringkasan kinerja klinik hari ini dalam satu tempat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                            {stat.change}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Total Appointments</CardTitle>
                  <Button variant="outline" size="sm">Harian</Button>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Chart visualization would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Patient Visits</CardTitle>
                  <Button variant="outline" size="sm">Harian</Button>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Chart visualization would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Patient List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Patient List</CardTitle>
                <Button className="bg-primary hover:bg-primary-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Lihat Semua
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID Patient</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Patient Name</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Appointment Date</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Doctor</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Service</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{patient.id}</td>
                          <td className="py-3 px-4">{patient.name}</td>
                          <td className="py-3 px-4">{patient.time}</td>
                          <td className="py-3 px-4">{patient.date}</td>
                          <td className="py-3 px-4">{patient.doctor}</td>
                          <td className="py-3 px-4">{patient.service}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">⋯</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Doctor Schedule */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Doctor Schedule</CardTitle>
                <Button variant="outline" size="sm">Harian</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {doctors.map((doctor, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                    <Avatar>
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{doctor.schedule}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doctor.status)}>
                      {doctor.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;