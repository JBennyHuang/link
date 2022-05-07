import axios from "axios";

import { useRef } from "react";
import { useAuthentication } from "../context/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const authContext = useAuthentication();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      console.log(`Username: ${username}, Password: ${password}`);
      authContext
        .register(username, password)
        .then(() => {
          // redirect main page
          navigate("/login");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 409") {
            // change ui to let user know
            console.log("username taken");
          } else {
            console.log("don't know");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="text-center">
      <div className="bg-zinc-800 h-screen text-white flex flex-col items-center justify-center text-[24px]">
        <div className="flex flex-col items-center border rounded-lg py-[10rem] px-[3rem]">
          <div className="flex mb-10">
            <p className="font-bold text-[40px]">asian</p>
            <p className="font-bold text-[40px] text-amber-300">convo</p>
          </div>
          <form
            action=""
            className="flex flex-col text-[20px]"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-10">Become asian !</h1>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-lg bg-zinc-900 p-2 focus:outline focus:outline-amber-400 mb-10"
              placeholder="Username"
              ref={usernameRef}
            />
            <input
              type="password"
              className="border-2 border-gray-400 rounded-lg bg-zinc-900 p-2 focus:outline focus:outline-amber-400 mb-10"
              placeholder="Password"
              ref={passwordRef}
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-amber-400 w-full text-amber-100 rounded-lg py-1 px-3"
              >
                Register
              </button>
            </div>
            <p className="text-amber-300 mr-auto mt-5">
              <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
