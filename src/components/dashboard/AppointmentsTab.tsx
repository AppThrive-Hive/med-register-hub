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
import { Search, Plus, Calendar, Clock } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import AddAppointmentForm from "@/components/forms/AddAppointmentForm";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  appointment_case: string;
  status: string;
  provider_name?: string;
  patient: {
    patient_id: string;
    first_name: string;
    last_name: string;
    primary_phone: string;
  };
}

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [addAppointmentDialogOpen, setAddAppointmentDialogOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients(
            patient_id,
            first_name,
            last_name,
            primary_phone
          )
        `)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    `${appointment.patient.first_name} ${appointment.patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.appointment_case.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'No Show':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleAddAppointmentSuccess = () => {
    setAddAppointmentDialogOpen(false);
    fetchAppointments();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p>Loading appointments...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={() => setAddAppointmentDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Case</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {appointment.patient.first_name} {appointment.patient.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ID: {appointment.patient.patient_id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(appointment.appointment_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {formatTime(appointment.appointment_time)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-xs truncate" title={appointment.appointment_case}>
                        {appointment.appointment_case}
                      </p>
                    </TableCell>
                    <TableCell>{appointment.provider_name || 'Not assigned'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{appointment.patient.primary_phone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAppointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {searchTerm ? 'No appointments found matching your search.' : 'No appointments scheduled yet.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Appointment Dialog */}
      <Dialog open={addAppointmentDialogOpen} onOpenChange={setAddAppointmentDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription>
              Schedule a new appointment for a patient
            </DialogDescription>
          </DialogHeader>
          <AddAppointmentForm 
            onSuccess={handleAddAppointmentSuccess}
            onCancel={() => setAddAppointmentDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsTab;