-- Clear existing dummy data to avoid conflicts
DELETE FROM public.medical_records;
DELETE FROM public.appointments;
DELETE FROM public.reports;
DELETE FROM public.patients;

-- Insert dummy patients
INSERT INTO public.patients (patient_id, first_name, middle_name, last_name, date_of_birth, gender, email, primary_phone, secondary_phone, national_id, marital_status, preferred_language) VALUES
('P-2024-0001', 'John', 'Michael', 'Smith', '1985-03-15', 'Male', 'john.smith@email.com', '+1-555-0101', '+1-555-0102', 'SSN123456789', 'Married', 'English'),
('P-2024-0002', 'Sarah', 'Jane', 'Johnson', '1992-07-22', 'Female', 'sarah.johnson@email.com', '+1-555-0201', NULL, 'SSN987654321', 'Single', 'English'),
('P-2024-0003', 'Michael', 'Robert', 'Williams', '1978-11-08', 'Male', 'michael.williams@email.com', '+1-555-0301', '+1-555-0302', 'SSN456789123', 'Married', 'English'),
('P-2024-0004', 'Emily', 'Grace', 'Brown', '1990-05-14', 'Female', 'emily.brown@email.com', '+1-555-0401', NULL, 'SSN789123456', 'Single', 'English'),
('P-2024-0005', 'David', 'James', 'Davis', '1965-09-30', 'Male', 'david.davis@email.com', '+1-555-0501', '+1-555-0502', 'SSN321654987', 'Married', 'English'),
('P-2024-0006', 'Lisa', 'Marie', 'Miller', '1988-12-03', 'Female', 'lisa.miller@email.com', '+1-555-0601', NULL, 'SSN654987321', 'Divorced', 'English'),
('P-2024-0007', 'Robert', 'Christopher', 'Wilson', '1975-04-18', 'Male', 'robert.wilson@email.com', '+1-555-0701', '+1-555-0702', 'SSN147258369', 'Married', 'English'),
('P-2024-0008', 'Jessica', 'Ann', 'Moore', '1995-08-27', 'Female', 'jessica.moore@email.com', '+1-555-0801', NULL, 'SSN369258147', 'Single', 'English');

-- Insert dummy appointments
INSERT INTO public.appointments (patient_id, appointment_date, appointment_time, appointment_case, status, provider_name, notes) VALUES
((SELECT id FROM patients WHERE patient_id = 'P-2024-0001'), '2024-01-15', '09:00:00', 'Annual Physical Examination', 'Scheduled', 'Dr. Sarah Anderson', 'Routine checkup - no specific concerns'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0002'), '2024-01-15', '10:30:00', 'Dermatology Consultation', 'Scheduled', 'Dr. Michael Rodriguez', 'Skin rash evaluation'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0003'), '2024-01-16', '14:00:00', 'Cardiology Follow-up', 'Completed', 'Dr. Jennifer Kim', 'Hypertension management'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0004'), '2024-01-16', '11:15:00', 'Gynecology Checkup', 'Completed', 'Dr. Lisa Thompson', 'Annual wellness visit'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0005'), '2024-01-17', '08:30:00', 'Orthopedic Consultation', 'Scheduled', 'Dr. Mark Johnson', 'Knee pain evaluation'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0006'), '2024-01-17', '15:45:00', 'Mental Health Session', 'Scheduled', 'Dr. Amanda Foster', 'Anxiety management'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0007'), '2024-01-18', '13:20:00', 'Diabetes Management', 'Cancelled', 'Dr. Robert Chen', 'Patient requested reschedule'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0008'), '2024-01-18', '16:00:00', 'Pediatric Checkup', 'Scheduled', 'Dr. Emily White', 'Routine vaccination'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0001'), '2024-01-19', '10:00:00', 'Lab Results Review', 'Scheduled', 'Dr. Sarah Anderson', 'Follow-up on blood work'),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0003'), '2024-01-20', '09:45:00', 'Blood Pressure Check', 'Scheduled', 'Nurse Patricia', 'BP monitoring');

-- Insert dummy medical records using valid enum values
INSERT INTO public.medical_records (patient_id, record_type, title, description, provider_name, record_date, file_url) VALUES
((SELECT id FROM patients WHERE patient_id = 'P-2024-0001'), 'Lab Result', 'Complete Blood Count', 'CBC results showing normal values across all parameters. No signs of infection or anemia.', 'Dr. Sarah Anderson', '2024-01-10', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0001'), 'Prescription', 'Vitamin D Supplement', 'Prescribed Vitamin D3 2000 IU daily due to mild deficiency found in blood work.', 'Dr. Sarah Anderson', '2024-01-10', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0002'), 'Treatment', 'Contact Dermatitis Management', 'Mild allergic reaction to new skincare product. Recommended discontinuation and topical treatment.', 'Dr. Michael Rodriguez', '2024-01-08', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0002'), 'Prescription', 'Topical Corticosteroid', 'Hydrocortisone cream 1% to be applied twice daily for 7 days.', 'Dr. Michael Rodriguez', '2024-01-08', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0003'), 'Lab Result', 'Lipid Panel', 'Cholesterol levels elevated. LDL: 165 mg/dL. Dietary modifications recommended.', 'Dr. Jennifer Kim', '2024-01-05', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0003'), 'Treatment', 'Hypertension Management', 'Blood pressure 145/95. Started on ACE inhibitor. Follow-up in 4 weeks.', 'Dr. Jennifer Kim', '2024-01-05', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0004'), 'Lab Result', 'Pap Smear', 'Normal cervical cytology. No abnormal cells detected. Next screening in 3 years.', 'Dr. Lisa Thompson', '2024-01-12', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0005'), 'Imaging', 'Knee X-Ray', 'Mild degenerative changes consistent with osteoarthritis. No fractures detected.', 'Dr. Mark Johnson', '2024-01-11', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0006'), 'Consultation', 'Anxiety Disorder Evaluation', 'Generalized anxiety symptoms. Started cognitive behavioral therapy sessions.', 'Dr. Amanda Foster', '2024-01-09', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0007'), 'Lab Result', 'HbA1c Test', 'Hemoglobin A1c: 8.2%. Diabetes management needs adjustment.', 'Dr. Robert Chen', '2024-01-07', NULL),
((SELECT id FROM patients WHERE patient_id = 'P-2024-0008'), 'Treatment', 'Annual Flu Shot', 'Administered seasonal influenza vaccine. No adverse reactions noted.', 'Dr. Emily White', '2024-01-13', NULL);

-- Insert dummy reports
INSERT INTO public.reports (report_name, report_type, generated_by, report_data) VALUES
('Monthly Patient Summary', 'Patient Analytics', 'Dr. Sarah Anderson', '{"total_patients": 8, "new_patients": 3, "appointments_completed": 15, "pending_appointments": 8}'),
('Appointment Statistics - January 2024', 'Appointment Analytics', 'Admin Staff', '{"scheduled": 7, "completed": 4, "cancelled": 1, "no_show": 0, "total_revenue": 2850}'),
('Lab Results Compilation', 'Laboratory Report', 'Lab Technician', '{"pending_results": 2, "completed_tests": 12, "abnormal_findings": 3, "critical_values": 0}'),
('Financial Summary Q1 2024', 'Financial Report', 'Finance Manager', '{"revenue": 45600, "expenses": 32100, "profit": 13500, "outstanding_payments": 5200}'),
('Department Utilization Report', 'Operational Report', 'Hospital Administrator', '{"cardiology": 25, "dermatology": 18, "orthopedics": 22, "mental_health": 15, "general_medicine": 45}'),
('Insurance Claims Status', 'Insurance Report', 'Billing Department', '{"submitted": 67, "approved": 58, "pending": 9, "rejected": 3, "total_amount": 78500}'),
('Patient Satisfaction Survey', 'Quality Report', 'Quality Assurance', '{"very_satisfied": 85, "satisfied": 12, "neutral": 2, "dissatisfied": 1, "average_rating": 4.8}'),
('Medication Adherence Report', 'Clinical Report', 'Pharmacy Staff', '{"high_adherence": 78, "moderate_adherence": 15, "low_adherence": 7, "total_prescriptions": 156}');