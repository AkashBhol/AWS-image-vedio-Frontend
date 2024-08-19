import React, { useState } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from "@trendyol-js/react-carousel";
import { useNavigate } from 'react-router-dom';
const DisplayImage = () => {
    const [payload, setPayload] = useState([]);
    const navigate = useNavigate();
    const findImage = () => {
        axios.get("http://localhost:8083/api/v1/s3/get?type=image")
            .then((res) => {
                setPayload(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the images!", error);
            });
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <Button onClick={findImage} variant="contained" color="primary">
                    Fetch Images
                </Button>
            </Grid>
            {payload.length > 0 && (
                <Grid item xs={12} sm={12}>
                    {/*   <Slider {...settings}>*/}
                    <Carousel dynamic={true} leftArrow={false}
                        show={4}
                        slide={3}
                        swiping={true}
                        pageCount={5}
                    >
                        {payload.map((url, index) => (
                            <div key={index}>
                                <img
                                    src={url}
                                    alt={`Image ${index}`}
                                    style={{
                                        width: '80%',
                                        height: 'auto',
                                        maxWidth: '600px',
                                        display: 'block',
                                        margin: '0 auto',
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                    {/*  </Slider>*/}
                </Grid>
            )}
            
        </Grid>
    );
}

export default DisplayImage;
