import React from "react";
import { Route, Routes } from "react-router-dom";
// Подключаю библиотеку axios для получения данных с backend
import axios from "axios";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";
// const arr=[

//   {"title":"Мужские Кроссовки Nike Blazer Mid Suede",
//     "price":12999,
//     "imageUrl":"/img/sneakers/1.jpg"

//   },

//   { "title":"Мужские Кроссовки Nike Air Max 270",
//     "price":15600,
//     "imageUrl":"/img/sneakers/2.jpg"
//   },
//   { "title":"Мужские Кроссовки Nike Blazer Mid Suede",
//     "price":8499,
//     "imageUrl":"/img/sneakers/3.jpg"
//   },
//   { "title":"Кроссовки Puma X Aka Boku Future Rider",
//     "price":8999,
//     "imageUrl":"/img/sneakers/4.jpg"
//   },
//   { "title":"Мужские Кроссовки Under Armour Curry 8",
//     "price":15199,
//     "imageUrl":"/img/sneakers/5.jpg"
//   },
//   { "title":"Мужские Кроссовки Nike Kyrie 7",
//     "price":11299,
//     "imageUrl":"/img/sneakers/6.jpg"
//   },
//   { "title":"Мужские Кроссовки Jordan Air Jordan 11",
//     "price":10799,
//     "imageUrl":"/img/sneakers/7.jpg"
//   },

// ];

function App() {
  // Массив с элементами, для отображения их на главной странице
  const [items, setItems] = React.useState([]);
  // Массив для отображения элементов в корзине, после выбора продукта
  const [cartItems, setCartItems] = React.useState([]);
  const [favorite, setFavorite] = React.useState([]);

  // Поиск по странице
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Получаю из backend массив с элементами, с помощью метода fetch по ссылке
  React.useEffect(() => {
    // Получаю из backend массив с элементами, с помощью библиотеки  axios
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://656b1e0edac3630cf727b554.mockapi.io/cart"),
            axios.get("https://656ef5c86529ec1c62370ac3.mockapi.io/favorites"),
            axios.get("https://656b1e0edac3630cf727b554.mockapi.io/items"),
          ]);
        // const cartResponse= await axios.get('https://656b1e0edac3630cf727b554.mockapi.io/cart');
        // const favoritesResponse= await axios.get('https://656ef5c86529ec1c62370ac3.mockapi.io/favorites');
        // const itemsResponse= await axios.get('https://656b1e0edac3630cf727b554.mockapi.io/items');

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorite(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных ;(");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) == Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) != Number(obj.id))
        );
        await axios.delete(
          `https://656b1e0edac3630cf727b554.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://656b1e0edac3630cf727b554.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Не получилось добавить в корзину");
    }
  };

  const onRemoveItem = async (id) => {
    try {
      axios.delete(`https://656b1e0edac3630cf727b554.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };
  const onAddFavorite = async (obj) => {
    try {
      const findFavorite = favorite.find(
        (item) => Number(item.parentId) == Number(obj.id)
      );
      if (findFavorite) {
        setFavorite((prev) =>
          prev.filter((item) => Number(item.parentId) != Number(obj.id))
        );
        await axios.delete(
          `https://656ef5c86529ec1c62370ac3.mockapi.io/favorites/${findFavorite.id}`
        );
        // setFavorite((prev) =>
        //   prev.filter((item) => Number(item.id) !== Number(obj.id))
        // );
      } else {
        setFavorite((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://656ef5c86529ec1c62370ac3.mockapi.io/favorites",
          obj
        );
        setFavorite((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );

        // const { data } = await axios.post(
        //   "https://656ef5c86529ec1c62370ac3.mockapi.io/favorites",
        //   obj
        // );
        // setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) == Number(id));
  };
  const isFavoriteAdded = (id) => {
    return favorite.some((obj) => Number(obj.parentId) == Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorite,
        items,
        isFavoriteAdded,
        isItemAdded,
        onAddFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddFavorite={onAddFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
