-- Create enum types for better data integrity
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE marital_status_type AS ENUM ('Single', 'Married', 'Divorced', 'Widowed', 'Separated');
CREATE TYPE smoking_status_type AS ENUM ('Never', 'Former', 'Current');
CREATE TYPE alcohol_consumption_type AS ENUM ('Never', 'Occasionally', 'Regularly', 'Heavily');
CREATE TYPE exercise_frequency_type AS ENUM ('Never', 'Rarely', 'Weekly', 'Daily');
CREATE TYPE appointment_status_type AS ENUM ('Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show');
CREATE TYPE record_type AS ENUM ('Consultation', 'Lab Result', 'Imaging', 'Treatment', 'Prescription', 'Referral');

-- Main patients table
CREATE TABLE public.patients (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id VARCHAR(20) UNIQUE NOT NULL, -- Custom patient ID (e.g., P-2025-0001)
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender gender_type NOT NULL,
    national_id VARCHAR(50) UNIQUE,
    marital_status marital_status_type,
    preferred_language VARCHAR(50) DEFAULT 'English',
    email VARCHAR(255) UNIQUE,
    primary_phone VARCHAR(20) NOT NULL,
    secondary_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Patient addresses
CREATE TABLE public.patient_addresses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    street_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NOT NULL,
    zip_postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'United States',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Emergency contacts
CREATE TABLE public.emergency_contacts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    contact_name VARCHAR(200) NOT NULL,
    relationship VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    street_address TEXT,
    city VARCHAR(100),
    state_province VARCHAR(100),
    zip_postal_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Current medications
CREATE TABLE public.patient_medications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    prescribed_by VARCHAR(200),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Known allergies
CREATE TABLE public.patient_allergies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    allergen VARCHAR(200) NOT NULL,
    allergy_type VARCHAR(50) NOT NULL, -- 'medication', 'food', 'environmental'
    reaction TEXT,
    severity VARCHAR(50), -- 'mild', 'moderate', 'severe'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Previous surgeries
CREATE TABLE public.patient_surgeries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    procedure_name VARCHAR(300) NOT NULL,
    surgery_date DATE NOT NULL,
    hospital VARCHAR(200),
    surgeon VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chronic conditions
CREATE TABLE public.patient_chronic_conditions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    condition_name VARCHAR(200) NOT NULL,
    diagnosed_date DATE,
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Managed', 'Resolved'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Family medical history
CREATE TABLE public.family_medical_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    relationship VARCHAR(100) NOT NULL, -- 'Mother', 'Father', 'Sibling', etc.
    condition VARCHAR(200) NOT NULL,
    age_of_onset INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lifestyle information
CREATE TABLE public.patient_lifestyle (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    occupation VARCHAR(200),
    smoking_status smoking_status_type DEFAULT 'Never',
    alcohol_consumption alcohol_consumption_type DEFAULT 'Never',
    exercise_habits exercise_frequency_type DEFAULT 'Never',
    dietary_restrictions TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Appointments
CREATE TABLE public.appointments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    appointment_case TEXT NOT NULL,
    status appointment_status_type DEFAULT 'Scheduled',
    provider_name VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Medical records
CREATE TABLE public.medical_records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id),
    record_type record_type NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    provider_name VARCHAR(200),
    record_date DATE NOT NULL DEFAULT CURRENT_DATE,
    file_url TEXT, -- For storing file references if needed
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Previous healthcare providers
CREATE TABLE public.previous_healthcare_providers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    provider_name VARCHAR(200) NOT NULL,
    provider_type VARCHAR(100), -- 'Primary Care', 'Specialist', 'Hospital', etc.
    contact_info TEXT,
    last_visit_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reports (for clinic management)
CREATE TABLE public.reports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    report_name VARCHAR(200) NOT NULL,
    report_type VARCHAR(100) NOT NULL, -- 'Patient Summary', 'Monthly Stats', etc.
    generated_by VARCHAR(200),
    report_data JSONB, -- Store report data as JSON
    generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_surgeries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_chronic_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_medical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_lifestyle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previous_healthcare_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (clinic staff)
-- For now, allowing all authenticated users to access all data
-- In production, you'd want more granular permissions

-- Patients policies
CREATE POLICY "Authenticated users can view all patients" ON public.patients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert patients" ON public.patients FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update patients" ON public.patients FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete patients" ON public.patients FOR DELETE TO authenticated USING (true);

-- Patient addresses policies
CREATE POLICY "Authenticated users can manage patient addresses" ON public.patient_addresses FOR ALL TO authenticated USING (true);

-- Emergency contacts policies
CREATE POLICY "Authenticated users can manage emergency contacts" ON public.emergency_contacts FOR ALL TO authenticated USING (true);

-- Medications policies
CREATE POLICY "Authenticated users can manage medications" ON public.patient_medications FOR ALL TO authenticated USING (true);

-- Allergies policies
CREATE POLICY "Authenticated users can manage allergies" ON public.patient_allergies FOR ALL TO authenticated USING (true);

-- Surgeries policies
CREATE POLICY "Authenticated users can manage surgeries" ON public.patient_surgeries FOR ALL TO authenticated USING (true);

-- Chronic conditions policies
CREATE POLICY "Authenticated users can manage chronic conditions" ON public.patient_chronic_conditions FOR ALL TO authenticated USING (true);

-- Family medical history policies
CREATE POLICY "Authenticated users can manage family history" ON public.family_medical_history FOR ALL TO authenticated USING (true);

-- Lifestyle policies
CREATE POLICY "Authenticated users can manage lifestyle info" ON public.patient_lifestyle FOR ALL TO authenticated USING (true);

-- Appointments policies
CREATE POLICY "Authenticated users can manage appointments" ON public.appointments FOR ALL TO authenticated USING (true);

-- Medical records policies
CREATE POLICY "Authenticated users can manage medical records" ON public.medical_records FOR ALL TO authenticated USING (true);

-- Healthcare providers policies
CREATE POLICY "Authenticated users can manage healthcare providers" ON public.previous_healthcare_providers FOR ALL TO authenticated USING (true);

-- Reports policies
CREATE POLICY "Authenticated users can manage reports" ON public.reports FOR ALL TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lifestyle_updated_at BEFORE UPDATE ON public.patient_lifestyle FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON public.medical_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate patient ID
CREATE OR REPLACE FUNCTION public.generate_patient_id()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
    new_id TEXT;
BEGIN
    year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
    
    SELECT LPAD((COUNT(*) + 1)::TEXT, 4, '0') INTO sequence_part
    FROM public.patients 
    WHERE patient_id LIKE 'P-' || year_part || '-%';
    
    new_id := 'P-' || year_part || '-' || sequence_part;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create indexes for better performance
CREATE INDEX idx_patients_patient_id ON public.patients(patient_id);
CREATE INDEX idx_patients_email ON public.patients(email);
CREATE INDEX idx_patients_phone ON public.patients(primary_phone);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date, appointment_time);
CREATE INDEX idx_appointments_patient ON public.appointments(patient_id);
CREATE INDEX idx_medical_records_patient ON public.medical_records(patient_id);
CREATE INDEX idx_medical_records_date ON public.medical_records(record_date);