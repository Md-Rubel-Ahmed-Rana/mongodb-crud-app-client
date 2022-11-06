import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/UserContext';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://mongo-crud-db.vercel.app/orders?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((res) => res.json())
            .then((data) => setOrders(data))
    }, [user])

    const handleDelete = (id) => {
        fetch(`https://mongo-crud-db.vercel.app/orders/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    const renaining = orders.filter((order) => order._id !== id);
                    setOrders(renaining)
                }
            })

    }

    return (
        <div>
            <div className="overflow-x-auto px-20 mt-10 w-full">
                <table className="table w-full">
                    <thead className='text-center'>
                        <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;