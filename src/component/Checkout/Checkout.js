import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Checkout = () => {
    const { _id, title, img, price } = useLoaderData();

    const handleUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const order = {
            product_id: _id,
            email: email,
            name: name,
            phone: phone,
            product_name: title,
            img: img,
            price: price
        }


        fetch("https://mongo-crud-db.vercel.app/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then((res) => res.json())
            .then(() => { })
            .catch((err) => console.log(err))

        // reset the form after submit
        form.reset()
    }

    return (
        <div>
            <div>
                <h4 className='text-2xl'> You are going to order: {title}</h4>
            </div>
            <div className="hero  bg-base-200">
                <div className="hero-content w-1/2">
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleUser} className="card-body">
                            <div className="form-control">

                                <input type="text" name='name' placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">

                                <input type="email" name='email' placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="text" name='phone' placeholder="Phone" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <textarea type="text" name='message' placeholder="Message" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;