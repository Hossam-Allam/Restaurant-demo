import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';

const Products = ({ products, handleAddToCart }) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4" style={{ height: '560px', width: '960px' }}>
      {products.map((item) => (
        <div key={item.id} className="flex justify-center">
          <Card
            shadow="sm"
            isPressable
            onPress={() => handleAddToCart(item.title)}
            style={{
              width: '240px', // Limiting card width
              maxWidth: '240px', // Ensuring card width never exceeds 240px
              height: '100%', // Limiting card height
            }}
          >
            <CardBody
              className="overflow-visible p-0"
              style={{
                background: `url(${item.img}) center/cover no-repeat`, // Set image as background
              }}
            >
              {/* Placeholder for the background image */}
              <div style={{ height: '100%', width: '100%' }}></div>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Products;
