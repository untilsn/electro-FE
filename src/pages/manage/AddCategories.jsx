import React, { Fragment } from "react";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import InputForm from "../../components/input/InputForm";
import InputContaint from "../../components/input/InputContaint";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfigure";
import slugify from "slugify";
import { toast } from "react-toastify";

const AddCategories = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const handleAddCategory = async (values) => {
    if (!values) return;
    try {
      const categoryRef = collection(db, "categories");
      await addDoc(categoryRef, {
        name: values.name.toLowerCase(),
        slug:
          slugify(values.slug, { lower: true }) ||
          slugify(values.name, { lower: true }),
        createAt: serverTimestamp(),
      });
      toast.success("create category success");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <DashboardHeading>Create Category</DashboardHeading>
        <div className="grid grid-cols-2 gap-5 mt-20">
          <InputContaint>
            <InputForm
              name="name"
              control={control}
              placeholder="Enter new category name"
            ></InputForm>
          </InputContaint>
          <InputContaint>
            <InputForm
              name="slug"
              control={control}
              placeholder="Enter category of slug"
            ></InputForm>
          </InputContaint>
        </div>
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

export default AddCategories;
