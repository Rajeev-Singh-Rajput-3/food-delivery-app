import React, { useContext, useEffect } from 'react'
import { IoSearch } from 'react-icons/io5'
import { LuShoppingBag } from 'react-icons/lu'
import { MdFastfood } from "react-icons/md"
import { dataContext } from '../context/UserContext'
import { food_items } from '../food'
import { useSelector } from 'react-redux'
function Nav() {
  let {input, setInput, cate, setCate, showCart, setShowCart} = useContext(dataContext)

  useEffect(() => {
    let newFoodItems = food_items.filter((item) => item.food_name.includes(input) || item.food_name.toLowerCase().includes(input))
    setCate(newFoodItems)
  },[input])

  let items=useSelector(state=>state.cart)
  

  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
      <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl'>
        <MdFastfood className='h-[30px] w-[30px] text-green-500'/>
      </div>
      <form className='w-[50%] h-[60px] bg-white flex items-center gap-5 rounded-md shadow-md px-5 md:w-[70%]' onSubmit={(e) => {e.preventDefault()}}>
        <IoSearch className='w-[20px] h-[20px] text-green-500'/>
        <input type="text" placeholder='Search Items....' className='text-[16px] w-[100%] outline-none md:text-[20px]' onChange={(e) => setInput(e.target.value)} value={input} />
      </form>
      <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer' onClick={() => {setShowCart(true)}}>
        <LuShoppingBag className='h-[30px] w-[30px] text-green-500'/>
        <span className='absolute top-0 right-2 text-green-500 font-bold text-[18px]'>
            {items.length}
        </span>
      </div>
    </div>
  )
}

export default Nav
