import React, { useEffect, useRef, useState } from 'react'
import CustomForm from '../../component/CustomForm';
import ImageUploader from './ImageUploader';
import { validInput, validInputMessage } from '../../global/constants';
import styles from './ProductUploadPage.module.css'

function ProductUploadPage() {

  const BackEnd_API = process.env.REACT_APP_BACKEND_API;

  const imageFuncRef = useRef();

  const [product, setProduct] = useState({
    productName: "default",
    price: 0,
    linkedCategory: [{"category_id": 1, "category": "test"}]
  });

  const [categoryArray, setCategoryArray] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
    
  useEffect(() => {
    fetch(BackEnd_API + "/category", {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setCategoryArray(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const submitForm = (event) => {
    event.preventDefault()

    if (!imageFuncRef.current) {
      console.log("Image Hnadler Error!");
      setMessage("Image Hnadler Error!");
      setShowMessage(1);
      return;
    }

    imageFuncRef.current.getCroppedImg()
    .then((croppedImage) => {
      if(croppedImage.size > 10*1024*1024) {
        setMessage("Image is too large");
        setShowMessage(1);
        return;
      }

      const formData = new FormData();
      formData.append('image', croppedImage);
      formData.append('product', JSON.stringify(product));


      fetch(BackEnd_API + "/addProduct", {
        method: 'POST',
        responseType: "cors",
        body: formData
      }).then((response) => {
        if(response.status !== 200) {
          throw new Error("login fail");
        }
        return response.json();
      }).then((data) => {
        console.log(data);
        setMessage(data.msg);
        setShowMessage(data.code);
      }).catch(() => {
        console.log("Upload product fail");
      })

    }).catch((msg) => {
      setMessage(msg);
      setShowMessage(1);
      console.log("Upload product fail");
    })
    
  }

  return (
    <div className="page">

      {/* The CustomForm tag will automatically add the onChange event to each input */}
      <CustomForm setElement = {setProduct} onEnterKeyDown = {submitForm}>
        <ImageUploader funcRef={imageFuncRef}/>


        <form className='form' onSubmit={submitForm}>
        {/* <input type='file' required/> */}

          <label htmlFor='productName'>Product Name:</label>
          <div className={styles.inputContainer}>
            <input 
              id='productName' 
              type='text' 
              name='productName' 
              pattern={validInput.charAndNum}
              title={validInputMessage.charAndNum}
              required
            />

          </div>

          <label htmlFor='price'>Price:</label>

          <div className={styles.inputContainer}>
            <input 
              id='price' 
              type='number' 
              name='price'
              pattern={validInput.numOnly}
              title={validInputMessage.numOnly}
              required
            />

          </div>

          <div id='linkedCategory' className='nowrap'>Category:&nbsp;</div>

          
          <select name='linkedCategory' className={styles.selectCategory}>
            { categoryArray.map((item) => (
              <option key={item.category_id} value={JSON.stringify([{ category_id: item.category_id, category: item.category }])}>
                {item.category}
              </option>
            ))}
          </select>

          <input type='submit' className={styles.uploadBtn} value='Upload'/>
        </form>
          
          
          { showMessage && 
            <div>{message}</div>
          }
      </CustomForm>

    </div>
  )
}

export default ProductUploadPage