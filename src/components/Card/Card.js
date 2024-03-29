import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

console.log(styles);
function Card({
  onFavorite,
  onPlus,
  id,
  title,
  imageUrl,
  price,
  favorited = false,
  loading = false,
}) {
  // const onClickButton=()=>{
  //   alert(props.title);
  // };
  const { isItemAdded, isFavoriteAdded } = React.useContext(AppContext);
  // const[isAdded,setIsAdded]=React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickFavorite = () => {
    onFavorite({ id, parentId: id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="2" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="130" rx="5" ry="5" width="95" height="15" />
          <rect x="0" y="177" rx="5" ry="5" width="80" height="24" />
          <rect x="118" y="175" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                src={
                  isFavoriteAdded(id)
                    ? "img/heart-like.svg"
                    : "img/heart-unlike.svg"
                }
                alt="Unliked"
                onClick={onClickFavorite}
              ></img>
            </div>
          )}
          <img width="100%" height={130} src={imageUrl} alt=""></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? "img/btn-check.svg" : "img/plus.svg"}
                alt="plus"
              ></img>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
