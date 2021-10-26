import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/LocalStorage';

const Shipping = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const savedCart = getStoredCart();
        data.order = savedCart;

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.insertedId) {
                    alert('Order Processed Successfully')
                    clearTheCart();
                    reset();
                }
            })
        // history.push('/placeorder');
    };
    const { user } = useAuth();
    const history = useHistory();

    // const handlePlaceOrder = () => {
    //     history.push('/placeorder');
    // }
    return (
        <div className="mt-5 d-flex justify-content-center">
            <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>

                <input placeholder="Your Name" defaultValue={user.displayName} {...register("name")} />

                <input defaultValue={user.email}  {...register("email", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.email && <span>This field is required</span>}
                <input placeholder="Address" defaultValue="" {...register("address")} />
                <input placeholder="City" defaultValue="" {...register("city")} />
                <input placeholder="Phone" defaultValue="" {...register("phone")} />

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;