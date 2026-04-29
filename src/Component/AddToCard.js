import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCart, removeCart, clearCart } from '../utils/cartSlice'

const AddToCarts = () => {

    const allCart = useSelector((data) => data.cart.item)
    const dispatch = useDispatch()

    return (
        <div className='p-4'>

            {/* Clear Cart */}
            <button 
                onClick={() => dispatch(clearCart())}
                className='bg-red-500 text-white p-2 m-2 rounded'
            >
                Clear Cart
            </button>

            {/* Cart Items */}
            {allCart.length === 0 ? (
                <h2 className='text-center'>Cart is empty</h2>
            ) : (
                allCart.map((item) => (
                    <div 
                        key={item.id}
                        className='bg-white flex justify-between items-center p-4 m-2 shadow rounded'
                    >
                        {/* Name */}
                        <h1>{item.name}</h1>

                        {/* Quantity Controls */}
                        <div className='flex items-center gap-3'>
                            
                            {/* - button */}
                            <button 
                                onClick={() => dispatch(removeCart(item.id))}
                                className='bg-black text-white px-3 py-1 rounded'
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            {/* + button */}
                            <button 
                                onClick={() => dispatch(addCart(item))}
                                className='bg-green-500 text-white px-3 py-1 rounded'
                            >
                                +
                            </button>

                        </div>
                    </div>
                ))
            )}

        </div>
    )
}

export default AddToCarts