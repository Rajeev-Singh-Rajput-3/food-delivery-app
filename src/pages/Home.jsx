import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Categories from '../Category'
import Card from '../components/Card'
import { food_items } from '../food'
import { dataContext } from '../context/UserContext'
import { RxCross2 } from 'react-icons/rx'
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
function Home() {
  let {cate, setCate, input, showCart, setShowCart} = useContext(dataContext)
  let [selectedCategory, setSelectedCategory] = useState("All")
  function filter(category){
    setSelectedCategory(category)
    if(category === "All"){
      setCate(food_items);
    }
    else{
      let newFoodItems = food_items.filter((item) => (
        item.food_category === category
      ))

      setCate(newFoodItems);
    }
  }

  let items = useSelector(state=>state.cart)

  let subtotal = items.reduce((total, item)=>total + item.qty * item.price, 0)
  let deliveryFee = 20
  let taxes = subtotal * 0.5 / 100
  let total = Math.floor(subtotal + deliveryFee + taxes)
  

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      <Nav/>

      {!input ? <div className='flex flex-wrap justify-center items-center gap-5 w-[100%] px-5'>
        {Categories.map((item) => {
            return <div className={`w-[120px] h-[130px] bg-white flex flex-col justify-center items-center p-5 text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200 ${selectedCategory === item.name ? 'text-green-600 font-bold' : '' } `} onClick={() => filter(item.name)}>
              {item.image}
              {item.name}
              </div>
          })}
      </div> : null}
      
      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
        {cate.length > 1 ? cate.map((item)=>(
          <Card name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type} />
        )) : <div className='text-center text-2xl text-green-500 font-semibold'>Oops! no dish found...</div>}
      </div>
      
      <div className={`w-full h-[100%] bg-white fixed top-0 right-0 shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"} md:w-[40vw]`}>
        <header className='w-full flex justify-between items-center '>
          <span className='text-green-500 text-[18px] font-semibold'>Ordered items</span>
          <RxCross2 className='w-[22px] h-[22px] text-green-500 font-semibold cursor-pointer hover:text-gray-700' onClick={() => setShowCart(false)}/>
        </header>
        {items.length > 0 ? <> 
        <div className='w-full mt-9 flex flex-col gap-8'>
          {items.map((item)=>(
            <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
          ))}
        </div>
        <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {subtotal}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {deliveryFee}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {taxes}/-</span>
          </div>
        </div>
        <div className='w-full flex justify-between items-center p-9'>
            <span className='text-2xl text-gray-600 font-semibold'>Total</span>
            <span className='text-green-400 font-semibold text-2xl'>Rs {total}/-</span>
        </div>
        <button className='w-[80%] p-2 bg-green-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-green-400 transition-all duration-200' onClick={()=>{
          toast.success("Order Placed...")
        }}>Place Order</button>
        </> 
        : 
        <div className='text-center text-2xl text-green-500 font-semibold mt-20'>
          Empty Cart...
        </div> }
        
      </div>
    </div>
  )
}

export default Home
