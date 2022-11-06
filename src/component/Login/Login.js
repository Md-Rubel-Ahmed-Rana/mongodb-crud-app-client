import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Login = () => {
    const { userLogin, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        userLogin(email, password)
            .then((result) => {
                const user = result.user
                setUser(user);

                const email = {
                    email: user.email
                };

                fetch("https://mongo-crud-db.vercel.app/jwt", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(email)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        localStorage.setItem("access_token", data.token)
                    })
                    .catch((err) => console.log(err))

                navigate(from, { replace: true })
            })
            .catch((error) => console.log(error))
    }
    return (
        <div className="hero  bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
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
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>New here? <Link to="/register" className='underline'>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;