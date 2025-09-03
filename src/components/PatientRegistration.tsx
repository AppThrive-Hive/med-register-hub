import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, MapPin, Phone, Heart, Briefcase, CalendarDays } from "lucide-react";

interface PatientFormData {
  // Personal Information
  patientId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;
  maritalStatus: string;
  preferredLanguage: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  
  // Address Information
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyEmail: string;
  emergencyAddress: string;
  
  // Medical History
  currentMedications: string;
  knownAllergies: string;
  previousSurgeries: string;
  chronicConditions: string;
  familyHistory: string;
  currentSymptoms: string;
  previousProviders: string;
  
  // Lifestyle Information
  occupation: string;
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseHabits: string;
  dietaryRestrictions: string;
  
  // Appointment
  preferredDate: string;
  preferredTime: string;
  appointmentCase: string;
}

const PatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PatientFormData>({
    patientId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationalId: '',
    maritalStatus: '',
    preferredLanguage: '',
    email: '',
    primaryPhone: '',
    secondaryPhone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    emergencyAddress: '',
    currentMedications: '',
    knownAllergies: '',
    previousSurgeries: '',
    chronicConditions: '',
    familyHistory: '',
    currentSymptoms: '',
    previousProviders: '',
    occupation: '',
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseHabits: '',
    dietaryRestrictions: '',
    preferredDate: '',
    preferredTime: '',
    appointmentCase: ''
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Address Information", icon: MapPin },
    { id: 3, title: "Emergency Contact", icon: Phone },
    { id: 4, title: "Medical History", icon: Heart },
    { id: 5, title: "Lifestyle Information", icon: Briefcase },
    { id: 6, title: "Appointment", icon: CalendarDays }
  ];

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Patient registration data:", formData);
    // Handle form submission here
  };

  const renderPersonalInformation = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="patientId">Patient ID</Label>
        <Input
          id="patientId"
          value={formData.patientId}
          onChange={(e) => handleInputChange('patientId', e.target.value)}
          placeholder="Auto-generated"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="middleName">Middle Name</Label>
        <Input
          id="middleName"
          value={formData.middleName}
          onChange={(e) => handleInputChange('middleName', e.target.value)}
          placeholder="Enter middle name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender *</Label>
        <Select onValueChange={(value) => handleInputChange('gender', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="nationalId">National ID</Label>
        <Input
          id="nationalId"
          value={formData.nationalId}
          onChange={(e) => handleInputChange('nationalId', e.target.value)}
          placeholder="Enter national ID"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maritalStatus">Marital Status</Label>
        <Select onValueChange={(value) => handleInputChange('maritalStatus', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
            <SelectItem value="divorced">Divorced</SelectItem>
            <SelectItem value="widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredLanguage">Preferred Language</Label>
        <Select onValueChange={(value) => handleInputChange('preferredLanguage', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="indonesian">Indonesian</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="primaryPhone">Primary Phone *</Label>
        <Input
          id="primaryPhone"
          value={formData.primaryPhone}
          onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
          placeholder="Enter primary phone"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="secondaryPhone">Secondary/Mobile Phone</Label>
        <Input
          id="secondaryPhone"
          value={formData.secondaryPhone}
          onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
          placeholder="Enter secondary phone"
        />
      </div>
    </div>
  );

  const renderAddressInformation = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="streetAddress">Street Address *</Label>
        <Input
          id="streetAddress"
          value={formData.streetAddress}
          onChange={(e) => handleInputChange('streetAddress', e.target.value)}
          placeholder="Enter street address"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          placeholder="Enter city"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State/Province *</Label>
        <Input
          id="state"
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          placeholder="Enter state/province"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
        <Input
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          placeholder="Enter ZIP/postal code"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Select onValueChange={(value) => handleInputChange('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="id">Indonesia</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderEmergencyContact = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="emergencyName">Contact Name *</Label>
        <Input
          id="emergencyName"
          value={formData.emergencyName}
          onChange={(e) => handleInputChange('emergencyName', e.target.value)}
          placeholder="Enter contact name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyRelationship">Relationship to Patient *</Label>
        <Select onValueChange={(value) => handleInputChange('emergencyRelationship', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spouse">Spouse</SelectItem>
            <SelectItem value="parent">Parent</SelectItem>
            <SelectItem value="child">Child</SelectItem>
            <SelectItem value="sibling">Sibling</SelectItem>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyPhone">Phone Number *</Label>
        <Input
          id="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergencyEmail">Email Address (optional)</Label>
        <Input
          id="emergencyEmail"
          type="email"
          value={formData.emergencyEmail}
          onChange={(e) => handleInputChange('emergencyEmail', e.target.value)}
          placeholder="Enter email address"
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="emergencyAddress">Address (if different from patient)</Label>
        <Textarea
          id="emergencyAddress"
          value={formData.emergencyAddress}
          onChange={(e) => handleInputChange('emergencyAddress', e.target.value)}
          placeholder="Enter address if different from patient"
          rows={3}
        />
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={(e) => handleInputChange('currentMedications', e.target.value)}
          placeholder="List current medications with dosage and frequency"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="knownAllergies">Known Allergies</Label>
        <Textarea
          id="knownAllergies"
          value={formData.knownAllergies}
          onChange={(e) => handleInputChange('knownAllergies', e.target.value)}
          placeholder="List any medications, foods, or environmental allergies"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
        <Textarea
          id="previousSurgeries"
          value={formData.previousSurgeries}
          onChange={(e) => handleInputChange('previousSurgeries', e.target.value)}
          placeholder="List previous surgeries with dates and hospitals"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="chronicConditions">Chronic Conditions</Label>
        <Textarea
          id="chronicConditions"
          value={formData.chronicConditions}
          onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
          placeholder="List any chronic medical conditions"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="familyHistory">Family Medical History</Label>
        <Textarea
          id="familyHistory"
          value={formData.familyHistory}
          onChange={(e) => handleInputChange('familyHistory', e.target.value)}
          placeholder="List major conditions in immediate family"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentSymptoms">Current Symptoms or Reason for Visit</Label>
        <Textarea
          id="currentSymptoms"
          value={formData.currentSymptoms}
          onChange={(e) => handleInputChange('currentSymptoms', e.target.value)}
          placeholder="Describe current symptoms or reason for visit"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="previousProviders">Previous Healthcare Providers</Label>
        <Textarea
          id="previousProviders"
          value={formData.previousProviders}
          onChange={(e) => handleInputChange('previousProviders', e.target.value)}
          placeholder="List previous healthcare providers"
          rows={2}
        />
      </div>
    </div>
  );

  const renderLifestyleInformation = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input
          id="occupation"
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
          placeholder="Enter occupation"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="smokingStatus">Smoking Status</Label>
        <Select onValueChange={(value) => handleInputChange('smokingStatus', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select smoking status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="former">Former</SelectItem>
            <SelectItem value="current">Current</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
        <Select onValueChange={(value) => handleInputChange('alcoholConsumption', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select alcohol consumption" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="occasionally">Occasionally</SelectItem>
            <SelectItem value="regularly">Regularly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="exerciseHabits">Exercise Habits</Label>
        <Select onValueChange={(value) => handleInputChange('exerciseHabits', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select exercise habits" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="light">Light (1-2 times/week)</SelectItem>
            <SelectItem value="moderate">Moderate (3-4 times/week)</SelectItem>
            <SelectItem value="heavy">Heavy (5+ times/week)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
        <Textarea
          id="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
          placeholder="List any dietary restrictions or special dietary needs"
          rows={3}
        />
      </div>
    </div>
  );

  const renderAppointment = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="preferredDate">Preferred Appointment Date *</Label>
        <Input
          id="preferredDate"
          type="date"
          value={formData.preferredDate}
          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredTime">Preferred Time *</Label>
        <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select preferred time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="09:00">9:00 AM</SelectItem>
            <SelectItem value="10:00">10:00 AM</SelectItem>
            <SelectItem value="11:00">11:00 AM</SelectItem>
            <SelectItem value="14:00">2:00 PM</SelectItem>
            <SelectItem value="15:00">3:00 PM</SelectItem>
            <SelectItem value="16:00">4:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="appointmentCase">Appointment Case/Reason *</Label>
        <Textarea
          id="appointmentCase"
          value={formData.appointmentCase}
          onChange={(e) => handleInputChange('appointmentCase', e.target.value)}
          placeholder="Describe the reason for your appointment"
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformation();
      case 2:
        return renderAddressInformation();
      case 3:
        return renderEmergencyContact();
      case 4:
        return renderMedicalHistory();
      case 5:
        return renderLifestyleInformation();
      case 6:
        return renderAppointment();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-medical-light p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Patient Registration</h1>
          <p className="text-muted-foreground">Complete your registration to schedule an appointment</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= step.id
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-center font-medium hidden sm:block">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = steps[currentStep - 1].icon;
                return <Icon className="w-5 h-5" />;
              })()}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="bg-primary hover:bg-primary-hover">
                  Next Step
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientRegistration;