import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import { Heading } from '../components/Heading';
import { InputFeild } from '../components/InputFeild';

export function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/home")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    return (
        <div className='w-screen h-screen bg-slate-100 flex justify-center items-center flex-col'>
            <div className='text-center w-screen p-2'>
                <h1 className='font-bold text-4xl mb-5'> Photo Manager </h1>
            </div>
            <div className='bg-white p-3 w-1/4 rounded-md shadow-md'>
                <Heading text='SignUp'></Heading>
                <InputFeild label={'Email'} placeholder={'ghaz@gmail.com'} onChange={(e) => {
                    setEmail(e.target.value)
                }}></InputFeild>
                <InputFeild label={'Password'} type={'password'} placeholder={'ghaz@gmail.com'} onChange={(e) => {
                    setPassword(e.target.value)
                }}></InputFeild>
                <button onClick={onSubmit} className='bg-black text-white w-full p-2 pt-2 pb-2 rounded mt-2 hover:bg-gray-700'>Sign Up</button>
                <div className='p-3 text-center'>
                <p>
                    Already have an account?{' '}
                    <NavLink className='hover:text-red-500' to="/signin" >
                        Sign in
                    </NavLink>
                </p>
                </div>
            </div>


        </div>
    )
}
