import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'

const Register = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()


    const getdata = (e) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }

    const handleform = async(e) => {
        try {
            e.preventDefault();

            const result = await axios.post(`${BaseUrl}/api/user/register`,data)
            
            if(!result){
                alert('something went wrong')
                console.log(result)
            }
            else{
                const user = result.data

                if(user.success === true){
                    alert(user.message)
                    navigate('/login')
                }
                else{
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
        <div className='flex h-[100vh] w-[100vw] items-center justify-center min-h-screen'>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Create an Account</h2>
                <form onSubmit={handleform} className="space-y-5 text-start">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required=""
                            onChange={getdata}
                            className="w-full mt-1 px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
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
                            name="email"
                            onChange={getdata}
                            required=""
                            className="w-full mt-1 px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            name="password"
                            onChange={getdata}
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
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>


    )
}

export default Register