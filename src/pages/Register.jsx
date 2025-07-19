import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'
import { Loader } from './Loader'

const Register = () => {

    const [data, setData] = useState({
        image: 'No Image'
    })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const getdata = (e) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }

    /*  const handleform = (e) => {
         e.preventDefault()
         const formdata = new FormData(e.target)
         const image = formdata.get('image')
         const name = formdata.get('name')
         console.log('image Data', image,name)
     } */

    const handleform = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            const formdata = new FormData(e.target)
            const result = await axios.post(`${BaseUrl}/api/user/register`, formdata)

            if (!result) {
                setTimeout(() => {
                    setLoading(false)
                    alert('something went wrong')
                    console.log(result)
                }, 1500);
            }
            else {
                const user = result.data

                if (user.success === true) {
                    setTimeout(() => {
                        setLoading(false)
                        alert(user.message)
                        navigate('/login')
                    }, 1500);
                }
                else {
                    setTimeout(() => {
                        setLoading(false)
                        alert(user.message)
                        console.log(user)
                    }, 1500);
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
                            required=""
                            className="w-full mt-1 px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <label
                            htmlFor="image"
                            className="block text-sm p-3 my-1 border border-gray-300 rounded-xl font-medium text-gray-700"
                        >
                            {data.image}
                        </label>
                        <input
                            onChange={getdata}
                            className='hidden'
                            id='image'
                            name='image'
                            type="file"
                            accept="image/*"

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