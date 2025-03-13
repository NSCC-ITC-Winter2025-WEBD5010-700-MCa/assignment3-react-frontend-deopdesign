import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function GreenLanternCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createGreenlanternMutation = useMutation({
    mutationFn: async (data) => {
      // Format the data before sending it to the backend
      const formattedData = {
        ...data,
        writtenBy: data.writtenBy.split(",").map((item) => item.trim()), // Convert writtenBy to an array
        specs: {
          pageCount: parseInt(data.pageCount, 10) || 0, // Ensure pageCount is a number
          price: parseFloat(data.price) || 0, // Ensure price is a number
        },
      };

      console.log("📤 Sending formatted data:", formattedData); // Log formatted data before sending

      try {
        const response = await fetch("http://localhost:3000/green-lanterns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
          throw new Error("Failed to create Green Lantern");
        }

        const result = await response.json();
        console.log("✅ Green Lantern created successfully:", result); // Log success

        return result;
      } catch (error) {
        console.error("❌ Error creating Green Lantern:", error); // Log any errors
        throw error; // Re-throw error for mutation handling
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["greenLanternData"]);
      navigate("/admin/green-lanterns");
    },
  });

  return (
    <div>
      <h2>Create New Green Lantern</h2>
      {createGreenlanternMutation.isError && (
        <p>Error: {createGreenlanternMutation.error.message}</p>
      )}
      {createGreenlanternMutation.isSuccess && <p>Green Lantern created!</p>}

      <form
        onSubmit={handleSubmit((data) =>
          createGreenlanternMutation.mutate(data)
        )}
      >
        <input
          {...register("title", { required: "Title is required!" })}
          type="text"
          placeholder="Title"
          required
        />
        <br />
        <input
          {...register("writtenBy")}
          type="text"
          placeholder="Written By (comma-separated)"
          required
        />
        <br />
        <input
          {...register("pageCount")}
          type="number"
          placeholder="Page Count"
          required
        />
        <br />
        <input
          {...register("price")}
          type="number"
          step="0.01"
          placeholder="Price"
          required
        />
        <br />
        <button type="submit" disabled={createGreenlanternMutation.isLoading}>
          {createGreenlanternMutation.isLoading
            ? "Creating..."
            : "Create Green Lantern"}
        </button>
      </form>
    </div>
  );
}

export default GreenLanternCreate;
