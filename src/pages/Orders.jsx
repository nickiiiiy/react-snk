import React from 'react';
import Card from '../components/Card/Card';
import axios from 'axios';

import AppContext from '../context';

function Orders(){
    const{onAddFavorite,onAddToCart}=React.useContext(AppContext);
    const[orders,setOrders]=React.useState([]);
    const [isLoading,setIsLoading]=React.useState(true);


    React.useEffect(()=>{
    (async()=>{
        try{
            const {data} = await axios.get('https://656ef5c86529ec1c62370ac3.mockapi.io/orders');
            setOrders(data.reduce((prev,obj)=>[...prev,...obj.items],[]));
            setIsLoading(false);
        }
        catch(error){
            alert('Ошибка при запросе заказов');
            console.error(error);
        }
    })();        

    },[]);
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
         <h1 className="">
          Мои заказы
        </h1>
          
        </div>

        <div className="sneakers d-flex flex-wrap">
          {(isLoading ? [...Array(10)] : orders).map((item,index)=>(
              <Card
              key={index}
              id={item && item.id}
              title={item && item.title}
              price={ item && item.price}
              imageUrl={item && item.imageUrl}
              loading={isLoading}
                
                
              />
            ))}
    
         
        </div>

      </div>
    );
}

export default Orders;