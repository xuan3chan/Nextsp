import React ,{Fragment} from 'react'

const images = [

]


const ProductsMenu = () => {
  // hàm lưu hình vào thư mục images có đường dẫn ./image và tên hình được lưu vào images.json
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    fetch("http://localhost:3101/api/products/add", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        images.push(data.filename);
        console.log(images);
      })
      .catch((err) => console.log(err));
  }
  return (
    <form encType='multipart/form-data'>
      <input type='file' name='image' onChange={handleUploadImage} />
      <button type='submit'>Upload</button>
    </form>
  )
}

export default ProductsMenu;