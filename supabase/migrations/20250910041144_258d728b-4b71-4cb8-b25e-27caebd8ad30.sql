-- Create user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'nurse', 'receptionist');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user can access patient data
CREATE OR REPLACE FUNCTION public.can_access_patient_data(_patient_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    -- Admins and doctors can access all patient data
    public.has_role(auth.uid(), 'admin'::app_role) OR
    public.has_role(auth.uid(), 'doctor'::app_role) OR
    -- Nurses and receptionists can access all patient data (configurable)
    public.has_role(auth.uid(), 'nurse'::app_role) OR
    public.has_role(auth.uid(), 'receptionist'::app_role)
$$;

-- Drop existing policies and create new secure ones
DROP POLICY IF EXISTS "Authenticated users can view all patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can insert patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can update patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can delete patients" ON public.patients;

-- Create new patient policies
CREATE POLICY "Users with appropriate roles can view patients" 
ON public.patients 
FOR SELECT 
TO authenticated
USING (public.can_access_patient_data(id));

CREATE POLICY "Users with appropriate roles can insert patients" 
ON public.patients 
FOR INSERT 
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role) OR
  public.has_role(auth.uid(), 'nurse'::app_role) OR
  public.has_role(auth.uid(), 'receptionist'::app_role)
);

CREATE POLICY "Users with appropriate roles can update patients" 
ON public.patients 
FOR UPDATE 
TO authenticated
USING (public.can_access_patient_data(id))
WITH CHECK (public.can_access_patient_data(id));

CREATE POLICY "Admins and doctors can delete patients" 
ON public.patients 
FOR DELETE 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

-- Update appointments policies
DROP POLICY IF EXISTS "Authenticated users can manage appointments" ON public.appointments;

CREATE POLICY "Users can view appointments for accessible patients" 
ON public.appointments 
FOR SELECT 
TO authenticated
USING (public.can_access_patient_data(patient_id));

CREATE POLICY "Users can insert appointments for accessible patients" 
ON public.appointments 
FOR INSERT 
TO authenticated
WITH CHECK (
  public.can_access_patient_data(patient_id) AND
  (public.has_role(auth.uid(), 'admin'::app_role) OR
   public.has_role(auth.uid(), 'doctor'::app_role) OR
   public.has_role(auth.uid(), 'nurse'::app_role) OR
   public.has_role(auth.uid(), 'receptionist'::app_role))
);

CREATE POLICY "Users can update appointments for accessible patients" 
ON public.appointments 
FOR UPDATE 
TO authenticated
USING (public.can_access_patient_data(patient_id))
WITH CHECK (public.can_access_patient_data(patient_id));

CREATE POLICY "Users can delete appointments for accessible patients" 
ON public.appointments 
FOR DELETE 
TO authenticated
USING (
  public.can_access_patient_data(patient_id) AND
  (public.has_role(auth.uid(), 'admin'::app_role) OR
   public.has_role(auth.uid(), 'doctor'::app_role))
);

-- Update medical records policies
DROP POLICY IF EXISTS "Authenticated users can manage medical records" ON public.medical_records;

CREATE POLICY "Users can view medical records for accessible patients" 
ON public.medical_records 
FOR SELECT 
TO authenticated
USING (public.can_access_patient_data(patient_id));

CREATE POLICY "Doctors and admins can insert medical records" 
ON public.medical_records 
FOR INSERT 
TO authenticated
WITH CHECK (
  public.can_access_patient_data(patient_id) AND
  (public.has_role(auth.uid(), 'admin'::app_role) OR
   public.has_role(auth.uid(), 'doctor'::app_role))
);

CREATE POLICY "Doctors and admins can update medical records" 
ON public.medical_records 
FOR UPDATE 
TO authenticated
USING (
  public.can_access_patient_data(patient_id) AND
  (public.has_role(auth.uid(), 'admin'::app_role) OR
   public.has_role(auth.uid(), 'doctor'::app_role))
)
WITH CHECK (
  public.can_access_patient_data(patient_id) AND
  (public.has_role(auth.uid(), 'admin'::app_role) OR
   public.has_role(auth.uid(), 'doctor'::app_role))
);

CREATE POLICY "Admins can delete medical records" 
ON public.medical_records 
FOR DELETE 
TO authenticated
USING (
  public.can_access_patient_data(patient_id) AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Update remaining tables with similar patterns
DROP POLICY IF EXISTS "Authenticated users can manage patient addresses" ON public.patient_addresses;
DROP POLICY IF EXISTS "Authenticated users can manage emergency contacts" ON public.emergency_contacts;
DROP POLICY IF EXISTS "Authenticated users can manage allergies" ON public.patient_allergies;
DROP POLICY IF EXISTS "Authenticated users can manage medications" ON public.patient_medications;
DROP POLICY IF EXISTS "Authenticated users can manage chronic conditions" ON public.patient_chronic_conditions;
DROP POLICY IF EXISTS "Authenticated users can manage surgeries" ON public.patient_surgeries;
DROP POLICY IF EXISTS "Authenticated users can manage lifestyle info" ON public.patient_lifestyle;
DROP POLICY IF EXISTS "Authenticated users can manage family history" ON public.family_medical_history;
DROP POLICY IF EXISTS "Authenticated users can manage healthcare providers" ON public.previous_healthcare_providers;

-- Create secure policies for all patient-related tables
CREATE POLICY "Users can view patient addresses for accessible patients" ON public.patient_addresses FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Users can manage patient addresses for accessible patients" ON public.patient_addresses FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id)) WITH CHECK (public.can_access_patient_data(patient_id));

CREATE POLICY "Users can view emergency contacts for accessible patients" ON public.emergency_contacts FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Users can manage emergency contacts for accessible patients" ON public.emergency_contacts FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id)) WITH CHECK (public.can_access_patient_data(patient_id));

CREATE POLICY "Users can view allergies for accessible patients" ON public.patient_allergies FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Medical staff can manage allergies for accessible patients" ON public.patient_allergies FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role))) WITH CHECK (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role)));

CREATE POLICY "Users can view medications for accessible patients" ON public.patient_medications FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Medical staff can manage medications for accessible patients" ON public.patient_medications FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role))) WITH CHECK (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role)));

CREATE POLICY "Users can view chronic conditions for accessible patients" ON public.patient_chronic_conditions FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Medical staff can manage chronic conditions for accessible patients" ON public.patient_chronic_conditions FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role))) WITH CHECK (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role)));

CREATE POLICY "Users can view surgeries for accessible patients" ON public.patient_surgeries FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Medical staff can manage surgeries for accessible patients" ON public.patient_surgeries FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role))) WITH CHECK (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role)));

CREATE POLICY "Users can view lifestyle info for accessible patients" ON public.patient_lifestyle FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Medical staff can manage lifestyle info for accessible patients" ON public.patient_lifestyle FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role))) WITH CHECK (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role)));

CREATE POLICY "Users can view family history for accessible patients" ON public.family_medical_history FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Medical staff can manage family history for accessible patients" ON public.family_medical_history FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role))) WITH CHECK (public.can_access_patient_data(patient_id) AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role) OR public.has_role(auth.uid(), 'nurse'::app_role)));

CREATE POLICY "Users can view healthcare providers for accessible patients" ON public.previous_healthcare_providers FOR SELECT TO authenticated USING (public.can_access_patient_data(patient_id));
CREATE POLICY "Users can manage healthcare providers for accessible patients" ON public.previous_healthcare_providers FOR ALL TO authenticated USING (public.can_access_patient_data(patient_id)) WITH CHECK (public.can_access_patient_data(patient_id));

-- Update reports policies
DROP POLICY IF EXISTS "Authenticated users can manage reports" ON public.reports;

CREATE POLICY "Users with appropriate roles can view reports" 
ON public.reports 
FOR SELECT 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

CREATE POLICY "Users with appropriate roles can manage reports" 
ON public.reports 
FOR ALL 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'doctor'::app_role)
);

-- Create policy for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Insert default admin role (you'll need to update this with actual user ID)
-- This is just a placeholder - you should set the actual admin user ID
INSERT INTO public.user_roles (user_id, role) 
VALUES ('00000000-0000-0000-0000-000000000000', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;