import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'
import { Loader } from './Loader'
import Axios from '../utils/Axios'

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const getdata = (e) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }

    const handleform = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();

            if (data.email === "" || data.password === '') {

                setTimeout(() => {
                    setLoading(false)
                    return alert('validation error')
                }, 1500);

            }

           /*  const result = await axios.post(`${BaseUrl}/api/user/login`, data, { withCredentials: true }) */

            const options = { withCredentials: true }
            const result = await Axios('api/user/login',options,data)

            console.log('result',result)

            if (!result) {
                console.log(result)
                setTimeout(() => {
                    setLoading(false)
                    alert('something went wrong')
                }, 1500);
            }
            else {
                const user = result.data

                if (user.success === true) {
                    setTimeout(() => {
                        setLoading(false)
                        alert(user.message)
                        navigate('/message')
                    }, 1500);
                }
                else {
                    setTimeout(() => {
                        setLoading(false)
                        alert(user.message)
                    }, 1500);
                    console.log(user)
                }
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            throw error;
        }
    }


    if (loading) {
        return (
            <>
                <Loader />
            </>)
    }

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center min-h-screen'>
            <div className="bg-gray-200 p-8 sm:rounded-2xl shadow-lg w-full h-full  flex flex-col justify-center sm:h-auto sm:max-w-md">
                <div className='mb-4'>
                    {/* <h2 className="text-2xl text-black font-bold text-center">Login to Your Account</h2> */}
                    <p className='text-gray-600 py-1 text-center'>Secure login. Instant messaging and Seamless experience</p>
                </div>
                <form onSubmit={handleform} className="space-y-5 text-start">
                    {/* Email */}
                    <div>
                        {/* <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={getdata}
                            placeholder='Email Address'
                            required=""
                            className="w-full mt-1 px-2 py-3 sm:py-2  border-b text-gray-500 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        {/*  <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label> */}
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            onChange={getdata}
                            name="password"
                            required=""
                            className="w-full mt-1 px-2 py-3 sm:py-2  border-b text-gray-500 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/" className="text-blue-500 mx-1 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default Login