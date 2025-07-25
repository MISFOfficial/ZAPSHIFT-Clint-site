import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';

const Login = () => {
    const { signIn, google } = useAuth()
    const [error, setError] = useState()
    const navigate = useNavigate()
    const location=useLocation()

    const axiosInstance = useAxios()

    const from=location?.state || '/'

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data)
        setError(null)
        signIn(data.email, data.password)
            .then(r => {
                console.log(r)
                navigate(from)
            })
            .catch(e => {
                console.log(e)
                setError('Invalid email or password')
            })
    }

    const handlegoogle = () => {
        google()
            .then(async (r) => {
                console.log(r)
                const user = r.user
                // console.log(user)
                const userInfo = {
                    name: user?.displayName,
                    photoURL: user?.photoURL,
                    email: user?.email,
                    role: 'user',
                    create_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }

                const result = await axiosInstance.post('/users', userInfo)
                console.log(result)
                navigate(from)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="flex-col">
            <h1 className='text-2xl font-bold'>Welcome ProFast</h1>
            <div className="border border-gray-300 p-5 w-100 mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset full">
                    <label className="label">Email</label>
                    <input
                        {...register('email', {
                            required: true,

                        })}
                        type="email" className="input w-full" placeholder="Email" />

                    <label className="label">Password</label>
                    <input
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                        type="password" className="input w-full" placeholder="Password" />

                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 charecter or longer</p>}
                    {error && <p className='text-red-600'>{error}</p>}

                    <div><a className="link link-hover">Forgot password?</a>
                    </div>
                    <button type='onSubmit' className="btn btn-neutral mt-4">Login</button>
                    <button onClick={handlegoogle} type='button' className="btn btn-neutral mt-4">Google</button>
                    <div>
                        <a className="link link-hover">Dont't have an account ?
                            <Link to='/register' className='text-blue-500 underline'> Register</Link>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;