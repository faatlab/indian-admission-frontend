import axios from "axios";
import { frappe_url } from "../constants/globalConstants";

export const authenticate = async () => {
   const jwtToken = localStorage.getItem("authToken");
   const response = await axios.post(
      `${frappe_url}/api/method/indianadmission.api.student_auth.authenticate_request`,
      null,
      {
         headers: {
            "JWTAuthentication": `JWT ${jwtToken}`,
         },
      }
   );   
   return response.data.message;
};