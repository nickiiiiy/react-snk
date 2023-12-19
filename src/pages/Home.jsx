import React from 'react';
import Card from '../components/Card/Card';
import AppContext from '../context';

function Home({cartItems,items,searchValue,setSearchValue,onChangeSearchInput,onAddFavorite,onAddToCart,isLoading,}){

    // const {isItemAdded}=React.useContext(AppContext);

    const renderItems=()=>{
        const filtredItems = items.filter((item)=>item.title.toLowerCase().includes(searchValue.toString().toLowerCase()));
        return (isLoading ? [...Array(10)] : filtredItems).map((item,index)=>(
          <Card
            key={index}
            id={item && item.id}
            title={item && item.title}
            price={ item && item.price}
            imageUrl={item && item.imageUrl}
            onFavorite={(obj)=>onAddFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
          />
        ));
    }
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
         <h1 className="">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
          </h1>
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="Search"></img>
            {searchValue && (<img onClick={()=>setSearchValue('')} className="clear removeBtn cu-p" src="img/btn-remove.svg" alt="Clear"></img>)}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"></input>
          </div>
        </div>

        <div className="sneakers d-flex flex-wrap">
       
          {renderItems()}
         
        </div>

      </div>
    );
}

export default Home;