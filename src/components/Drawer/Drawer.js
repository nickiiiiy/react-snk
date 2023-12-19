import React from "react";
import axios from 'axios';

import AppContext from "../../context";
import Info1 from "../Info1";

import styles from './Drawer.module.scss';

const delay=(ms)=> new Promise((resolve)=>setTimeout(resolve,ms))
function Drawer({onRemove,onClose,items=[], opened}){
    const{cartItems,setCartItems}=React.useContext(AppContext);
    const[orderId,setOrderId]=React.useState(null);
    const[isOrderComplete,setIsOrderComplete]=React.useState(false);
    const[isLoading,setIsLoading]=React.useState(false);
    const totalPrice=cartItems.reduce((sum,obj)=>obj.price+sum,0)

    
    
    const onClickOrder= async()=>{
        try{
            setIsLoading(true);
            const {data}= await axios.post('https://656ef5c86529ec1c62370ac3.mockapi.io/orders',{
                items: cartItems,
            });
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i= 0; i< cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://656b1e0edac3630cf727b554.mockapi.io/cart/${item.id}`);
                await delay(1000);
                
            }
        }
        catch(error){
            alert('Не удалось создать заказ :(')
        }
        setIsLoading(false);
    };

    return(
        <div  className={`${styles.overlay}  ${opened ? styles.overlayVisible : ""}`}>
            <div className={styles.drawer}>
                {/* cu-p= cursor pointer */}
                    <h2 className="d-flex justify-between mb-30 ">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt=""></img>
                    </h2>

                    {/* выбор отображения в корзине, если в items есть элесенты, 
                        то отображать их. Если нет, то отображать пустую корзину с картинкой  */}
                    { items.length >0 ?( 
                        <div className={styles.itemsInner}>
                            <div className={styles.items}>
                            {items.map((obj)=>(
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">                    
                                    <div style={{backgroundImage:`url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={()=>onRemove(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt=""></img>
                            
                                </div>
                            ))}
                         
                            </div> 
                            <div className="cartTotalBlock">
                            <ul>
                                <li>
                                <span>Итого: </span>
                                <div></div>
                                <b>{totalPrice} руб. </b>
                                </li>
        
                                <li>
                                <span>Налог 5%: </span>
                                <div></div>         
                                <b>{totalPrice/100 *5} руб. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="img/arrow.svg"></img></button>
                            </div>
                        </div> ):( 
                               <Info1 
                               title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
                               description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                                image={isOrderComplete ? "img/complete-order.jpg" :"img/empty-cart.jpg"}/>)
                        
                    }

                   



                    
                    
                    
                    
                </div>
            </div>

    );
}
export default Drawer;