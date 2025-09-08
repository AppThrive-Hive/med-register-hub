import AppointmentsTab from "@/components/dashboard/AppointmentsTab";
import Sidebar from "@/components/Sidebar";

const AppointmentsPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Appointment Management</h1>
          <p className="text-muted-foreground">
            Schedule, manage and track patient appointments
          </p>
        </div>
        <AppointmentsTab />
      </div>
    </div>
  );
};

export default AppointmentsPage;