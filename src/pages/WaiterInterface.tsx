import React, { useEffect, useState, useCallback, useMemo } from "react";
import { orders } from "../pages/WaiterOrdersData";
import OrderCard from "../components/WaiterOrderCard";

const mergeOrdersByTableNumber = (orders) => {
  const mergedOrders = {};
  let nextId = 1;

  orders.forEach((order) => {
    if (!mergedOrders[order.tableNumber]) {
      mergedOrders[order.tableNumber] = {
        tableNumber: order.tableNumber,
        products: [],
        status: order.status,
        description: order.description,
      };
    }
    // Assign unique IDs to each product
    order.products.forEach((product) => {
      mergedOrders[order.tableNumber].products.push({ ...product, id: nextId++ });
    });
  });

  return Object.values(mergedOrders);
};

const calculateSubtotal = (products) => {
  return products
    .filter((product) => product.itemStatus !== "paid")
    .reduce((acc, product) => acc + product.price, 0)
    .toFixed(2);
};

const WaiterInterface: React.FC = () => {
  const mergedOrders = useMemo(() => mergeOrdersByTableNumber(orders), [orders]);
  const [columns, setColumns] = useState([[], [], []]);

  const updateColumns = useCallback(() => {
    const containerWidth = window.innerWidth;
    const columnCount = Math.max(1, Math.floor(containerWidth / 685));
    const columnHeights = Array(columnCount).fill(0);
    const newColumns = Array.from({ length: columnCount }, () => []);

    mergedOrders.forEach((order) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[minHeightIndex].push(order);
      columnHeights[minHeightIndex] += 1;
    });

    setColumns(newColumns);
  }, [mergedOrders]);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    const resizeObserver = new ResizeObserver(updateColumns);
    document.querySelectorAll('.column').forEach((col) => resizeObserver.observe(col));

    return () => {
      window.removeEventListener("resize", updateColumns);
      resizeObserver.disconnect();
    };
  }, [updateColumns]);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {col.map((order, orderIndex) => (
            <OrderCard
              key={`${order.tableNumber}-${orderIndex}`} 
              tableNumber={order.tableNumber}
              products={order.products}
              status={order.status}
              description={order.description} 
              subtotal={calculateSubtotal(order.products)} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WaiterInterface;
