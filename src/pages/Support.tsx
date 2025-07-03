import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";



interface Support{
    id: number,
    complaint: string,
    userId: string,
}

const Support:React.FC = () => {

    const [support,setSupport]=useState<Support[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
    fetch("http://localhost:5000/support")
      .then((res) => res.json())
      .then((data) => setSupport(Array.isArray(data) ? data : [data]))
      .catch((err) => console.error("Failed to fetch details:", err));
  }, []);


    return (
    <div className="min-h-screen bg-gray-50">
        <Topbar/>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 px-4 pt-6">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-arrow-left text-lg" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Support</h2>
      </div>


    <div className="p-5">
      {support.map((complaints) => (
        <div
          key={complaints.id}
          className="flex items-start border-b py-3"
        >
        <div>
            <div className="text-lg font-medium text-gray-800 px-4">
              Complaint: <span className="text-lg text-gray-600">{complaints.complaint}</span></div>
            <div className="text-sm text-gray-800 px-4">User ID: <span className="text-sm text-gray-500">{complaints.userId}</span></div>
        </div>
        </div>
      ))}
    </div>
    </div>
    )
}

export default Support