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
            const name = formdata.get('name')
            const email = formdata.get('email')
            const password = formdata.get('email')
            const image = formdata.get('image')

            console.log(name,email,password,image)
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
            <div className="bg-gray-200 p-8 sm:rounded-2xl shadow-lg w-full h-full  flex flex-col justify-center sm:h-auto sm:max-w-md">
                <div className='mb-6'>
                    <h2 className="text-2xl font-bold  text-center text-black">Create an Account</h2>
                    <p className='text-gray-600 text-center'>Connect Chat Share. It all begins here.</p>
                </div>
                <form onSubmit={handleform} className="space-y-5 text-start">
                    {/* Full Name */}
                    <div>
                        {/* <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label> */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required=""
                            placeholder='Full Name'
                            className="w-full mt-1 px-2 py-3 sm:py-2  border-b text-gray-500 placeholder:text-gray-500 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
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
                            placeholder='Email Address'
                            required=""
                            className="w-full mt-1 px-2 py-3 sm:py-2  border-b text-gray-500 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        {/* <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label> */}
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            name="password"
                            required=""
                            className="w-full mt-1 px-2 py-3 sm:py-2  border-b text-gray-500 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        {/*  {<label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>} */}
                        <label
                            htmlFor="image"
                            className="block text-sm py-3.5 sm:py-2.5 px-2  my-1 border-b border-gray-300   text-gray-500"
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
                    <Link to="/login" className="text-blue-500 ml-1 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>


    )
}

export default Register