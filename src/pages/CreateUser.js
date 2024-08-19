import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import CustomInput from "../Validation/CustomInput";
import axios from "axios";
import DropzoneComponent from "../ImageUploader/DropzoneComponent";
import { useNavigate } from "react-router-dom";


const CreateUser = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData1, setFormData1] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState(null);
  const [payload, setPayload] = useState({
    "name": "",
    "gender": "",
    "imageUrl": ""
  })

  const [error, setError] = useState({
    "name": "",
    "gender": "",
    "imageUrl": ""
  })

  const handleChange = (event) => {
    const name = event.target.name;
    setPayload({
      ...payload,
      [name]: event.target.value,
    });

    setError({
      ...error,
      [name]: ""
    });
  };

  const resetError = (fieldName) => {
    setError((prevError) => ({
      ...prevError,
      [fieldName]: ""
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      alert(`File selected: ${file.name}`);

    } else {
      alert("No file selected");
    }
  };

  const handleImageUploadThumbnail = (excelData) => {

    const file = excelData[0];
    if (!file) {
      // setMessage4();""
      alert("not")
    } else {
      // setMessage4('');
      setImageFile(excelData[0]);
      setThumbnailImage(excelData[0].name);
      setThumbnailImageUrl(URL.createObjectURL(excelData[0]));
      props.getExcelFile(excelData[0]);

    }
  }

  //if you upload the image and try to get the presigned url
  {/* const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axios.post("http://localhost:8083/api/v1/s3/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // console.log(response.data)
      setImageUrl(response?.data);

    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };*/}

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('name', payload.name);
    formData.append('gender', payload.gender);
   
    const request = {
      ...payload,
      formData1
    }
    axios.post("http://localhost:8083/post", formData).then((res) => {
      navigate("/")
    })
  }
  return (
    <Grid container spacing={2} px={2} pt={10}>
      <CustomInput
        id="name"
        required
        label="name"
        size="small"
        name="name"
        error={error.name}
        resetError={() => resetError("name")}
        value={payload.content}
        handleChange={handleChange}
        inputProps={{
          maxLength: 30,
        }}
        helperText={error.content}
      >
      </CustomInput>
      <CustomInput
        id="gender"
        required
        label="gender"
        size="small"
        name="gender"
        error={error.gender}
        resetError={() => resetError("gender")}
        value={payload.gender}
        handleChange={handleChange}
        inputProps={{
          maxLength: 30,
        }}
        helperText={error.gender}
      >
      </CustomInput>
      <Grid item md={4} lg={4} xl={4} sm={12} xs={12}>
        <Typography variant="body2">
          <span > *</span>
        </Typography>
        <DropzoneComponent getExcelFile={(excelData) => handleImageUploadThumbnail(excelData)}>
          {thumbnailImageUrl ? (
            <img src={thumbnailImageUrl} alt="Thumbnail Preview" draggable="false" style={{ width: '100%', height: 'auto' }} />
          ) : (
            <Box mt={2} p={1} sx={{
              border: '2px dashed #36C96D', borderRadius: '5px',
              backgroundColor: "rgba(54, 201, 109,0.1)", display: 'flex', justifyContent: 'center',
              alignItems: 'center', flexDirection: 'column', height: '250px'
            }} >
              <Typography sx={{ fontSize: "14px", textAlign: 'center', opacity: '0.8' }}>
                {thumbnailImage !== null ? (
                  thumbnailImage
                ) : "Drag and Drop image Or upload Image"}
              </Typography>
            </Box>
          )}

        </DropzoneComponent>
      </Grid>

      <Grid>
        <Button onClick={handleSubmit}>save User</Button>
      </Grid>
    </Grid>
  )
}
export default CreateUser;