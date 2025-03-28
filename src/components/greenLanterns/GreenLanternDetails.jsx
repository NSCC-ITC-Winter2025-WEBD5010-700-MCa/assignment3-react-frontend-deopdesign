import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchGreenLanternDetails = async (id) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_API_URL ||
      "https://green-lantern-trade-paperbacks.onrender.com"
    }/green-lanterns/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Green Lantern details");
  }
  return response.json();
};

const GreenLanternDetails = () => {
  const { id } = useParams();

  const {
    data: greenLantern,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["greenLanternDetails", id],
    queryFn: () => fetchGreenLanternDetails(id),
    retry: 3,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!greenLantern) return <p>Details not found.</p>;

  const { specs = {} } = greenLantern;

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

      {greenLantern.publisher && (
        <p className="mt-4 text-gray-500">
          <strong>Publisher:</strong> {greenLantern.publisher}
        </p>
      )}

      <h2 className="text-xl mt-4 font-semibold">Written By</h2>
      <ul className="list-disc list-inside">
        {greenLantern.writtenBy?.map((writer, index) => (
          <li key={index}>{writer}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-4 font-semibold">Art By</h2>
      <ul className="list-disc list-inside">
        {greenLantern.artBy?.map((artist, index) => (
          <li key={index}>{artist}</li>
        ))}
      </ul>

      {greenLantern.coverBy && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Cover By</h2>
          <ul className="list-disc list-inside">
            {greenLantern.coverBy?.map((coverArtist, index) => (
              <li key={index}>{coverArtist}</li>
            ))}
          </ul>
        </>
      )}

      {specs.price && (
        <p className="mt-4 text-gray-500">
          <strong>Price:</strong> ${specs.price}
        </p>
      )}

      <h2 className="text-xl mt-4 font-semibold">Specifications</h2>
      <p className="mt-2">
        <strong>Page Count:</strong> {specs.pageCount ?? "N/A"}
      </p>
      <p className="mt-2">
        <strong>On Sale Date:</strong> {specs.onSaleDate ?? "N/A"}
      </p>
      <p className="mt-2">
        <strong>Rating:</strong> {specs.rated ?? "N/A"}
      </p>
    </div>
  );
};

export default GreenLanternDetails;
