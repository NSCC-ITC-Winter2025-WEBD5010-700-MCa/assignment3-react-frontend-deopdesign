import { useQuery } from "@tanstack/react-query";
import GreenLanternsTable from "../components/greenLanterns/GreenLanternsTable";
import { Outlet } from "react-router-dom";

const GreenLanterns = () => {
  const {
    isPending,
    error,
    data: greenLanterns,
  } = useQuery({
    queryKey: ["greenLanternData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/green-lanterns");
      return response.json();
    },
    // staleTime: Infinity,
  });

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <Outlet />
      <h1 className="text-2xl font-bold">Green Lanterns</h1>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <GreenLanternsTable greenLanterns={greenLanterns} />
      )}
    </div>
  );
};

export default GreenLanterns;
