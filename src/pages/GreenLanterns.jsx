import { useQuery } from "@tanstack/react-query";
import GreenLanternsTable from "../components/greenLanterns/GreenLanternsTable";
import { Outlet, useLocation } from "react-router-dom";

const GreenLanterns = () => {
  // get the current location information
  const location = useLocation();

  console.log(location.pathname);
  const {
    isPending,
    error,
    data: greenLanterns,
  } = useQuery({
    queryKey: ["greenLanternData"],
    queryFn: async () => {
      const response = await fetch(
        "https://green-lantern-trade-paperbacks.onrender.com/green-lanterns"
      );
      return response.json();
    },
    // staleTime: Infinity,
  });

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Green Lanterns</h1>
      {location.pathname === `/admin/green-lanterns` ? (
        isPending ? (
          <div>Loading...</div>
        ) : (
          <GreenLanternsTable greenLanterns={greenLanterns} />
        )
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default GreenLanterns;
