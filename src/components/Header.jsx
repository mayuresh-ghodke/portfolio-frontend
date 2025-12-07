import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import {handleLogout} from "../services/admin-service.js";

function Header() {

    const navigate = useNavigate();
    
    const handleLogoutbtn = () => {

        if(handleLogout()){
            navigate("/login");
        }
        else{
            navigate("/logout");
        }; 
    }

    return (
        <div className="ml-0 bg-light">
            <div className="row p-3 justify-content-between align-items-center">
                <div className="col-md-6">
                    <h3 className="text-dark">MAYURESHGHODKE.DEV</h3>
                </div>
                <div className="col-md-3 text-md-end">
                    <button className="btn btn-danger" onClick={handleLogoutbtn}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Header;


