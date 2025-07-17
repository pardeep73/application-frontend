import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()


    const getdata = (e) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }

    const handleform = async (e) => {
        try {
            e.preventDefault();
            
            if(data.email === "" || data.password === ''){
                return alert('validation error')
            }

            const result = await axios.post(`${BaseUrl}/api/user/login`, data, { withCredentials: true })

            if (!result) {
                alert('something went wrong')
                console.log(result)
            }
            else {
                const user = result.data

                if (user.success === true) {
                    alert(user.message)
                    navigate('/message')
                }
                else {
                    alert(user.message)
                    console.log(user)
                }
            }

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center min-h-screen'>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl text-black font-bold mb-6 text-center">Login to Your Account</h2>
                <form onSubmit={handleform} className="space-y-5 text-start">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={getdata}
                            name="email"
                            required=""
                            className="w-full mt-1 text-black px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={getdata}
                            name="password"
                            required=""
                            className="w-full mt-1 px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <Link to="/" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default Login