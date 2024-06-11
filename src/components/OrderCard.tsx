import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from "@nextui-org/react";
import OrderTable from "./OrderTable";
import { CircleCheck, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface OrderCardProps {
  tableNumber: number;
  products: { id: number; name: string; category: string; itemStatus: string }[];
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ tableNumber, products, status }) => {
  const [isTableVisible, setIsTableVisible] = useState(true);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '100px' }}>
      <CardHeader
        onClick={toggleTableVisibility}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <h1 style={{ fontSize: 'clamp(1rem, 30px, 3rem)', textAlign: 'center', fontWeight: 'bold', margin: 0 }}>
          Table {tableNumber}
        </h1>
        {isTableVisible ? <ChevronUp style={{ marginLeft: 'auto' }} /> : <ChevronDown style={{ marginLeft: 'auto' }} />}
      </CardHeader>
      <Divider />
      {isTableVisible && (
        <CardBody style={{ flexGrow: 1 }}>
          <OrderTable products={products} />
        </CardBody>
      )}
      <CardFooter style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <Button endContent={<CircleCheck />} color="success" onClick={() => console.log("Complete Order")}>
          Complete Order
        </Button>
        <Button endContent={<Trash2 />} color="danger" onClick={() => console.log("Cancel Order")}>
          Cancel Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
