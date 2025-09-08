import PatientsTab from "@/components/dashboard/PatientsTab";
import Sidebar from "@/components/Sidebar";

const PatientsPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
          <p className="text-muted-foreground">
            Manage and view patient records and information
          </p>
        </div>
        <PatientsTab />
      </div>
    </div>
  );
};

export default PatientsPage;