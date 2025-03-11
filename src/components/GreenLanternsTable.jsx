const GreenLanternsTable = ({ greenLanterns }) => {
  return (
    <>
      <p>Manage books here.</p>
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
                  <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">
                    Details
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">
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
