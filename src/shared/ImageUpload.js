import Button from './Button';

import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = props => {
  const [file, setFile] = useState(false);
  const [imagesValue, setImagesValue] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    let allImages = images
    fileReader.onload = () => {
      if (props.request === 'items') {
        allImages.push(fileReader.result)
        setImages(allImages);
      } else {
        allImages = [fileReader.result]
        setImages(allImages);
      }
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, images]);

  const pickedHandler = event => {
    let pickedFile;
    let newImagesValue
    let fileIsValid = isValid;
    setImagesValue([
      ...imagesValue,
      event.target.files[0]
    ]);

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      newImagesValue = [
        ...imagesValue,
        pickedFile
      ]
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, newImagesValue, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const deleteImage = (e) => {
    setSelectedId(e.target.id)
    const newImages = images
    const newImagesValue = imagesValue
    if (newImages.length > 0) {
      newImages.splice(e.target.id, 1);
      newImagesValue.splice(e.target.id, 1);
      setImages(newImages)
      setImagesValue(newImagesValue)
      setSelectedId(null)
    }
    let fileIsValid = isValid;
    if (newImagesValue.length > 1) {
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, newImagesValue, fileIsValid);
  };

  const imageArea = images.map((i, id) => {
    return (<div key={id}>
      <img src={i} alt="Preview" id={id} onClick={deleteImage}
        style={{ cursor: 'pointer' }} />
    </div>
    )
  })

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />

      <div className={`image-upload ${props.center && 'center'}`}>

        <div className="image-upload__preview">
          {images.length > 0 && imageArea}
          {!images.length > 0 && <p>Please pick an image.</p>}

        </div>
        <Button type="button" onClick={pickImageHandler} size="small" inverse={true}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

