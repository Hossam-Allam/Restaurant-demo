import React, { useEffect, useState } from "react";
import { orders } from "./OrdersData";
import OrderCard from "../components/OrderCard";

const mergeOrdersByTableNumber = (orders) => {
  const mergedOrders = {};
  let nextId = 1; // Initialize ID counter

  orders.forEach((order) => {
    if (!mergedOrders[order.tableNumber]) {
      mergedOrders[order.tableNumber] = {
        tableNumber: order.tableNumber,
        products: [],
        status: order.status,
      };
    }
    // Assign unique IDs to each product
    order.products.forEach((product) => {
      mergedOrders[order.tableNumber].products.push({ ...product, id: nextId++ });
    });
  });

  return Object.values(mergedOrders);
};

const ChefInterface: React.FC = () => {
  const mergedOrders = mergeOrdersByTableNumber(orders);
  const [columns, setColumns] = useState([[], [], []]);

  const updateColumns = () => {
    const containerWidth = window.innerWidth;
    const columnCount = Math.max(1, Math.floor(containerWidth / 610));
    const columnHeights = Array(columnCount).fill(0);
    const newColumns = Array.from({ length: columnCount }, () => []);

    mergedOrders.forEach((order) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[minHeightIndex].push(order);
      columnHeights[minHeightIndex] += 1;
    });

    setColumns(newColumns);
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [mergedOrders]);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {columns.map((col, colIndex) => (
        <div key={colIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {col.map((order) => (
            <OrderCard
              key={order.tableNumber + "-" + order.products.length} // Unique key
              tableNumber={order.tableNumber}
              products={order.products}
              status={order.status}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChefInterface;
