import { Button, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const viewImage = () => {
        debugger
        navigate("/displayimage")
    }

    const viewVideo = () => {
        navigate("/displayvedio")
    }

    const craeteUser=()=>{
        navigate("/user")
    }

    const upadetUser=()=>{
        navigate("/editUser")
    }
    return (
        <Grid container>This is home page
            <Grid item xs={12}>
                <Button onClick={viewImage}>Click Fro Image</Button>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={viewVideo}>Click for Vedio</Button>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={craeteUser}>Click for createuser</Button>
            </Grid>
            <Grid item xs={12}>
            <Button onClick={upadetUser}>Click for Editeuser</Button>
        </Grid>
        </Grid>
    )
}
export default Home;