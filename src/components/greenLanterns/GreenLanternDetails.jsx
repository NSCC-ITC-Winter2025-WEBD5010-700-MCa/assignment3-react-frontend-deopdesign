import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchGreenLanternDetails = async (id) => {
  const response = await fetch(`http://localhost:3000/green-lanterns/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch details");
  }
  return response.json();
};

const GreenLanternDetails = () => {
  const { id } = useParams();

  const {
    data: greenLantern,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["greenLanternDetails", id],
    queryFn: () => fetchGreenLanternDetails(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold">{greenLantern.title}</h1>
      <p className="text-gray-600">{greenLantern.description}</p>
      <a
        href={greenLantern.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        View on DC Comics
      </a>

      <h2 className="text-xl mt-4 font-semibold">Written By</h2>
      <ul className="list-disc list-inside">
        {greenLantern.writtenBy.map((writer, index) => (
          <li key={index}>{writer}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-4 font-semibold">Art By</h2>
      <ul className="list-disc list-inside">
        {greenLantern.artBy.map((artist, index) => (
          <li key={index}>{artist}</li>
        ))}
      </ul>

      {greenLantern.coverBy && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Cover By</h2>
          <ul className="list-disc list-inside">
            {greenLantern.coverBy.map((coverArtist, index) => (
              <li key={index}>{coverArtist}</li>
            ))}
          </ul>
        </>
      )}

      <h2 className="text-xl mt-4 font-semibold">Specifications</h2>
      <p>
        <strong>Series:</strong> {greenLantern.specs.series}
      </p>
      <p>
        <strong>Price:</strong> ${greenLantern.specs.price}
      </p>
      <p>
        <strong>On Sale Date:</strong> {greenLantern.specs.onSaleDate}
      </p>
      <p>
        <strong>Page Count:</strong> {greenLantern.specs.pageCount}
      </p>
      <p>
        <strong>Rated:</strong> {greenLantern.specs.rated}
      </p>

      <Link to="/admin/green-lanterns" className="block mt-4 text-blue-500">
        Back to List
      </Link>
    </div>
  );
};

export default GreenLanternDetails;
