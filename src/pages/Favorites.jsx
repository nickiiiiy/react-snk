import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

function Favorites() {
  const { favorite, onAddFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои закладки</h1>
      </div>

      <div className="sneakers d-flex flex-wrap">
        {favorite.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorited={true}
            // onFavorite={(obj) => onAddFavorite(obj)}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
