// mockApi.js
import vegetables from "../assets/images/vegetables.jpg";
import meat from "../assets/images/meat.jpg";


// mock like API fetching
export default {
  fetchCategories: () =>
    Promise.resolve([
      {
        id: 1232323232,
        name: "Vegetables",
        imageUrl: `${vegetables}`,
        isActive: true,
      },
      { id: 22323232323, name: "Meat", imageUrl: `${meat}`, isActive: true },
      { id: 234324, name: "Milk", imageUrl: `${meat}`, isActive: true },
      { id: 6546, name: " Spinach", imageUrl: `${meat}`, isActive: true },
    ]),
  createCategory: (category) =>
    Promise.resolve({ ...category, isActive: true, id: Date.now() }),
  updateCategory: (category) =>
    Promise.resolve({ ...category, isActive: true }),
  deleteCategory: (id) => Promise.resolve(),

  fetchProducts: (categoryId) =>
    Promise.resolve([
      {
        id: 98987,
        name: " veg Product 1",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        stock: 10,
        price: 20,
        imageUrl: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        categoryId: 1232323232,
        isActive: true,
        sales: 0,
      },
      {
        id: 2564543543,
        name: "veg Product 2",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        stock: 5,
        price: 30,
        imageUrl: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        categoryId: 1232323232,
        isActive: true,
        sales: 0,
      },

      {
        id: 65754,
        name: " Meat Product 2",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        stock: 5,
        price: 30,
        imageUrl: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        categoryId: 22323232323,
        isActive: false,
        sales: 0,
      },
    ]).then((products) => {
      if (categoryId === null) {
        return products;
      }

      return products.filter(
        (product) => product.categoryId === Number(categoryId)
      );
    }),
  createProduct: (product) =>
    Promise.resolve({ ...product, id: Date.now(), sales: 0 }),
  updateProduct: (product) => Promise.resolve(product),
  deleteProduct: (id) => Promise.resolve(),
  placeOrder: (cartItems) => Promise.resolve({ orderId: Date.now() }),
};
