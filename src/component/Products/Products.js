import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Products = () => {
    const { logOut } = useContext(AuthContext)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://mongo-crud-db.vercel.app/products")
            .then((res) => {
                if(res.status === 401 || res.status === 403){
                    return logOut()
                }
                return res.json()
            })
            .then((data) => {
                console.log(data);
                return setProducts(data)
            })
    }, [logOut])

    return (
        <div className='grid grid-cols-3'>
            {
                products.map((product) => <div key={product._id}>
                    <div className="card w-96 bg-gray-800 shadow-xl m-3">
                        <figure><img className='h-40 w-full' src={product.img} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.title}</h2>
                            <div className="card-actions justify-center">
                                <Link to={`/checkout/${product._id}`}>
                                    <button className="btn btn-primary">Order Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Products;