import MedicalRecordsTab from "@/components/dashboard/MedicalRecordsTab";
import Sidebar from "@/components/Sidebar";

const RecordsPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">
            Access and manage patient medical records and documents
          </p>
        </div>
        <MedicalRecordsTab />
      </div>
    </div>
  );
};

export default RecordsPage;