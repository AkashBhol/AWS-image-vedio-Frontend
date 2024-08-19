import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomInput from "../Validation/CustomInput";
import DropzoneComponent from "../ImageUploader/DropzoneComponent";
import axios from "axios";


const EditUser = (props) => {
    const navigate = useNavigate();
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

    //getSingleRecoords
    useEffect(() => {
        getSingleRecoords();
    }, [])

    const getSingleRecoords = () => {
        axios.get("http://localhost:8083/get/user?id=1").then((res) => {
            setPayload(res?.data);
            setThumbnailImageUrl(res?.data?.imageUrl)
        })
    }

    const handleSubmit = () => {
        debugger
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('name', payload.name);
        formData.append('gender', payload.gender);
        formData.append('id', 1);

        // const request = {
        //     ...payload,
        //     formData
        // }
        axios.put("http://localhost:8083/update", formData).then((res) => {
            navigate("/")
        })
    }
    return (
        <>
            <Grid container spacing={2} px={2} pt={10}>
                <CustomInput
                    id="name"
                    required
                    label="name"
                    size="small"
                    name="name"
                    error={error.name}
                    resetError={() => resetError("name")}
                    value={payload.name}
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
            </Grid>
            <Grid>
                <Button onClick={handleSubmit}>EditUser</Button>
            </Grid>
        </>
    )
}
export default EditUser;