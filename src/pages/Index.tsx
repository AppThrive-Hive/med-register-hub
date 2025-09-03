import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Stethoscope, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-medical-light">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-medical-blue to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">Wellness+</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Modern Patient Management System for Private Clinics
            </p>
            <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto">
              Streamline your clinic operations with our comprehensive patient registration and management platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
                  Register New Patient
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-3"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Manage Your Clinic</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive patient management tools designed specifically for private healthcare providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Patient Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete patient intake with personal information, medical history, emergency contacts, and appointment scheduling
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Appointment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Efficient scheduling system with real-time availability, appointment tracking, and automated reminders
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-medical-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-medical-accent" />
              </div>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive medical history tracking including medications, allergies, chronic conditions, and family history
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Healthcare Providers</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of medical professionals using our platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Clinics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">50k+</div>
              <div className="text-muted-foreground">Registered Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-accent mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-medical-blue py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Clinic?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Start managing your patients more efficiently today with our comprehensive healthcare management system
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Wellness+</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 Wellness+ Clinic Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
