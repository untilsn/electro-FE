import React, { Fragment, useEffect, useState } from "react";
import InputContaint from "../../components/input/InputContaint";
import InputForm from "../../components/input/InputForm";
import { Option, Radio, Select } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import ImageUpload from "../../components/ImageUpload";
import DashboardTitle from "../../modules/dashboard/DashboardTitle";
import { FiMinus } from "react-icons/fi";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFirebaseImage } from "../../hooks/useFirebaseImage";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfigure";
import Description from "../../components/quill/Description";
import { useSearchParams } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutation";
import { getDetailsProduct, updateProduct } from "../../service/productService";

const productStatus = ["approved", "pending", "reject"];

const DashboardUpdateProduct = () => {
  const [idProduct] = useSearchParams();
  const getIdProduct = idProduct.get("id");
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [comment, setComment] = useState("");

  const users = useSelector((state) => state.user);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  const { control, setValue, getValues, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: "",
  });

  const handleSelectCategory = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleStatus = (status) => {
    setSelectStatus(status);
  };

  const { image, handleSelectImage, handleRemoveImage } = useFirebaseImage(
    setValue,
    getValues
  );

  const handleAddUrl = () => {
    if (urls.length >= 5) {
      toast.error("Only 5 images or less");
      return;
    }
    if (urls.some((item) => item === url)) {
      setUrl("");
      return;
    }
    if (url.trim() !== "") {
      setUrls((prevUrls) => [...prevUrls, url]);
      setUrl("");
    }
  };

  const handleValueChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRemoveUrl = (urlItem) => {
    const newUrls = urls.filter((url) => url !== urlItem);
    setUrls(newUrls);
  };

  const handleDeleteImage = (url) => {
    // Implement delete image functionality
  };

  const combinedImages = [...image, ...urls];

  const handleUpdatedProduct = (values) => {
    mutationUpdateProduct.mutate({
      id: getIdProduct,
      name: values.title,
      image: combinedImages,
      type: values.type,
      price: Number(values.price),
      countInStock: Number(values.stock),
      rating: Number(values.rating),
      description: comment,
      access_token: users.access_token,
    });
  };

  const mutation = useMutationHook(async (id) => {
    const result = await getDetailsProduct(id);
    reset({
      title: result.data.name || "",
      price: result.data.price || "",
      stock: result.data.countInStock || "",
      type: result.data.type || "",
      rating: result.data.rating || "",
    });

    setUrls(result.data.image || []);
    setComment(result.data.description || "");
    return result.data;
  });

  useEffect(() => {
    mutation.mutate(getIdProduct);
  }, [getIdProduct]);

  const mutationUpdateProduct = useMutationHook((value) => {
    const { id, access_token, ...rest } = value;
    const result = updateProduct(id, access_token, rest);
    return result;
  });

  return (
    <Fragment>
      <DashboardTitle>Products (Update)</DashboardTitle>
      <form className="mt-10" onSubmit={handleSubmit(handleUpdatedProduct)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10 gap-y-16">
          <InputContaint>
            <InputForm
              control={control}
              placeholder="Enter your title"
              name="title"
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <InputForm
              control={control}
              placeholder="Enter your type of product"
              name="type"
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <ImageUpload
              image={combinedImages}
              onClick={handleDeleteImage}
              onchange={(e) => handleSelectImage(e)}
            ></ImageUpload>
          </InputContaint>
          <InputContaint>
            <InputForm
              type="url"
              onClick={handleAddUrl}
              name="url"
              control={control}
              value={url}
              onChange={handleValueChange}
              placeholder="Paste the URL images"
              displayButton={true}
            ></InputForm>
            <ol
              type="1"
              start="1"
              className="flex flex-col max-h-[550px] overflow-y-auto gap-3 p-5 bg-white border rounded-md border-dark border-opacity-20"
            >
              {urls.map((url, index) => (
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
              name="price"
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
              name="stock"
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <InputForm
              min="0"
              max="5"
              type="number"
              control={control}
              placeholder="Enter your rating (0-5)"
              name="rating"
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <div className="flex items-center gap-x-5">
              {productStatus.map((sta) => (
                <Radio
                  key={v4()}
                  name="status"
                  label={sta}
                  onChange={() => handleStatus(sta)}
                />
              ))}
            </div>
          </InputContaint>
        </div>
        <Description comment={comment} setComment={setComment}></Description>
        <div className="flex items-center justify-center w-full mx-auto mt-20">
          <Button type="submit">Update Product</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default DashboardUpdateProduct;
