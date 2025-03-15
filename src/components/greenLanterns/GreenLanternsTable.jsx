import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const GreenLanternsTable = ({ greenLanterns }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteGreenLanternMutation = useMutation({
    mutationFn: async (greenLanternId) => {
      const response = await fetch(
        `http://localhost:3000/green-lanterns/${greenLanternId}`,
        { method: "DELETE" }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["greenLanternData"]);
    },
    onError: (error) => {
      alert("Unable to delete");
    },
  });

  const handleDelete = (greenLanternId) => {
    // send a delete request to our API to delete the selected record
    if (
      window.confirm(`Are you sure you wish to delete record ${greenLanternId}`)
    ) {
      deleteGreenLanternMutation.mutate(greenLanternId);
    }
  };

  return (
    <>
      <p>
        <Link to="/admin/green-lanterns/create">Add New Green Lantern</Link>
      </p>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Author(s)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Page Count
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Price
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {greenLanterns.map((greenLantern) => {
            return (
              <tr key={greenLantern._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {greenLantern.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {greenLantern.writtenBy.map((writer, index) => (
                    <li key={index}>{writer}</li>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {greenLantern.specs.pageCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {greenLantern.specs.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/green-lanterns/${greenLantern._id}/details`
                      )
                    }
                    className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      navigate(
                        `/admin/green-lanterns/${greenLantern._id}/edit`
                      );
                    }}
                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(greenLantern._id);
                    }}
                    className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GreenLanternsTable;
