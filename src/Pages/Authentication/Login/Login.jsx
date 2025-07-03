import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {

    const {
        register, handleSubmit, formState: {errors}
    } = useForm()

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div className="flex-col">
            <h1 className='text-2xl font-bold'>Welcome ProFast</h1>
            <div className="border border-gray-300 p-5 w-100 mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset full">
                    <label className="label">Email</label>
                    <input
                        {...register('email',{
                            required:true,

                        })}
                        type="email" className="input w-full" placeholder="Email" />

                    <label className="label">Password</label>
                    <input
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                        type="password" className="input w-full" placeholder="Password" />

                        {errors.password?.type==='required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type==='minLength' && <p className='text-red-500'>Password must be 6 charecter or longer</p>}
                        {/* {errors.email?.type==='required' && <p className='text-red-500'>You must fill with your email</p>} */}

                    <div><a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
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