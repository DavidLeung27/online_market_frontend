import React, { useImperativeHandle, useRef, useState } from 'react'
import Cropper from 'react-easy-crop';
import styles from './ImageUploader.module.css'
import { useDropzone } from 'react-dropzone';

export default function ImageUploader({funcRef}) {

  const croppedImageWxH = {width: 150, height: 150};

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('No file chosen');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [uploaded, setUploaded] = useState(false);

  const inputRef = useRef(null);

  const UploadImgSyncToDrop = (e) => {
    onDrop(e.target.files);
  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
      setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUploaded(true);
      setImage(file);
      setImageName(file.name);
    }

  };

  const getCroppedImg = async() => {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      img.src = image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = croppedImageWxH.width;
        canvas.height = croppedImageWxH.height;
    
        ctx.drawImage(
          img,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedImageWxH.width,
          croppedImageWxH.height
        );
  
        canvas.toBlob(
          blob => {
            resolve(blob);
          },
          'image/jpg',
          1
        );
  
        img.onerror = error => {
          reject(error);
        };
      }
    })
  }

  useImperativeHandle(funcRef, () => ({
    getCroppedImg
  }))

  const acceptImageFormat = { "image/*": [".png", ".gif", ".jpeg", ".jpg"]};
  const { getRootProps: unclickableRootProps, getInputProps: unclickableInputProps } = useDropzone({accept: acceptImageFormat, onDrop, noClick: true});
  const { getRootProps: clickableRootProps, getInputProps: clickableInputProps } = useDropzone({accept: acceptImageFormat, onDrop, noClick: false});

  return (
    <div className={styles.imgUploadContainer}>
      <div className= {styles.imgInputButtonContainer}>
        <button className={styles.imgInputButton} onClick={() => inputRef.current.click()}>Choose File</button>
        <p className={styles.imgName}>{imageName}</p>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={inputRef}
          onChange={UploadImgSyncToDrop}
          required
        />
      </div>

      <div {...(uploaded ? unclickableRootProps({ className: [styles.imgUploadDropZone]}) 
      : clickableRootProps({className: [styles.imgUploadDropZone]}))}>
        {/* <input {...(uploaded ? clickableInputProps() : unclickableInputProps())} /> */}
        { uploaded ? (
        <div>
        <Cropper 
          image={image}
          crop={crop} 
          zoom={zoom} 
          aspect={1} 
          onCropChange={setCrop}
          onZoomChange={setZoom}
          showGrid={false}
          objectFit={'vertical-cover'}
          onCropComplete={(croppedArea, croppedAreaPixels) => {
          setCroppedAreaPixels(croppedAreaPixels)
          }}
        />
        </div>
        ) : <>
        <img src={process.env.PUBLIC_URL + '/img/uploadImage.png'} alt='Please upload image' draggable="false" />
        <p>Drop the file here</p>
        </>
      }
      </div>
    </div>
  )
}
