import { signOut } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const SignOut: FC = () => {
     const { dispatch } = useAuth();
     const navigate = useNavigate(); 
     const handleLogout = async () => {
          try{
               await AuthService.logout();
               dispatch(signOut());
               navigate("/auth/signin");
          }catch (error){
               console.log(error);
          }
     }
     return(
          <div className="dark:bg-orange-500 rounded-lg">
               <button 
                    onClick={handleLogout}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
               >
                    Logout
               </button>
          </div>
     )
}
export default SignOut;
