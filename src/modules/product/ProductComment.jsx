import { Rating } from "@material-tailwind/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutationHook } from "../../hooks/useMutation";
import { useSelector } from "react-redux";
import { createComment, getAllComment } from "../../service/commentService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
export const ReviewIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-yellowColor"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const ProductComment = ({ item }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const users = useSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
      rating: 0,
    },
    mode: "onSubmit",
  });

  const handleComment = (value) => {
    if (users.access_token) {
      mutationAddComment.mutate(
        {
          productId: productId,
          userId: users?.id,
          content: value.comment,
          rating: value.rating,
        },
        {
          onSuccess: () => {
            toast.success("comment success");
            reset();
          },
        }
      );
    }
  };

  const mutationAddComment = useMutationHook((data) => {
    const res = createComment(data);
    return res;
  });

  //todo get all comments
  const fetchAllComments = async (context) => {
    const itemId = context?.queryKey[1];

    const response = await getAllComment(itemId);
    return response;
  };

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", productId],
    queryFn: fetchAllComments,
    retry: 3,
    retryDelay: 1000,
    enabled: !!productId,
  });
  console.log(comments);
  return (
    <div>
      <div className="mt-6 rounded-sm">
        <div>
          <h3 className="text-xl font-normal">Reviews ({comments?.length})</h3>
        </div>
        {/* comment list */}
        <div>
          {comments?.map((comment) => (
            <div key={comment?._id} className="py-5">
              <div className="flex items-center gap-3">
                <h1 className="font-medium capitalize">
                  {comment?.userId?.name}
                </h1>
                <div className="flex items-center ">
                  {Array(comment?.rating)
                    .fill(0)
                    .map((item) => (
                      <ReviewIcon key={v4()}></ReviewIcon>
                    ))}
                </div>
              </div>
              <p className="pl-4">{comment?.content}</p>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(handleComment)}
          className="pt-10 mt-16 border-t border-gray border-opacity-20"
        >
          <div>
            <label className="block mb-2 text-sm font-light text-gray">
              Your rating <span className="text-red-500">*</span>
            </label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-1">
                  <Rating
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className="text-sm"
                  />
                </div>
              )}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-light text-gray">
              Your review <span className="text-red-500">*</span>
            </label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-sm outline-none border-darkPrimary border-opacity-20"
                  rows="4"
                ></textarea>
              )}
            />
            <button
              type="submit"
              className="px-3 py-2 mt-2 capitalize border border-yellowColor text-yellowColor"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductComment;
