import React, { useState } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

const DisplayVedio = () => {
    const [payload, setPayload] = useState([]);

    const findVideo = () => {
        axios.get("http://localhost:8083/api/v1/s3/get?type=video")
            .then((res) => {
                setPayload(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the videos!", error);
            });
    };

    return (
        <Grid container spacing={2} style={{ padding: '16px' }}>
            <Grid item xs={12}>
                <Button onClick={findVideo} variant="contained" color="primary">
                    Fetch Videos
                </Button>
            </Grid>
            {payload.length > 0 && (
                <Grid container spacing={2}>
                    {payload.map((url, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper style={{ padding: '16px', textAlign: 'center' }}>
                                <video
                                    src={url}
                                    controls
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        height: 'auto',
                                    }}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
}

export default DisplayVedio;
