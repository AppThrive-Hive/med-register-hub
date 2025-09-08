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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Eye, Phone, Mail, Calendar, MapPin, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Patient {
  id: string;
  patient_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  email?: string;
  primary_phone: string;
  secondary_phone?: string;
  national_id?: string;
  marital_status?: string;
  preferred_language?: string;
  created_at: string;
  updated_at: string;
}

const PatientsTab = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.primary_phone.includes(searchTerm);
    
    const matchesGender = genderFilter === "all" || patient.gender.toLowerCase() === genderFilter.toLowerCase();
    
    return matchesSearch && matchesGender;
  });

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setViewDialogOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    toast.info(`Edit functionality for ${patient.first_name} ${patient.last_name} will be implemented soon.`);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p>Loading patients...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              Patients ({filteredPatients.length})
              <Badge variant="secondary" className="ml-2">
                {patients.length} Total
              </Badge>
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-72"
                />
              </div>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.patient_id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {patient.first_name} {patient.middle_name} {patient.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Born: {new Date(patient.date_of_birth).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {calculateAge(patient.date_of_birth)} years
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={patient.gender === 'Male' ? 'default' : 'secondary'}>
                        {patient.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {formatPhoneNumber(patient.primary_phone)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.email ? (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {patient.email}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No email</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(patient.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewPatient(patient)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPatient(patient)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPatients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {searchTerm ? 'No patients found matching your search.' : 'No patients registered yet.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Patient Details
            </DialogTitle>
            <DialogDescription>
              Complete information for {selectedPatient?.first_name} {selectedPatient?.last_name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">PATIENT INFORMATION</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="text-sm">
                        {selectedPatient.first_name} {selectedPatient.middle_name} {selectedPatient.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Patient ID</label>
                      <p className="text-sm font-mono">{selectedPatient.patient_id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date of Birth</label>
                      <p className="text-sm">
                        {new Date(selectedPatient.date_of_birth).toLocaleDateString()} 
                        <span className="text-muted-foreground ml-2">
                          ({calculateAge(selectedPatient.date_of_birth)} years old)
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Gender</label>
                      <p className="text-sm">{selectedPatient.gender}</p>
                    </div>
                    {selectedPatient.marital_status && (
                      <div>
                        <label className="text-sm font-medium">Marital Status</label>
                        <p className="text-sm">{selectedPatient.marital_status}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">CONTACT INFORMATION</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Primary Phone</label>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {formatPhoneNumber(selectedPatient.primary_phone)}
                      </p>
                    </div>
                    {selectedPatient.secondary_phone && (
                      <div>
                        <label className="text-sm font-medium">Secondary Phone</label>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {formatPhoneNumber(selectedPatient.secondary_phone)}
                        </p>
                      </div>
                    )}
                    {selectedPatient.email && (
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {selectedPatient.email}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium">Preferred Language</label>
                      <p className="text-sm">{selectedPatient.preferred_language}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3">ADDITIONAL INFORMATION</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPatient.national_id && (
                    <div>
                      <label className="text-sm font-medium">National ID</label>
                      <p className="text-sm font-mono">{selectedPatient.national_id}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Registration Date</label>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(selectedPatient.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Updated</label>
                    <p className="text-sm">
                      {new Date(selectedPatient.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleEditPatient(selectedPatient)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Patient
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientsTab;