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

const productStatus = ["approved", "pedding", "reject"];
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

  //todo handle images
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
    if (urls.length > 5) return toast.error("only 5 images or less");
    if (urls.some((item) => item === url)) {
      setUrl("");
      return;
    }
    if (url.trim() !== "") {
      setUrls((prevUrls) => [...prevUrls, url]);
      setUrl("");
    }
  };
  const handleRemoveUrl = (urlItem, index) => {
    const newUrls = urls.filter((url) => url !== urlItem);
    setUrls(newUrls);
  };

  const handleValueChange = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    setCombinedImages([...image, ...urls]);
  }, [image, urls]);

  //todo add product
  const mutation = useMutationHook((data) => {
    console.log(data);
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
            setComment("");
            setUrl("");
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

      <form className="mt-10 " onSubmit={handleSubmit(handleAddProducts)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10 gap-y-16">
          <InputContaint>
            <InputForm
              control={control}
              placeholder="Enter your name"
              name="productName"
            ></InputForm>
          </InputContaint>

          <InputContaint>
            <InputForm
              control={control}
              placeholder="Enter your type of product"
              name="productBrand"
            ></InputForm>
          </InputContaint>
          <DropdownSelect
            options={ramOptions}
            control={control}
            name="productRam"
            label="RAM"
          ></DropdownSelect>
          <DropdownSelect
            options={storageOptions}
            control={control}
            name="productStorage"
            label="Storage"
          ></DropdownSelect>
          {/* //todo upload images */}
          <InputContaint>
            <ImageUpload
              image={combinedImages}
              onClick={handleDeleteImage}
              onchange={(e) => handleSelectImage(e)}
            ></ImageUpload>
          </InputContaint>
          {/* //todo upload urls */}
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
            ></InputForm>
            <ol
              type="1"
              start="1"
              className="flex flex-col max-h-[550px] overflow-y-auto gap-3 p-5 bg-white border rounded-md border-dark border-opacity-20 "
            >
              {urls.map((url, index) => (
                <li
                  title={url}
                  key={v4()}
                  className="relative flex items-center justify-between p-3 overflow-hidden rounded-lg group hover:bg-gray hover:bg-opacity-5"
                >
                  {url}
                  <span
                    onClick={() => handleRemoveUrl(url, index)}
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
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <InputForm
              type="number"
              control={control}
              placeholder="Enter your stock"
              name="productStock"
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <InputForm
              min="0"
              max="5"
              type="number"
              control={control}
              placeholder="Enter your rating (0-5)"
              name="productRating"
            ></InputForm>
          </InputContaint>
        </div>
        {/* description */}
        <Controller
          name="productDesc"
          control={control}
          render={({ field }) => (
            <Description value={field.value} onChange={field.onChange} />
          )}
        />
        <div className="flex items-center justify-center w-full mx-auto mt-20">
          <Button
            type="submit"
            // $isloading={loading}
            // disabled={loading}
          >
            Add Product
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddProducts;
