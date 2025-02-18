const BooksTable = ({ books }) => {
  return (
    <>
      <p>Manage books here.</p>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Author
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Genre
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <>
                <tr key={book.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {book.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.author}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.published_year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.genre}
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
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BooksTable;
