import React, {useState} from "react";
import { ReactComponent as Logo } from '../assets/National_Gallery_of_Art_logo.svg';
import axios from "axios";
import Cookie from "js-cookie";
import {useNavigate} from "react-router-dom";
import {addAction} from "../utils/action_requests";


const StaffAuth = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001'+`/user/auth/${email}/${password}`);
            Cookie.set('user_id', response.data._id);
            Cookie.set('username', response.data.name);
            Cookie.set('type', response.data.type);
            console.log(response.data.type);
            alert("Добро пожаловать, " + response.data.type+': '+response.data.name);
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'USER LOGGED');
            navigate('/');
        } catch (error) {
            alert('Неверные данные!');
            console.error('Failed to sign in:', error);
        }
    };


    return(
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo className="mx-auto h-40 w-auto"></Logo>
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                onChange={handleEmailChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSignIn}
                            className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default StaffAuth;