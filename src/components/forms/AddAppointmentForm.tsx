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

const addAppointmentSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  appointment_date: z.string().min(1, "Appointment date is required"),
  appointment_time: z.string().min(1, "Appointment time is required"),
  appointment_case: z.string().min(1, "Appointment case is required"),
  provider_name: z.string().optional(),
  notes: z.string().optional(),
});

type AddAppointmentFormData = z.infer<typeof addAppointmentSchema>;

interface AddAppointmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface Patient {
  id: string;
  patient_id: string;
  first_name: string;
  last_name: string;
}

const AddAppointmentForm = ({ onSuccess, onCancel }: AddAppointmentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const form = useForm<AddAppointmentFormData>({
    resolver: zodResolver(addAppointmentSchema),
    defaultValues: {
      patient_id: "",
      appointment_date: "",
      appointment_time: "",
      appointment_case: "",
      provider_name: "",
      notes: "",
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

  const onSubmit = async (data: AddAppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const appointmentData: TablesInsert<'appointments'> = {
        patient_id: data.patient_id,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        appointment_case: data.appointment_case,
        provider_name: data.provider_name || null,
        notes: data.notes || null,
        status: 'Scheduled',
      };

      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);

      if (error) throw error;

      toast.success("Appointment scheduled successfully!");
      onSuccess();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast.error("Failed to schedule appointment. Please try again.");
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
            name="appointment_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appointment_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time *</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="appointment_case"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Case *</FormLabel>
              <FormControl>
                <Input placeholder="Enter reason for appointment" {...field} />
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes or instructions" {...field} />
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
            {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAppointmentForm;