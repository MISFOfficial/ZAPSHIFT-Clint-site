import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { AuthContext } from '../../../UserAuth/AuthContext';

const Register = () => {

    const {
        register, handleSubmit, formState: { errors }
    } = useForm()

    const {createUser} = useAuth()
    // const {createUser} = use(AuthContext)

    const onSubmit = data => {
        console.log(data)
        // console.log(createUser)
        createUser(data.email, data.password)
        .then(r=>{
            console.log(r)
        })
        .catch(e=>{
            console.log(e)
        })
    }


    return (
        <div className="flex-col">
            <h1 className='text-2xl font-bold'>Create An Account</h1>
            <div className="border border-gray-300 p-5 w-100 mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset full">
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