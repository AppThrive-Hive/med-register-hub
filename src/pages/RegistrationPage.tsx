import PatientRegistration from "@/components/PatientRegistration";
import Sidebar from "@/components/Sidebar";

const RegistrationPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <PatientRegistration />
      </div>
    </div>
  );
};

export default RegistrationPage;