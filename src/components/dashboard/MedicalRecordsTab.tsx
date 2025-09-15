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
import { Search, Plus, FileText, Download } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import AddMedicalRecordForm from "@/components/forms/AddMedicalRecordForm";

interface MedicalRecord {
  id: string;
  record_type: string;
  title: string;
  description?: string;
  provider_name?: string;
  record_date: string;
  created_at: string;
  patient: {
    patient_id: string;
    first_name: string;
    last_name: string;
  };
}

const MedicalRecordsTab = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [addRecordDialogOpen, setAddRecordDialogOpen] = useState(false);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select(`
          *,
          patient:patients(
            patient_id,
            first_name,
            last_name
          )
        `)
        .order('record_date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record =>
    `${record.patient.first_name} ${record.patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.record_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'Consultation':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Lab Result':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Imaging':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'Treatment':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'Prescription':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-100';
      case 'Referral':
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const handleAddRecordSuccess = () => {
    setAddRecordDialogOpen(false);
    fetchMedicalRecords();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p>Loading medical records...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={() => setAddRecordDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
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
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {record.patient.first_name} {record.patient.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ID: {record.patient.patient_id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRecordTypeColor(record.record_type)}>
                        {record.record_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium max-w-xs truncate" title={record.title}>
                        {record.title}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-xs truncate text-muted-foreground" title={record.description}>
                        {record.description || 'No description'}
                      </p>
                    </TableCell>
                    <TableCell>{record.provider_name || 'Not specified'}</TableCell>
                    <TableCell>
                      {new Date(record.record_date).toLocaleDateString()}
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
                {filteredRecords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {searchTerm ? 'No medical records found matching your search.' : 'No medical records available yet.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Medical Record Dialog */}
      <Dialog open={addRecordDialogOpen} onOpenChange={setAddRecordDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Medical Record
            </DialogTitle>
            <DialogDescription>
              Add a new medical record for a patient
            </DialogDescription>
          </DialogHeader>
          <AddMedicalRecordForm 
            onSuccess={handleAddRecordSuccess}
            onCancel={() => setAddRecordDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalRecordsTab;