import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function GreenLanternEdit() {
  const { id } = useParams();
  console.log("ID from useParams:", id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { isPending, error, data, isSuccess } = useQuery({
    queryKey: ["greenLantern", id],
    queryFn: async () => {
      const response = await fetch(
        `https://green-lantern-trade-paperbacks.onrender.com/green-lanterns/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    },
  });

  const editGreenLanternMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `https://green-lantern-trade-paperbacks.onrender.com/green-lanterns/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["greenLanternData"]);
      navigate("/admin/green-lanterns");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      // console.log("ON SUCCESS FIRED !!!!!!!!!!!!!!!!");
      // console.log(data);
      setValue("title", data.title);
      setValue("writtenBy", data.writtenBy);
      setValue("pageCount", data.specs.pageCount);
      setValue("price", data.specs.price);
    }
  }, [isSuccess, data]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const processData = (data) => {
    editGreenLanternMutation.mutate(data);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Edit Green Lantern Id: {data._id}
      </h2>
      <form onSubmit={handleSubmit(processData)} className="space-y-4">
        {/* Title Input */}
        <div>
          <input
            {...register("title", { required: "Title is required!" })}
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Written By Input */}
        <div>
          <input
            {...register("writtenBy", { required: "Written by is required!" })}
            type="text"
            placeholder="Written By (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.writtenBy && (
            <p className="text-red-500">{errors.writtenBy.message}</p>
          )}
        </div>

        {/* Page Count Input */}
        <div>
          <input
            {...register("pageCount", { required: "Page count is required!" })}
            type="number"
            placeholder="Page Count"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pageCount && (
            <p className="text-red-500">{errors.pageCount.message}</p>
          )}
        </div>

        {/* Price Input */}
        <div>
          <input
            {...register("price", { required: "Price is required!" })}
            type="number"
            step="0.01"
            placeholder="Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default GreenLanternEdit;
