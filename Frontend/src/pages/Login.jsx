import React , {useContext, useState} from "react";
import { BACKEND_URL } from "../utils/Constants";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/user/login` , formData);
      if(response.status==200){
        toast.success('User Logged In')
        setIsLoggedIn(true);
        localStorage.setItem("user",JSON.stringify(response.data));
        navigate("/")
      }else if(response.status==400){
        toast.error(response.data);
      }
    } catch (error) {
        toast.error("Loggin failed.")
        console.log("Loggin failed : "+error)
    }
  };

  return (
    <div className="pt-[12vh] flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00B86C]">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B86C]"
        />

        <button
          type="submit"
          className="w-full bg-[#00B86C] text-white p-3 rounded-md hover:bg-[#009e5c] transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
