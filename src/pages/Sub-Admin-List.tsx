import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type SubAdmins = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

const SubAdminList = () => {
  const [subAdminsData, setSubAdminsData] = useState<SubAdmins[]>([]);

  // Get API call
  const getData = async () => {
    try {
      const res = await axios.get("https://your-api.com/api/subadmins"); // ✅ Update with your real URL
      if (res.status === 200) {
        setSubAdminsData(res.data); // ✅ Fix: use response data
      } else {
        console.error("Failed to fetch sub-admin data");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-2">
      <div className="mt-8 w-[98%] m-auto">
        {/* Back Button */}
        <div>
          <Link to="/" className="flex items-baseline gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.82509 8.9998L8.72509 13.8998C8.92509 14.0998 9.02109 14.3331 9.01309 14.5998C9.00509 14.8665 8.90075 15.0998 8.70009 15.2998C8.50009 15.4831 8.26675 15.5791 8.00009 15.5878C7.73342 15.5965 7.50009 15.5005 7.30009 15.2998L0.700087 8.6998C0.600087 8.5998 0.529087 8.49147 0.487087 8.3748C0.445087 8.25814 0.424754 8.13314 0.426087 7.9998C0.42742 7.86647 0.44842 7.74147 0.489087 7.6248C0.529753 7.50814 0.60042 7.3998 0.701087 7.2998L7.30109 0.699804C7.48442 0.516471 7.71375 0.424805 7.98909 0.424805C8.26442 0.424805 8.50175 0.516471 8.70109 0.699804C8.90109 0.899804 9.00109 1.13747 9.00109 1.4128C9.00109 1.68814 8.90109 1.92547 8.70109 2.1248L3.82509 6.9998H15.0001C15.2834 6.9998 15.5211 7.0958 15.7131 7.2878C15.9051 7.4798 16.0008 7.71714 16.0001 7.9998C15.9994 8.28247 15.9034 8.52014 15.7121 8.7128C15.5208 8.90547 15.2834 9.00114 15.0001 8.9998H3.82509Z"
                fill="black"
              />
            </svg>
            <h2 className="text-[20px] font-semibold mb-4">Back</h2>
          </Link>
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold mb-4">Sub Admin</h2>
          <Link
            to="/sub-admin"
            className="text-md rounded-md font-semibold bg-gray-400 py-2 px-4"
          >
            Add Sub-Admin
          </Link>
        </div>

        <div className="rounded-md">
          <table className="border border-black w-full rounded-lg overflow-hidden shadow-[3px_5px_3px_rgb(0,0,0,0.2),inset_0_3px_3px_rgb(0,0,0,0.1)]">
            <thead>
              <tr className="text-left">
                <th className="p-2">Sl No.</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone Number</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subAdminsData.length > 0 ? (
                subAdminsData.map((res, index) => (
                  <tr
                    key={res.id}
                    className="border border-black/50 hover:bg-gray-200"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{res.name}</td>
                    <td className="p-2">{res.email}</td>
                    <td className="p-2">{res.phoneNumber}</td>
                    <td className="p-2">{res.role}</td>
                    <td className="p-2">
                      <Link
                        to={`/edit-subAdmin/${res.id}`}
                        className="border border-black/50 py-1 px-3 rounded-md bg-gray-100"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No sub-admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubAdminList;
