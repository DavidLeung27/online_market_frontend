import React, { useEffect, useRef, useState } from 'react'
import CustomForm from '../../component/CustomForm';
import ImageUploader from './ImageUploader';
import { BackEnd_API_URL, validInput, validInputMessage } from '../global/constants';

function ProductUploadPage() {

  const imageFuncRef = useRef();

  const [product, setProduct] = useState({
    productName: "default",
    price: 0,
    linkedCategory: [{"category_id": 1, "category": "test"}]
  });

  const [categoryArray, setCategoryArray] = useState([]);
    
  useEffect(() => {
    fetch(BackEnd_API_URL + "/category", {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setCategoryArray(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const submitForm = () => {

    if (!imageFuncRef.current) {
      console.log("Image Hnadler Error!");
      return;
    }

    imageFuncRef.current.getCroppedImg()
    .then((croppedImage) => {
      if(croppedImage.size > 10*1024*1024) {
        return;
      }

      const formData = new FormData();
      formData.append('image', croppedImage);
      formData.append('product', JSON.stringify(product));


      fetch(BackEnd_API_URL + "/addProduct", {
        method: 'POST',
        responseType: "cors",
        body: formData
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
      }).catch(() => {
        console.log("Upload product fail");
      })
    });
    
  }

  return (
    <div className="page">

      {/* The CustomForm tag will automatically add the onChange event to each input */}
      <CustomForm setElement = {setProduct} onEnterKeyDown = {submitForm}>
        <ImageUploader funcRef={imageFuncRef}/>


        <form className='form' onSubmit={submitForm}>
        {/* <input type='file' required/> */}

          <label htmlFor='productName'>Product Name:</label>
          <input 
            id='productName' 
            type='text' 
            name='productName' 
            pattern={validInput.charAndNum}
            title={validInputMessage.charAndNum}
            required
          />

          <label htmlFor='price'>Price:</label>
          <input 
            id='price' 
            type='number' 
            name='price'
            pattern={validInput.numOnly}
            title={validInputMessage.numOnly}
            required
          />

          <div id='linkedCategory' className='nowrap'>Category:&nbsp;</div>
          <select name='linkedCategory'>
            { categoryArray.map((item) => (
              <option key={item.category_id} value={JSON.stringify([{ category_id: item.category_id, category: item.category }])}>
                {item.category}
              </option>
            ))}
          </select>

          <input type='submit' className='btnInput' value='Upload'/>

        </form>
      </CustomForm>

    </div>
  )
}

export default ProductUploadPage