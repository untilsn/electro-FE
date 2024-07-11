import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";

export function useFirebaseImage(setValue, getValues) {
  const [imageName, setImageName] = useState([]);

  if (!setValue) return;
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState([]);
  if (image?.length > 5) return;
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progressBar + "% done");
        setProgress(progressBar);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage((preUrl) => [...preUrl, downloadURL]);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setValue("image_name", file.name);
    setImageName([...imageName, file.name]);
    if (!file) return;
    handleUploadImage(file);
    setProgress(0);
  };

  const handleRemoveImage = (imageUrl) => {
    // Tìm vị trí của hình ảnh có URL tương ứng trong mảng image
    const index = image.findIndex((img) => img === imageUrl);

    // Nếu không tìm thấy hình ảnh, không thực hiện gì cả
    if (index === -1) {
      console.log("Image not found");
      return;
    }

    // Loại bỏ hình ảnh khỏi mảng image
    const updatedImages = [...image];
    updatedImages.splice(index, 1);
    setImage(updatedImages);

    // Loại bỏ tên hình ảnh khỏi mảng imageName
    const updatedImageNames = [...imageName];
    const removedImageName = updatedImageNames.splice(index, 1)[0];
    setImageName(updatedImageNames);

    // Xóa hình ảnh từ lưu trữ Firebase
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + removedImageName);
    deleteObject(imageRef)
      .then(() => {
        console.log("Success delete");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Cannot delete image");
      });
  };

  const handleResetUpload = () => {
    setImage([]);
    setProgress(0);
  };

  return {
    image,
    progress,
    handleSelectImage,
    handleRemoveImage,
    handleResetUpload,
  };
}
