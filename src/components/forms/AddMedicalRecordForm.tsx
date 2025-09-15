import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { TablesInsert } from "@/integrations/supabase/types";
import { toast } from "sonner";

const addMedicalRecordSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  record_type: z.string().min(1, "Record type is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  provider_name: z.string().optional(),
  record_date: z.string().min(1, "Record date is required"),
});

type AddMedicalRecordFormData = z.infer<typeof addMedicalRecordSchema>;

interface AddMedicalRecordFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface Patient {
  id: string;
  patient_id: string;
  first_name: string;
  last_name: string;
}

const AddMedicalRecordForm = ({ onSuccess, onCancel }: AddMedicalRecordFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const form = useForm<AddMedicalRecordFormData>({
    resolver: zodResolver(addMedicalRecordSchema),
    defaultValues: {
      patient_id: "",
      record_type: "",
      title: "",
      description: "",
      provider_name: "",
      record_date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('id, patient_id, first_name, last_name')
        .order('first_name');

      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const onSubmit = async (data: AddMedicalRecordFormData) => {
    setIsSubmitting(true);
    try {
      const recordData: TablesInsert<'medical_records'> = {
        patient_id: data.patient_id,
        record_type: data.record_type as 'Consultation' | 'Lab Result' | 'Imaging' | 'Treatment' | 'Prescription' | 'Referral',
        title: data.title,
        description: data.description || null,
        provider_name: data.provider_name || null,
        record_date: data.record_date,
      };

      const { error } = await supabase
        .from('medical_records')
        .insert([recordData]);

      if (error) throw error;

      toast.success("Medical record added successfully!");
      onSuccess();
    } catch (error) {
      console.error('Error adding medical record:', error);
      toast.error("Failed to add medical record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="patient_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.first_name} {patient.last_name} - {patient.patient_id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="record_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select record type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Lab Result">Lab Result</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="Treatment">Treatment</SelectItem>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="record_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter record title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="provider_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider</FormLabel>
              <FormControl>
                <Input placeholder="Enter provider name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter detailed description of the medical record" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Record"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMedicalRecordForm;