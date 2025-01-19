import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useMutationHook = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
    onSuccess: (data) => {
      if (data?.status === "ERROR") {
        toast.error(data?.message || "An error occurred");
      } else {
        // toast.success(data?.message || "Success!");
      }
      return data;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return mutation;
};
