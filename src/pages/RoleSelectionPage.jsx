import { useEffect } from "react";
import { useFinanceStore } from "../store/useFinanceStore";

const RoleSelectionPage = () => {
  const { setRole ,getRole} = useFinanceStore();
    useEffect(()=>{
        getRole()
    },[getRole])
  const handleSelect = (role) => {
    setRole(role);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Are you a Viewer or Admin?
      </h1>

      <div className="flex gap-6">
        <button
          onClick={() => handleSelect("viewer")}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
        >
          Viewer
        </button>

        <button
          onClick={() => handleSelect("admin")}
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;