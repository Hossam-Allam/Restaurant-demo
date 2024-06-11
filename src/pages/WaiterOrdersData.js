export const columns = [
  { name: "NAME", uid: "name" },
  { name: "CATEGORY", uid: "category" },
  { name: "ITEM STATUS", uid: "itemStatus" },
  { name: "ACTIONS", uid: "actions" },
  { name: "PRICE", uid: "price" },
];

export const orders = [
  {
    tableNumber: 5,
    description: "Customer is allergic to nuts",
    products: [
      { id: 1, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 2, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
      { id: 3, name: "Lemon", category: "Appetizers/Starters", itemStatus: "delivered", price: 1.00 },
      { id: 4, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 5, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
    ],
    status: "in-kitchen",
  },
  {
    tableNumber: 7,
    description: "No special requests",
    products: [
      { id: 1, name: "Orange", category: "Beverages/Drinks", itemStatus: "delivered", price: 3.50 },
      { id: 2, name: "Lemonade", category: "Beverages/Drinks", itemStatus: "paid", price: 2.50 },
    ],
    status: "order-ready",
  },
  {
    tableNumber: 1,
    description: "Customer prefers spicy food",
    products: [
      { id: 1, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 2, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
      { id: 3, name: "Lemon", category: "Appetizers/Starters", itemStatus: "delivered", price: 1.00 },
      { id: 4, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 5, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
    ],
    status: "in-kitchen",
  },
  {
    tableNumber: 2,
    description: "Customer is allergic to shellfish",
    products: [
      { id: 1, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 2, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
      { id: 3, name: "Lemon", category: "Appetizers/Starters", itemStatus: "delivered", price: 1.00 },
      { id: 4, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 5, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
    ],
    status: "in-kitchen",
  },
  {
    tableNumber: 3,
    description: "Customer wants extra sauce",
    products: [
      { id: 1, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 2, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
      { id: 3, name: "Lemon", category: "Appetizers/Starters", itemStatus: "delivered", price: 1.00 },
      { id: 4, name: "Orange", category: "Main Courses/Entrees", itemStatus: "in-kitchen", price: 3.50 },
      { id: 5, name: "Orange", category: "Main Courses/Entrees", itemStatus: "order-ready", price: 3.50 },
    ],
    status: "in-kitchen",
  },
];
