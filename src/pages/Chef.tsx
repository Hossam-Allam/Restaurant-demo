import React from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { useLocation } from "react-router-dom";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ChefInterface from "/src/pages/ChefInterface.tsx";

const Chef = () => {
	const location = useLocation();
  	const user = location.state?.user;
	return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      	<Navbar isBordered>
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
              <Link color="foreground" href="/customer">
                Customer Demo
              </Link>
            </NavbarItem>
          </NavbarContent>

	      <NavbarContent as="div" justify="end">
	        <Dropdown placement="bottom-end">
	          <DropdownTrigger>
	            <Avatar
	              isBordered
	              as="button"
	              className="transition-transform"
	              color="secondary"
	              name="Jason Hughes"
	              size="sm"
	            />
	          </DropdownTrigger>
	          <DropdownMenu aria-label="Profile Actions" variant="flat">
	            <DropdownItem key="profile" className="h-14 gap-2">
	              <p className="font-semibold">Signed in as</p>
	              <p className="font-semibold">zoey@example.com</p>
	            </DropdownItem>
	            <DropdownItem key="settings">My Settings</DropdownItem>
	            <DropdownItem key="logout" color="danger">
	              Log Out
	            </DropdownItem>
	          </DropdownMenu>
	        </Dropdown>
	      </NavbarContent>
	    </Navbar>
	   <div className="App">
	   <Card>
   			<CardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
   			<h1 style={{ fontSize: 'clamp(1rem, 30px, 3rem)', textAlign: 'center', fontWeight: 'bold', margin: 0 }}> ORDERS </h1>
   			</CardHeader>
   			<CardBody>
      		<ChefInterface />
      		</CardBody>
      	</Card>
    </div>
      </NextThemesProvider>
    </NextUIProvider>

  );
};

export default Chef;