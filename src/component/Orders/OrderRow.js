import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, handleDelete }) => {
    const { _id , name, email, phone, product_name, img, price } = order;
    return (
        <tr>
            <td> <img className='rounded' src={img} alt="ProductImage" /></td>
            <td>{name}</td>
            <td>{product_name}</td>
            <td>{price}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <th>
                <Link to={`/update/${_id}`}>
                    <button className="btn btn-outline btn-primary">Edit</button>
                </Link>
            </th>
            <td> <button onClick={() => handleDelete(_id)} className="btn btn-error">Delete</button> </td>
        </tr> 
    );
};

export default OrderRow;