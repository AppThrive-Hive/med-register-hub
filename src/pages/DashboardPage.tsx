import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;