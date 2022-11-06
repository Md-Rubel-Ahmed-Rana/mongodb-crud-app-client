import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Register = () => {
    const { createUser, logOut } = useContext(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        // const name = form.productName.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        createUser(email, password)
        .then((result) => {
            const user = result.user;
            logOut()
            console.log(user);
        })
        .catch((error) => console.log(error))
    }

    return (
            <div className="hero  bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <p>Have an account? <Link to="/login" className='underline'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Register;