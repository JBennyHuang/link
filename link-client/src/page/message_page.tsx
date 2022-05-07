import { useAuthentication } from "../context/AuthenticationContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const MessagePage = () => {
  const authContext = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    if (authContext.authenticated === false) {
      navigate("/login");
    }
  }, [authContext.authenticated]);

  return (
    <div className="bg-zinc-800 h-screen text-white flex flex-col items-center justify-center text-[24px]">
      Hi Mother fucker
      <Link to={"/login"}>
        <button onClick={authContext.logout}>Logout</button>
      </Link>
    </div>
  );
};

export default MessagePage;
