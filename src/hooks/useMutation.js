import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useMutationHook = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
    onSuccess: (data) => {
      toast.success("success");
      // Xử lý thành công (ví dụ: lưu thông tin người dùng, chuyển hướng)
      console.log(" successful:", data);
      return data;
    },
    onError: (error) => {
      // Xử lý lỗi
      console.error(" failed:", error);
    },
  });
  return mutation;
};
