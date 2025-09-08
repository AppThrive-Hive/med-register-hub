import ReportsTab from "@/components/dashboard/ReportsTab";
import Sidebar from "@/components/Sidebar";

const ReportsPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate, view and download medical reports and analytics
          </p>
        </div>
        <ReportsTab />
      </div>
    </div>
  );
};

export default ReportsPage;