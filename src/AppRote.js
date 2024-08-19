import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DisplayImage from "./pages/DisplayImage";
import DisplayVedio from "./pages/DisplayVedio";
import Demo from "./pages/Demo";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

const AppRote = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/demo" element={<Demo />}></Route>
                <Route path="/displayimage" element={<DisplayImage />}></Route>
                <Route path="/displayVedio" element={<DisplayVedio />}></Route>
                <Route path="/user" element={<CreateUser />}></Route>
                <Route path="/editUser" element={<EditUser />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRote;