import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function ProtectedRoute({ children }) {
  const { username } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      // User is not logged in, navigate to the login page
      navigate("/login");
    }
  }, [username, navigate]);

  return children;
}

export default ProtectedRoute;
