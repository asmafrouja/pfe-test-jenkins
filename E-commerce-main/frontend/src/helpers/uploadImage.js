const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  try {
    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!dataResponse.ok) {
      throw new Error(`Error: ${dataResponse.status} ${dataResponse.statusText}`);
    }

    const data = await dataResponse.json();
    console.log("Cloudinary Response:", data); // Debugging line
    return data;
  } catch (error) {
    console.error("Image upload failed:", error);
  }
};

export default uploadImage;
