import { useEffect } from "react";
import { useState } from "react"
import { getStoredCart, cartItemCount } from "../utilities/LocalStorage";


const useCart = () => {
    const [cart, setCart] = useState([]);
    const count = cartItemCount();


    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);


        fetch('http://localhost:5000/courses/byKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(courses => {
                console.log(courses);
                if (courses.length) {
                    const storedCart = [];
                    for (const id in savedCart) {
                        const addedCourse = courses.find(course => parseInt(course.courseID) === parseInt(id));
                        if (addedCourse) {
                            // set quantity
                            const quantity = savedCart[id];
                            addedCourse.quantity = quantity;
                            storedCart.push(addedCourse);
                        }
                    }
                    setCart(storedCart);
                }
            })

    }, [])


    console.log(cart);
    return [cart, setCart, count];
}

export default useCart;