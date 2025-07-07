import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import useAxios from '../../../Hooks/useAxios';

const Register = () => {

    const {
        register, handleSubmit, formState: { errors }
    } = useForm()

    const { createUser, updateUser } = useAuth()
    // const {createUser} = use(AuthContext)

    const [parcentLoader, setParcentLoader] = useState('')
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()

    const axiosInstance = useAxios()

    const location = useLocation()
    console.log(location)

    const from = location?.state || '/'

    const onSubmit = (data) => {
        // console.log(data)
        // console.log(createUser)
        createUser(data.email, data.password)
            .then(async () => {
                // console.log(r)

                const userInfo = {
                    name: data.name,
                    photoURL: profile,
                    email: data.email,
                    role: 'user',
                    create_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }

                const userProfile = {
                    displayName: data.name,
                    photoURL: profile
                }

                const userRes = await axiosInstance.post('/users', userInfo)
                console.log(userRes.data)

                updateUser(userProfile)
                    .then(() => {
                        console.log('profile')
                        navigate(from)
                    })
                    .catch(() => {
                        console.log('upload error')
                    })
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handlePhoto = async (e) => {
        const image = e.target.files[0];
        // console.log(image)
        const formData = new FormData();
        formData.append('image', image)
        // console.log(formData)
        setParcentLoader('')
        const result = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_ImBB_key}`, formData, {
            // headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progress) => {
                const parcentage = Math.round(progress.loaded * 100)
                setParcentLoader(parcentage)
            }
        })
        // console.log(result.data.data.url)
        setProfile(result.data.data.url)

    }


    return (
        <div className="flex-col">
            <h1 className='text-2xl font-bold'>Create An Account</h1>
            <div className="border border-gray-300 p-5 w-100 mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset full">
                    <label className="label">Name</label>
                    <input
                        {...register('name', {
                            required: true,

                        })}
                        type="name" className="input w-full" placeholder="Your Name" />

                    <label className="label">Photo</label>
                    <div className='relative border border-gray-300 p-2 rounded-xl w-full'>
                        <input onChange={handlePhoto}
                            type="file" className=" w-fit p-1 rounded-2xl border" placeholder='' />
                        {parcentLoader && <p className="text-green-600 text-lg absolute top-1.5 right-2">✅</p>}
                    </div>


                    <label className="label">Email</label>
                    <input
                        {...register('email', {
                            required: true,

                        })}
                        type="email" className="input w-full" placeholder="Email" />


                    {errors.email?.type === 'required' && <p className='text-red-500'>You must fill with your email</p>}

                    <label className="label">Password</label>
                    <input
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/
                        })}
                        type="password" className="input w-full" placeholder="Password" />

                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 charecter or longer</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have a one Upper case one lower case one spacial charecter</p>}


                    <div><a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <div>
                        <a className="link link-hover">Have an account ?
                            <Link to='/login' className='text-blue-500 underline'> Log In</Link>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;