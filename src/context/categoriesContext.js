import { createContext, useContext, useEffect, useState } from 'react';

const Categories = createContext();

export const useCategories = () => useContext(Categories);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({
    None: '',
  });

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/categories/list')
      .then(response => response.json())
      .then(jsonResponse => {
        setCategories(() => {
          const temp = jsonResponse?.reduce(
            (categories, { category_id, name }) => ({
              ...categories,
              [name]: category_id,
            }),
            {}
          );

          return {
            None: '',
            ...temp,
          };
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Categories.Provider
      value={{
        categories,
        setCategories,
      }}
    >
      {children}
    </Categories.Provider>
  );
};
