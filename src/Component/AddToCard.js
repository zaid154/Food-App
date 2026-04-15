import React from 'react'
import { useSelector } from 'react-redux'

const AddToCarts = () => {
    const allCart= useSelector((data) => data.cart.items)
     console.log(allCart);

  return (
      <div>
        {allCart.map(item=><div className='bg-white h-14 flex justify-center items-center'>
          <h1>{item.name}</h1>
          
        </div>)}
      </div>
  )
}

export default AddToCarts