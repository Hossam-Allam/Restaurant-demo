import React, { useState, useCallback, useMemo } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useLocation } from "react-router-dom";
import { Textarea } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Avatar,
  Tooltip,
  Button,
  Image,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../components/PlusIcon";
import { DeleteIcon } from "../components/DeleteIcon";
import { MinusIcon } from "../components/MinusIcon";
import { SearchIcon } from "../components/SearchIcon.jsx";
import { CartIcon } from "../components/CartIcon.jsx";
import Products from "../components/Products";
import ProductsData from "./ProductsData.js";
import { columns, CartList } from "./CartData.js";
import CashIcon from "../components/CashIcon.svg";
import CreditIcon from "../components/CreditIcon.svg";

const Customer = () => {
  const location = useLocation();
  const user = location.state?.user;

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return <h1>{item.name}</h1>;
      case "price":
        return <p className="text-bold text-sm capitalize">{item.price}</p>;
      case "quantity":
        return (
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            {item.quantity}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Increase Quantity">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => increaseQuantity(item.id)}
              >
                <PlusIcon />
              </span>
            </Tooltip>
            <Tooltip content="Decrease Quantity">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => decreaseQuantity(item.id)}
              >
                <MinusIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Product">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteItem(item.id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [list] = useState(ProductsData);
  const categories = [
    "Appetizers/Starters",
    "Main Courses/Entrees",
    "Desserts",
    "Beverages/Drinks",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartList, setCartList] = useState(CartList);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCartIconClick = () => {
    onOpen();
  };

  const handleCloseCart = () => {
    onClose();
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };


  const filteredProducts = list.filter(
    (product) =>
      product.type === selectedCategory &&
      product.title.toLowerCase().includes(searchQuery)
  );

  const increaseQuantity = (id) => {
    setCartList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartList(
      (prevList) =>
        prevList
          .map((item) =>
            item.id === id && item.quantity > 0
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const deleteItem = (id) => {
    setCartList((prevList) =>
      prevList
        .map((item) => (item.id === id ? { ...item, quantity: 0 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddToCart = (productName) => {
    const productToAdd = ProductsData.find(
      (product) => product.title === productName
    );
    if (productToAdd) {
      const existingProductIndex = cartList.findIndex(
        (item) => item.name === productName
      );
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increment its quantity
        const updatedCartList = cartList.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartList(updatedCartList);
      } else {
        // Determine the highest existing ID in the CartList
        const highestId = cartList.length > 0 ? cartList[cartList.length - 1].id : -1;
        // Increment the ID for the new product
        const newId = highestId + 1;
        const newProduct = {
          id: newId,
          name: productName,
          price: productToAdd.price,
          quantity: 1,
        };
        setCartList([...cartList, newProduct]);
      }
    }
  };


  const subtotal = useMemo(() => {
    return cartList.reduce(
      (sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity,
      0
    );
  }, [cartList]);
  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Navbar>
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/src/assets/OrderlyOnlyWhite.png"
                alt="ORDERLY Logo"
                width={50}
                height={50}
              />
            </Link>
            <p className="font-bold text-inherit">ORDERLY</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive>
              <Link href="/waiter" aria-current="page" color="secondary">
                Waiter Demo
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/chef">
                Chef Demo
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent as="div" justify="end">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              onChange={handleSearchChange} // Connect handleSearchChange to the input's onChange event
            />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.userName}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.userName}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  {" "}
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Link
              color="foreground"
              style={{ cursor: "pointer" }}
              onPress={handleCartIconClick}
            >
              <CartIcon />
            </Link>
          </NavbarContent>
        </Navbar>

        <Modal isOpen={isOpen} onClose={onClose} size="5xl" backdrop="blur">
          <ModalContent>
            <ModalHeader>Shopping Cart</ModalHeader>
            <ModalBody>
              <Table aria-label="Cart table">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody emptyContent={"You haven't added anything to the cart yet"} items={cartList}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>
                          {columnKey === "actions" ? (
                            <div className="relative flex items-center gap-2">
                              <Tooltip content="Increase Quantity">
                                <span
                                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                  onClick={() => increaseQuantity(item.id)}
                                >
                                  <PlusIcon />
                                </span>
                              </Tooltip>
                              <Tooltip content="Decrease Quantity">
                                <span
                                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                  onClick={() => decreaseQuantity(item.id)}
                                >
                                  <MinusIcon />
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete Product">
                                <span
                                  className="text-lg text-danger cursor-pointer active:opacity-50"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <DeleteIcon />
                                </span>
                              </Tooltip>
                            </div>
                          ) : (
                            renderCell(item, columnKey)
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Textarea
                label="Note"
                placeholder="Enter a note for your order for the chef to see"
              />
              <div>
                <h1>Subtotal: ${subtotal.toFixed(2)}</h1>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onPress={handleOpenPaymentModal}>
                Order
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Payment Modal */}
        <Modal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal} backdrop="blur">
          <ModalContent>
            <ModalHeader className="text-4xl justify-center">Payment Options</ModalHeader>
            <ModalBody>
              <div className="flex justify-center gap-2">
                <Card shadow="sm" isPressable onPress={() => console.log("Credit Card pressed")} style={{ width: "100%", height: "100%" }}>
                  <CardBody className="flex justify-center items-center p-0" style={{ width: "100%", height: "100%" }}>
                    <Image
                      src={CreditIcon}
                      alt="Credit Card"
                      className="object-contain"
                    />
                    <b className="mt-2">Credit Card</b>
                  </CardBody>
                </Card>
                <Card shadow="sm" isPressable onPress={() => console.log("Cash pressed")} style={{ width: "100%", height: "100%" }}>
                  <CardBody className="flex justify-center items-center p-0" style={{ width: "100%", height: "100%" }}>
                    <Image
                      src={CashIcon}
                      alt="Cash"
                      className="object-contain"
                    />
                    <b className="mt-2">Cash</b>
                  </CardBody>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button color="danger" variant="light" onPress={handleClosePaymentModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>



        <div className="flex" style={{ paddingTop: "7.5vh" }}>
          <div className="w-1/4 p-4">
            {categories.map((category, index) => (
              <div key={index} style={{ paddingBottom: "1.5vh" }}>
                <Link
                  className={`text-inherit ${selectedCategory === category
                      ? "text-4xl font-bold text-secondary"
                      : "text-2xl text-foreground"
                    }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <Products
              products={filteredProducts}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Customer;
