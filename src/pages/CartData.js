import React from "react";
const columns = [
  {name: "NAME", uid: "name"},
  {name: "PRICE", uid: "price"},
  {name: "QUANTITY", uid: "quantity"},
  {name: "ACTIONS", uid: "actions"},
];

const CartList = [
    {
      id:1,
      name: "Orange",
      price: "$5.50",
      quantity: 8,
    },
    {
      id:2,
      name: "Tangerine",
      price: "$3.00",
      quantity: 3,
    },
    {
      id:3,
      name: "Raspberry",
      price: "$10.00",
      quantity: 2
    },
  ];

export {columns, CartList};
