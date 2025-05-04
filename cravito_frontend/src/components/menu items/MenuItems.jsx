import React from 'react'
import "./MenuItems.css"
import { menu_list } from '../../assets/assets'
function MenuItems({category,setCategory}) {
  return (
    <div className='menu-items' id="menu-items">
        <h2>Explore Our Menu !</h2>
        <p className='menu-item-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, voluptatum.</p>
        <div className="menu-items-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory((e)=>e===item.menu_name?"Off":item.menu_name)} className='listed-item'>
                        <img className={category===item.menu_name?"active":""} key={index} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MenuItems