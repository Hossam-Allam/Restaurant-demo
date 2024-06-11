import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { CheckIcon } from "./CheckIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { CircleX, CircleEllipsis, CircleCheck, Trash2, DollarSign } from 'lucide-react';
import { columns } from "../pages/WaiterOrdersData";

interface OrderTableProps {
  products: { id: number; name: string; category: string; itemStatus: string; price: number }[];
}

const statusOrder = {
  "in-kitchen": 1,
  "order-ready": 2,
  "delivered": 3,
  "paid": 4,
};

const categoryOrder = {
  "Appetizers/Starters": 1,
  "Main Courses/Entrees": 2,
  "Desserts": 3,
  "Beverages/Drinks": 4,
};

const OrderTable: React.FC<OrderTableProps> = ({ products }) => {
  const [productList, setProductList] = useState(products);
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(["in-kitchen", "order-ready", "delivered", "paid"]));
  const [categoryFilter, setCategoryFilter] = useState<Selection>(new Set(["Appetizers/Starters", "Main Courses/Entrees", "Desserts", "Beverages/Drinks"]));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "name", direction: "ascending" });

  const updateProductStatus = (id: number, status: string) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id ? { ...product, itemStatus: status } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProductList((prevList) => prevList.filter((product) => product.id !== id));
  };

  const filteredProducts = useMemo(() => {
    if (statusFilter.size === 0 || categoryFilter.size === 0) return [];
    return productList.filter((product) =>
      Array.from(statusFilter).includes(product.itemStatus) &&
      Array.from(categoryFilter).includes(product.category)
    );
  }, [productList, statusFilter, categoryFilter]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let primaryFirst, primarySecond, secondaryFirst, secondarySecond;

      switch (sortDescriptor.column) {
        case "name":
          primaryFirst = a.name;
          primarySecond = b.name;
          secondaryFirst = statusOrder[a.itemStatus];
          secondarySecond = statusOrder[b.itemStatus];
          break;
        case "category":
          primaryFirst = categoryOrder[a.category];
          primarySecond = categoryOrder[b.category];
          secondaryFirst = statusOrder[a.itemStatus];
          secondarySecond = statusOrder[b.itemStatus];
          break;
        case "itemStatus":
          primaryFirst = statusOrder[a.itemStatus];
          primarySecond = statusOrder[b.itemStatus];
          break;
        default:
          return 0;
      }

      let primaryCmp = primaryFirst < primarySecond ? -1 : primaryFirst > primarySecond ? 1 : 0;
      let secondaryCmp = secondaryFirst < secondarySecond ? -1 : secondaryFirst > secondarySecond ? 1 : 0;

      if (sortDescriptor.direction === "descending") {
        primaryCmp *= -1;
        secondaryCmp *= -1;
      }

      return primaryCmp || secondaryCmp;
    });
  }, [filteredProducts, sortDescriptor]);

 const renderCell = (product: any, columnKey: React.Key) => {
  switch (columnKey) {
    case "name":
      return product.name;
    case "category":
      return product.category;
    case "itemStatus":
      let color;
      let startContent;
      let content;
      switch (product.itemStatus) {
        case "pending":
        case "in-progress":
        case "in-kitchen":
          color = "danger";
          startContent = <CircleX />;
          content = "In Kitchen";
          break;
        case "ready":
        case "order-ready":
          color = "warning";
          startContent = <Spinner size="sm" color="warning" />;
          content = "Order Ready";
          break;
        case "delivered":
          color = "success";
          startContent = <CheckIcon />;
          content = "Delivered";
          break;
        case "paid":
          color = "primary";
          startContent = <DollarSign />;
          content = "Paid";
          break;
      }
      return (
        <Chip color={color} variant="faded" startContent={startContent}>
          {content}
        </Chip>
      );
    case "price":
      return `$${product.price}`;
    case "actions":
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Tooltip content="Mark as In Kitchen">
              <CircleX
                size={30}
                style={{ cursor: 'pointer' }}
                color="#16161a"
                fill="#dd145b"
                onClick={() => updateProductStatus(product.id, "in-kitchen")}
              />
            </Tooltip>
            <Tooltip content="Mark as Order Ready">
              <CircleEllipsis
                size={30}
                style={{ cursor: 'pointer' }}
                color="#16161a"
                fill="#e19a24"
                onClick={() => updateProductStatus(product.id, "order-ready")}
              />
            </Tooltip>
            <Tooltip content="Mark as Delivered">
              <CircleCheck
                size={30}
                style={{ cursor: 'pointer' }}
                color="#16161a"
                fill="#14cc64"
                onClick={() => updateProductStatus(product.id, "delivered")}
              />
            </Tooltip>
            <Tooltip content="Mark as Paid">
              <DollarSign
                size={30}
                style={{ cursor: 'pointer' }}
                color="#16161a"
                fill="#0070f3"
                onClick={() => updateProductStatus(product.id, "paid")}
              />
            </Tooltip>
          </div>
          <Tooltip content="Delete Item">
            <Trash2
              size={30}
              style={{ cursor: 'pointer' }}
              color="#16161a"
              fill="#dd145b"
              onClick={() => deleteProduct(product.id)}
            />
          </Tooltip>
        </div>
      );
    default:
      return product[columnKey as keyof typeof product];
  }
};

  return (
    <>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', justifyContent:'end'}}>
        <label className="flex items-center text-default-400">
          Display filters:
        </label>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" endContent={<ChevronDownIcon className="text-small" />}>Status</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Status Filter"
            selectionMode="multiple"
            selectedKeys={statusFilter}
            onSelectionChange={setStatusFilter}
            closeOnSelect={false}
          >
            <DropdownItem key="in-kitchen">In Kitchen</DropdownItem>
            <DropdownItem key="order-ready">Order Ready</DropdownItem>
            <DropdownItem key="delivered">Delivered</DropdownItem>
            <DropdownItem key="paid">Paid</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" endContent={<ChevronDownIcon className="text-small" />}>Category</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Category Filter"
            selectionMode="multiple"
            selectedKeys={categoryFilter}
            onSelectionChange={setCategoryFilter}
            closeOnSelect={false}
          >
            <DropdownItem key="Appetizers/Starters">Appetizers/Starters</DropdownItem>
            <DropdownItem key="Main Courses/Entrees">Main Courses/Entrees</DropdownItem>
            <DropdownItem key="Desserts">Desserts</DropdownItem>
            <DropdownItem key="Beverages/Drinks">Beverages/Drinks</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Table
        isHeaderSticky
        isStriped
        aria-label="Order Table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          base: "max-h-[50vh] overflow-scroll"
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.uid !== "actions"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={sortedProducts}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderTable;