import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading';
import { InputFeild } from '../components/InputFeild';

export function SignIn()
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <div className='w-screen h-screen bg-slate-100 flex justify-center items-center flex-col'>
            <div className='text-center w-screen p-2'>
                <h1 className='font-bold text-4xl mb-5'> Photo Manager </h1>
            </div>
            <div className='bg-white p-3 w-1/4 rounded-md shadow-md'>
                <Heading text='Sign In'></Heading>
                <InputFeild label={'Email'} placeholder={'ghaz@gmail.com'} onChange={(e) => {
                    setEmail(e.target.value)
                }}></InputFeild>
                <InputFeild label={'Password'} type={'password'} placeholder={'ghaz@gmail.com'} onChange={(e) => {
                    setPassword(e.target.value)
                }}></InputFeild>
                <button onClick={onLogin} className='bg-black text-white w-full p-2 pt-2 pb-2 rounded mt-2 hover:bg-gray-700'>Sign In</button>
                <div className='p-3 text-center'>
                <p>
                    Don't have an account?{' '}
                    <NavLink className='hover:text-red-500' to="/" >
                        Sign Up
                    </NavLink>
                </p>
                </div>
            </div>
        </div>
    )
}
