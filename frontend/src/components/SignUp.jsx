import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../constant/constantAPI';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/slice/userSlice';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName , setName] = useState('')

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.userData.isLoading)


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    try {
      const userRegister = {fullName, email, password}
      const res = await axios.post(`${API}/register` , userRegister , {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      if(res.data.success){
        toast.success(res.data.message)
      }
      dispatch(setUser(res.data.user))
      navigate("/")

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally{
      dispatch(setLoading(false))
    }
  }
  

  return (
    <div className="h-screen bg-black bg-opacity-75 flex justify-center items-center" style={{backgroundImage: 'url("https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg")'}}>

      <div className="w-full max-w-md px-5 py-10 bg-black bg-opacity-80 rounded">
        <h1 className="text-white text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              autoComplete="text"
              placeholder="fullName"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Loading...." : "Sign UP"}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:text-white">Forgot password?</a>
          </div>
          <div className="mt-6 text-center flex justify-center">
            <p className='text-gray-400'>Already Subscribed to Netflix?</p>
            <p className='ml-1 font-bold cursor-pointer' onClick={() => navigate("/login")}>Sign In</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
