import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const { _id, name, email, phone } = useLoaderData();

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const updated = {
            name: name,
            email: email,
            phone: phone,
        }

        fetch(`https://mongo-crud-db.vercel.app/orders/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updated)
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))

    }
    return (
        <div>
            <div className="hero  bg-base-200">
                <div className="hero-content w-1/2">
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleUpdate} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue={name} name='name' placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" defaultValue={email} name='email' placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="text" defaultValue={phone} name='phone' placeholder="Phone" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update Info</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;