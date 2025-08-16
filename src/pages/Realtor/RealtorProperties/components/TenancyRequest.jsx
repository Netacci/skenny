/* eslint-disable react/prop-types */
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";

const TenancyRequestsTable = ({ requests }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5; // you can change page size
  const navigate = useNavigate();

  // Pagination logic
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = requests?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(requests?.length / requestsPerPage);

  const handleView = (id) => {
    navigate(ROUTES.tenancyRequestDetail.replace(':id', id), { state: { tenancyRequests: requests } });
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Tenancy Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">First Name</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Last Name</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Email</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Phone Number</th>
              <th className="p-3 text-center text-sm font-medium text-gray-700 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests?.length > 0 ? (
              currentRequests?.map((req, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-800 border-b">{req.firstName}</td>
                  <td className="p-3 text-sm text-gray-800 border-b">{req.lastName}</td>
                  <td className="p-3 text-sm text-gray-800 border-b">{req.email || "—"}</td>
                  <td className="p-3 text-sm text-gray-800 border-b">{req.phoneNumber}</td>
                  <td className="p-3 text-center border-b">
                    <button
                      onClick={() => handleView(req._id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No tenancy requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {requests?.length > requestsPerPage && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TenancyRequestsTable;
