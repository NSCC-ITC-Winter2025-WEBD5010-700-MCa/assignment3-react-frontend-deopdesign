import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function GreenLanternCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange", // Validation runs on every keystroke
  });

  useEffect(() => {
    trigger(); // Run validation immediately on mount
  }, [trigger]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createGreenlanternMutation = useMutation({
    mutationFn: async (data) => {
      const formattedData = {
        ...data,
        writtenBy: data.writtenBy.split(",").map((item) => item.trim()),
        specs: {
          pageCount: parseInt(data.pageCount, 10) || 0,
          price: parseFloat(data.price) || 0,
        },
      };

      console.log("📤 Sending formatted data:", formattedData);

      try {
        const response = await fetch(
          "https://green-lantern-trade-paperbacks.onrender.com/green-lanterns",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create Green Lantern");
        }

        const result = await response.json();
        console.log("✅ Green Lantern created successfully:", result);
        return result;
      } catch (error) {
        console.error("❌ Error creating Green Lantern:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["greenLanternData"]);
      navigate("/admin/green-lanterns");
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create New Green Lantern
      </h2>
      <form
        onSubmit={handleSubmit((data) =>
          createGreenlanternMutation.mutate(data)
        )}
        className="space-y-4"
      >
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
          disabled={createGreenlanternMutation.isLoading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {createGreenlanternMutation.isLoading
            ? "Creating..."
            : "Create Green Lantern"}
        </button>
      </form>
    </div>
  );
}

export default GreenLanternCreate;
