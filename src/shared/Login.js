import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Logo from '../assets/logo.jpeg';

const Login = () => {
  const CurrentYear = new Date().getFullYear();

  return (
    <div className="container">
      <div className="inner_container">
        <div className="left_conainer">
          <div className="logo_container">
            <img src={Logo} className="object-cover" alt="" />
          </div>
        </div>
        <div className="right_container bg-white shadow-xl border-gray-900 rounded-2xl">
          <div className="form_Container">
            <h2 className="text-center text-3xl font-extrabold pb-12">Login</h2>
            <form>
              {/* USER ID START HERE */}
              <div className="mb-8">
                <label htmlFor="user_id" className="sr-only">
                  User ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="user_id"
                    name="user_id"
                    placeholder="User ID"
                    className="border-2 border-gray-300 rounded-md p-3 pl-12 focus:outline-none focus:border-blue-500 font-medium placeholder-gray-900"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              {/* USER ID START HERE */}

              {/* PASSWORD ID START HERE */}
              <div className="mb-12">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="border-2 border-gray-300 rounded-md p-3 pl-12 focus:outline-none focus:border-blue-500 font-medium placeholder-gray-900"
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              {/* PASSWORD ID END HERE */}


              {/* FORGOT PASSWORD */}
              <div className="mb-4 flex justify-end">
                <p className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="mr-2 text-gray-800"
                  />
                  <span className="text-xl">Forgot Password?</span>
                </p>
              </div>

              <div className="text-center login_btn_container px-6">
                <button
                  type="submit"
                  className="text-white rounded-full py-3 w-full hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                >
                  LOGIN
                </button>
              </div>


            </form>
          </div>
        </div>
      </div>

     <div className="text-center copyright_container py-2">
      <p className="border-black inline-block">
        © {CurrentYear} Designed and Developed By <a href="/">iTechBuddy</a>
      </p>
    </div>

      
    </div>
  );
};

export default Login;
