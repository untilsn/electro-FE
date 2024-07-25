import React, { Fragment, useEffect, useState } from "react";
import InputContaint from "../../components/input/InputContaint";
import InputForm from "../../components/input/InputForm";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import ImageUpload from "../../components/ImageUpload";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import { FiMinus } from "react-icons/fi";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFirebaseImage } from "../../hooks/useFirebaseImage";
import Description from "../../components/quill/Description";
import { createProduct } from "../../service/productService";
import { useMutationHook } from "../../hooks/useMutation";
import DropdownSelect from "../../components/dropdown/DropdownSelect";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../service/categoryService";
import { getAllBrand } from "../../service/brandService";
import DropdownOption from "../../components/dropdown/DropdownOption";

const ramOptions = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"];
const storageOptions = ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];

const AddProducts = () => {
  const { user } = useSelector((state) => state.user);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [combinedImages, setCombinedImages] = useState([]);
  const { control, watch, setValue, getValues, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      productName: "",
      productPrice: "",
      productStock: "",
      productRating: "",
      productBrand: "",
      productRam: [],
      productStorage: [],
      productUrl: [],
      productDesc: "",
    },
  });

  // Fetch categories
  const fetchAllCategory = async () => {
    const res = await getAllCategory();
    return res;
  };

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategory,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  // Fetch brands
  const fetchAllBrand = async () => {
    const res = await getAllBrand();
    return res;
  };

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchAllBrand,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  // Handle images
  const {
    progress,
    image,
    handleSelectImage,
    handleRemoveImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const handleDeleteImage = (url) => {
    handleRemoveImage(url);
  };
  const handleAddUrl = () => {
    if (urls.length > 5) return toast.error("Only 5 images or less");
    if (urls.some((item) => item === url)) {
      setUrl("");
      return;
    }
    if (url.trim() !== "") {
      setUrls((prevUrls) => [...prevUrls, url]);
      setUrl("");
    }
  };
  const handleRemoveUrl = (urlItem) => {
    const newUrls = urls.filter((url) => url !== urlItem);
    setUrls(newUrls);
  };

  const handleValueChange = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    setCombinedImages([...image, ...urls]);
  }, [image, urls]);

  // Add product
  const mutation = useMutationHook((data) => {
    const result = createProduct(data);
    return result;
  });
  const { data, isSuccess } = mutation;

  const handleAddProducts = async (values) => {
    if (!values) return;
    if (!image && !urls) {
      console.log("Bạn cần phải cung cấp urls nếu không có image.");
      return;
    }
    try {
      mutation.mutate(
        {
          name: values.productName,
          category: values.productCategory,
          brand: values.productBrand,
          image: combinedImages,
          price: Number(values.productPrice),
          countInStock: Number(values.productStock),
          rating: Number(values.productRating),
          description: values.productDesc,
          ram: values.productRam,
          storage: values.productStorage,
        },
        {
          onSuccess: () => {
            reset();
            setUrl("");
            setUrls([]);
            setCombinedImages([]);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <DashboardHeading>Create Products</DashboardHeading>
      <form className="mt-10" onSubmit={handleSubmit(handleAddProducts)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10 gap-y-16">
          <InputContaint>
            <InputForm
              control={control}
              placeholder="Enter your name"
              name="productName"
            />
          </InputContaint>
          <InputContaint>
            <DropdownOption
              itemlist={categories}
              control={control}
              name="productCategory"
              label="Category"
            />
          </InputContaint>
          <InputContaint>
            <DropdownOption
              itemlist={brands}
              control={control}
              name="productBrand"
              label="Brand"
            />
          </InputContaint>
          <div className="flex items-start justify-between">
            <DropdownSelect
              options={ramOptions}
              control={control}
              name="productRam"
              label="RAM"
            />
            <DropdownSelect
              options={storageOptions}
              control={control}
              name="productStorage"
              label="Storage"
            />
          </div>
          {/* Upload images */}
          <InputContaint>
            <ImageUpload
              image={combinedImages}
              onClick={handleDeleteImage}
              onchange={(e) => handleSelectImage(e)}
            />
          </InputContaint>
          {/* Upload URLs */}
          <InputContaint>
            <InputForm
              type="url"
              onClick={handleAddUrl}
              name="productUrl"
              control={control}
              value={url}
              onChange={handleValueChange}
              placeholder="Paste the URL images"
              displayButton={true}
            />
            <ol className="flex flex-col max-h-[550px] overflow-y-auto gap-3 p-5 bg-white border rounded-md border-dark border-opacity-20">
              {urls.map((url) => (
                <li
                  title={url}
                  key={v4()}
                  className="relative flex items-center justify-between p-3 overflow-hidden rounded-lg group hover:bg-gray hover:bg-opacity-5"
                >
                  {url}
                  <span
                    onClick={() => handleRemoveUrl(url)}
                    className="flex items-center justify-center absolute bg-dark bg-opacity-10 right-3 to-50% invisible w-6 h-6 rounded-full select-none group-hover:visible group-hover:select-auto hover:bg-gray hover:bg-opacity-50"
                  >
                    <FiMinus />
                  </span>
                </li>
              ))}
            </ol>
          </InputContaint>
          <InputContaint>
            <InputForm
              name="productPrice"
              type="number"
              control={control}
              placeholder="Enter number of price"
            />
          </InputContaint>
          <InputContaint>
            <InputForm
              type="number"
              control={control}
              placeholder="Enter your stock"
              name="productStock"
            />
          </InputContaint>
          <InputContaint>
            <InputForm
              min="0"
              max="5"
              type="number"
              control={control}
              placeholder="Enter your rating (0-5)"
              name="productRating"
            />
          </InputContaint>
        </div>
        {/* Description */}
        <Controller
          name="productDesc"
          control={control}
          render={({ field }) => (
            <Description value={field.value} onChange={field.onChange} />
          )}
        />
        <div className="flex items-center justify-center w-full mx-auto mt-20">
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddProducts;
