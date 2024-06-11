import React from "react";
import { useRef, useEffect, useState, useCallback } from 'react';
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, ButtonGroup, Image} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Textarea} from "@nextui-org/react";
import {Card, CardBody, CardHeader, CardFooter, Divider} from "@nextui-org/react";
import {Select, SelectItem, Avatar} from  "@nextui-org/react";
//import { Text } from "@nextui-org/react";
import {DateInput} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";
import {CalendarIcon} from '../components/CalendarIcon';
import {MailIcon} from '../components/MailIcon.jsx';
import {EyeFilledIcon} from "../components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/EyeSlashFilledIcon";
import {UserIcon} from '../components/UserIcon';
import {LockIcon} from '../components/LockIcon.jsx';
import {PhoneIcon} from '../components/PhoneIcon.jsx';
import "./Home.css";
import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  const deviceAspectRatio = window.innerWidth / window.innerHeight;
  let firstVideoSrc = "/src/assets/a1980x1024.mp4";
  let secondVideoSrc = "/src/assets/b1980x1024.mp4";
    
  if (Math.abs(deviceAspectRatio - 1980 / 1024) < Math.abs(deviceAspectRatio - 1024 / 1980) && Math.abs(deviceAspectRatio - 1980 / 1024) < Math.abs(deviceAspectRatio)) {
    // 1980:1024 is closest to device aspect ratio
    // Change the source of first and second videos accordingly
    firstVideoSrc = "/src/assets/a1980x1024.mp4";
    secondVideoSrc = "/src/assets/b1980x1024.mp4";
  } else if (Math.abs(deviceAspectRatio - 1024 / 1980) < Math.abs(deviceAspectRatio - 1)) {
    // 1024:1980 is closest to device aspect ratio
    // Change the source of first and second videos accordingly
    firstVideoSrc = "/src/assets/a1024x1980.mp4";
    secondVideoSrc = "/src/assets/b1024x1980.mp4";
  } else {
    // 1:1 is closest to device aspect ratio
    // Change the source of first and second videos accordingly
    firstVideoSrc = "/src/assets/a2880x2880.mp4";
    secondVideoSrc = "/src/assets/b2880x2880.mp4";
  }

  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const [firstVideoEnded, setFirstVideoEnded] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {isOpen: signUpOpen, onOpen: signUpOpenHandler, onOpenChange: signUpOpenChange} = useDisclosure();

  useEffect(() => {
    const handleFirstVideoEnded = () => {
      setFirstVideoEnded(true);
    };

    const firstVideoElement = firstVideoRef.current;

    if (firstVideoElement) {
      firstVideoElement.addEventListener('ended', handleFirstVideoEnded);
      firstVideoElement.play().catch(error => {
        console.error('Error playing first video:', error);
      });
    }

    return () => {
      if (firstVideoElement) {
        firstVideoElement.removeEventListener('ended', handleFirstVideoEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (firstVideoEnded && secondVideoRef.current) {
      // Hide the first video once it ends
      firstVideoRef.current.style.display = 'none';
      // Display and play the second video
      secondVideoRef.current.style.display = 'block';
      secondVideoRef.current.play();
    }
  }, [firstVideoEnded]);


const sections = ['main','features1'];

  const smoothScroll = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 1; // Adding a small offset
  const distance = targetPosition - startPosition;
  const duration = 800;
  let startTime: number | null = null;

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};
const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    smoothScroll(targetId);
  };
const handleScroll = useCallback((e: WheelEvent) => {
  e.preventDefault();

  const currentSection = sections.findIndex(section => {
    const element = document.getElementById(section);
    return element && window.pageYOffset < element.offsetTop + element.offsetHeight;
  });

  if (currentSection === -1) return;

  if (e.deltaY > 0 && currentSection < sections.length - 1) {
    smoothScroll(sections[currentSection + 1]);
  } else if (e.deltaY < 0 && currentSection > 0) {
    smoothScroll(sections[currentSection - 1]);
  }
}, []);

{/*useEffect(() => {
  window.addEventListener('wheel', handleScroll, { passive: false });
  return () => {
    window.removeEventListener('wheel', handleScroll);
  };
}, [handleScroll]);*/}
  const menuItems = [
    "Features",
    "Demo",
    "Support",
    "Get Started",
    "Login",
    "Sign Up",
  ];
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (

    <>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <div style={{ position: 'fixed', width: '100%', zIndex: '999' }}>
        <Navbar
          isBordered
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
                <Image src="/src/assets/OrderlyOnlyWhite.png" alt="ORDELY Logo" width={50} height={50} />
                <p className="font-bold text-inherit">ORDERLY</p>
              
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
              <Image src="/src/assets/OrderlyOnlyWhite.png" alt="ORDERLY Logo" width={50} height={50} />
              <p className="font-bold text-inherit">ORDERLY</p>
            </NavbarBrand>
            <NavbarItem>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Dropdown isOpen={isDropdownOpen}>
                <DropdownTrigger>
                    <Link color="foreground" href="#features1" onClick={(e) => handleLinkClick(e, 'features1')}>
                    Features
                  </Link>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                  <DropdownItem
                    key="Overview"
                    description="An overview of key features"
                    as="a"
                    href="#features1"
                    onClick={(e) => handleLinkClick(e, 'features1')}
                  >
                    Overview
                  </DropdownItem>
                  <DropdownItem
                    key="Customer"
                    description="Discover customer related features"
                    as="a"
                    href="#features2"
                    onClick={(e) => handleLinkClick(e, 'features2')}
                  >
                    Customer
                  </DropdownItem>
                  <DropdownItem
                    key="Owner"
                    description="Discover owner related features"
                    as="a"
                    href="#features3"
                    onClick={(e) => handleLinkClick(e, 'features3')}
                  >
                    Owner
                  </DropdownItem>
                  <DropdownItem
                    key="Waiter"
                    description="Discover waiter related features"
                    as="a"
                    href="#features4"
                    onClick={(e) => handleLinkClick(e, 'features4')}
                  >
                    Waiter
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#demo" aria-current="page" onClick={(e) => handleLinkClick(e, 'demo')}>
                Demo
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#support" color="foreground" onClick={(e) => handleLinkClick(e, 'support')}>
                Support
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link color="primary" href="/customer">
                Get Started
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link onPress={onOpen} href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button  as={Link} color="primary" href="#" variant="flat" onPress={signUpOpenHandler}>
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  color={
                    index === 1 ? "primary" : index === menuItems.length - 1 ? "warning" : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>


      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 custom-modal-header">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="Email"
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                 <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal 
        isOpen={signUpOpen} 
        onOpenChange={signUpOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 custom-modal-header">Sign Up</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  isRequired
                  label="Full Name"
                  placeholder="Enter your full name"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  isRequired
                  type="Email"
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                 <Input
                  isRequired
                  label="Password"
                  variant="bordered"
                  placeholder="Create a password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <DateInput
                  label="Birthdate"
                  variant="bordered"
                  placeholderValue={new CalendarDate(1995, 11, 6)} 
                  endContent={
                   <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Select
                  label="Select country"
                  variant="bordered"
                >
                  <SelectItem
                    key="turkey"
                    startContent={<Avatar alt="Turkey" className="w-6 h-6" src="https://flagcdn.com/tr.svg" />}
                  >
                    Turkey
                  </SelectItem>
                </Select>
                <Input
                  type="url"
                  label="Phone Number"
                  placeholder="xxx-xxx-xxxx"
                  variant="bordered"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">+90</span>
                    </div>
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    </div>
                  }
                />
                <Textarea
                  label="Address"
                  variant="bordered"
                  placeholder="Enter your full address"
                  disableAnimation
                  classNames={{
                    input: "resize-y",
                  }}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Newstellers
                  </Checkbox>
                  <Link color="primary" href="#" size="sm" onPress={onOpen}>
                    Already have an account?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div id="main">
      {/* First Video */}
      <div className="video-container">
        <video
          ref={firstVideoRef}
          autoPlay
          muted
          className="video"
        >
          <source src={firstVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Second Video */}
      <div className="video-container">
        <video
          ref={secondVideoRef}
          autoPlay
          muted
          loop
          className="video"
          style={{ display: 'none' }}
        >
          <source src={secondVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      </div>
      <div className="features-section">
        
      </div>
      {/* Featues Overview Section */}
      <div id="features1" className="relative h-screen" style={{ backgroundImage: `url("/src/assets/purplebg.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="flex justify-center items-center h-screen pb-16"> {/* Added pb-16 for padding */}
          <div className="flex w-3/4">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold bg-gradient-to-b from-blue-700 to-purple-500 bg-clip-text text-transparent" style={{ textShadow: '0px 0px 40px rgba(248,47,257,0.275)', paddingTop:'10vh', paddingBottom:'5vh' }}>
                All you need to manage your restaurant efficiently.
              </h1>

              <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-500 block max-w-full !w-full text-center md:text-left" >Easy to use, and convenient restaurant managament system.</h2>
              <div className="grid grid-cols-2 gap-4 mt-8" style={{ paddingBottom:'5vh' }}>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="inventory logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/inventory.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Inventory Management</p>
                      <p className="text-small text-default-500">Efficient and reliable</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Track your stock levels and manage orders efficiently.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="feedback logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/feedback.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Customer Feedback</p>
                      <p className="text-small text-default-500">Insightful and actionable</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Collect and analyze customer feedback to improve service.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="schedule logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/schedule.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Staff Management</p>
                      <p className="text-small text-default-500">Simplified and intuitive</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Effortlessly oversee team dynamics and streamline employee coordination.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="report logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/report.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Sales Reporting</p>
                      <p className="text-small text-default-500">Comprehensive and detailed</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Get detailed reports on sales and performance metrics.</p>
                  </CardBody>
                </Card>
                
              </div>
              <a className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto" role="button" tabIndex="0" href="/docs/guide/introduction">Get Started
                <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" tabIndex="-1">
                  <path d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                  <path d="M4.08325 14H23.7183" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                </svg>
              </a>
            </div>
            <div className="w-1/2 pt-20">
              <img src="/src/assets/features1.png" alt="Restaurant Management" className="w-full h-full object-contain" />
            </div>
        </div>
      </div>

      {/* Customer Features Section */}
      <div id="features2" className="relative h-screen" style={{ backgroundImage: `url("/src/assets/cyanbg.webp")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="relative flex justify-center items-center h-75vh pb-16"> {/* Adjusted to h-75vh */}
          <div className="flex w-3/4">
            <div className="w-1/2 pt-20">
              <img src="/src/assets/features2.png" alt="Restaurant Management" className="w-full h-full object-contain" />
            </div>
            <div className="w-1/2">
              <h1 className="text-6xl font-bold bg-gradient-to-b from-blue-600 to-cyan-300 bg-clip-text text-transparent" style={{ textShadow: '0px 0px 40px rgba(250,255,255,0.100)', paddingTop:'10vh', paddingBottom:'5vh' }}>
                Enhance Your Dining with Seamless Ordering and Payment
              </h1>
              <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-800 block max-w-full !w-full text-center md:text-left">This customer interface provides a modern dining experience through intuitive system.</h2>
              <div className="grid grid-cols-2 gap-4 mt-8" style={{ paddingBottom:'5vh' }}>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="qr code logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/qr-code.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">QR Code Ordering</p>
                      <p className="text-small text-default-500">Quick and convenient</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Scan the QR code to access the menu and order directly from your phone.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="order notes logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/order-notes.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Order Customization</p>
                      <p className="text-small text-default-500">Personalized to perfection</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Add notes and special requests to your order for a personalized experience.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="direct to chef logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/direct-to-chef.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Direct to Chef</p>
                      <p className="text-small text-default-500">Fast and efficient</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Your order is sent directly to the chef, ensuring prompt preparation.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="payment options logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/payment-options.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Flexible Payment</p>
                      <p className="text-small text-default-500">Convenient and secure</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Pay directly through the app or call a waiter for assistance.</p>
                  </CardBody>
                </Card>
              </div>
              <a className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto" role="button" tabIndex="0" href="/docs/guide/introduction">Get Started
                <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" tabIndex="-1">
                  <path d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                  <path d="M4.08325 14H23.7183" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Features Section */}
      <div id="features3" className="relative h-screen" style={{ backgroundImage: `url("/src/assets/yellowbg.webp")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="relative flex justify-center items-center h-75vh pb-16"> {/* Added pb-16 for padding */}
          <div className="flex w-3/4">
            <div className="w-1/2">
              <h1 className="text-6xl font-bold bg-gradient-to-b from-orange-600 to-yellow-600 bg-clip-text text-transparent" style={{ textShadow: '0px 0px 40px rgba(250,255,255,0.100)', paddingTop:'10vh', paddingBottom:'5vh' }}>
                Manage Your Restaurant with Ease and Efficiency
              </h1>
              <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-600 block max-w-full !w-full text-center md:text-left">This owner interface provides comprehensive tools for all your management needs.</h2>
              <div className="grid grid-cols-2 gap-4 mt-8" style={{ paddingBottom:'5vh' }}>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="employee management logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/employee-management.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Employee Management</p>
                      <p className="text-small text-default-500">Edit and view employee information</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Add employees to the system, edit salaries, change teams, and adjust shifts.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="menu management logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/menu-management.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Menu Management</p>
                      <p className="text-small text-default-500">Add, remove, and edit menu items</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Add and remove products, change prices, and implement dynamic pricing.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="dynamic pricing logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/dynamic-pricing.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Dynamic Pricing</p>
                      <p className="text-small text-default-500">Optimize pricing strategies</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Implement and manage dynamic pricing to maximize revenue.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="reporting and stats logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/reporting-stats.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Reporting & Stats</p>
                      <p className="text-small text-default-500">Extensive performance metrics</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>View product performance, income reports, net profit, and inventory details.</p>
                  </CardBody>
                </Card>
              </div>
              <a className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto" role="button" tabIndex="0" href="/docs/guide/introduction">Get Started
                <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" tabIndex="-1">
                  <path d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                  <path d="M4.08325 14H23.7183" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                </svg>
              </a>
            </div>
            <div className="w-1/2 pt-20">
              <img src="/src/assets/features3.png" alt="Restaurant Management" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Waiter Features Section */}
      <div id="features4" className="relative h-screen" style={{ backgroundImage: `url("/src/assets/greenbg.webp")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-35"></div>
        <div className="relative flex justify-center items-center h-75vh pb-16">
          <div className="flex w-3/4">
            <div className="w-1/2 pt-20">
              <img src="/src/assets/features4.png" alt="Restaurant Management" className="w-full h-full object-contain" />
            </div>
            <div className="w-1/2">
              <h1 className="text-6xl font-bold bg-gradient-to-b from-green-500 to-cyan-300 bg-clip-text text-transparent" style={{ textShadow: '0px 0px 40px rgba(250,255,255,0.100)', paddingTop:'10vh', paddingBottom:'5vh' }}>
                Streamline Your Service with Efficient Task Management
              </h1>
              <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-800 block max-w-full !w-full text-center md:text-left">This waiter interface optimizes your workflow with intuitive features.</h2>
              <div className="grid grid-cols-2 gap-4 mt-8" style={{ paddingBottom:'5vh' }}>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="directions logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/directions.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Directions</p>
                      <p className="text-small text-default-500">Know where to go</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Receive directions on which table to attend and which order to deliver.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="order management logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/order-management.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Order Management</p>
                      <p className="text-small text-default-500">Efficient and accurate</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Edit orders and ensure accurate delivery to the correct table.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="task management logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/task-management.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Task Management</p>
                      <p className="text-small text-default-500">Automated and efficient</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>Manage your tasks automatically and efficiently with our system.</p>
                  </CardBody>
                </Card>
                <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="customer details logo"
                      height={80}
                      radius="xl"
                      src="/src/assets/customer-details.png"
                      width={80}
                    />
                    <div className="flex flex-col">
                      <p className="text-md">Customer Details</p>
                      <p className="text-small text-default-500">Personalized service</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>View customer details to provide personalized service and suggestions.</p>
                  </CardBody>
                </Card>
              </div>
              <a className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto" role="button" tabIndex="0" href="/docs/guide/introduction">Get Started
                <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" tabIndex="-1">
                  <path d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                  <path d="M4.08325 14H23.7183" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Demo Features Section */}
      <div id="demo" className="relative h-screen" style={{ backgroundImage: `url("/src/assets/bluebg.webp")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex justify-center items-center min-h-screen pb-16"> {/* Changed h-75vh to min-h-screen */}
          <div className="flex w-3/4">
            <div className="w-1/2">
              <h1 className="text-6xl font-bold bg-gradient-to-b from-blue-900 to-blue-600 bg-clip-text text-transparent" style={{ textShadow: '0px 0px 40px rgba(250,255,255,0.100)', paddingTop: '10vh', paddingBottom: '5vh' }}>
                Try our demo now!
              </h1>
              <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-600 block max-w-full !w-full text-center md:text-left">You may login to test our online demo, or continue as guest!</h2>
              <div className="grid grid-cols-1 gap-4 mt-8" style={{ paddingBottom: '5vh' }}>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="Email"
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="flex py-2 px-1 justify-between">
                <a className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto" role="button" tabIndex="0" href="/customer">Login
                  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" tabIndex="-1">
                    <path d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                    <path d="M4.08325 14H23.7183" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                  </svg>
                </a>
                <a className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto" role="button" tabIndex="0" href="/customer">Continue as guest
                  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform" tabIndex="-1">
                    <path d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                    <path d="M4.08325 14H23.7183" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-1/2 pt-20">
              <img src="/src/assets/demo.png" alt="Restaurant Management" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
      {/* Support section */}
      <div id="support" className="about-us-section">
          <h1 className='text-6xl font-bold' style={{ paddingBottom: '1.5vh' }}>Support</h1>
          <h1 className="text-lg lg:text-xl font-normal text-default-600">Contact the Orderly Team Directly!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 justify-center mx-auto" style={{ maxWidth: '75vw'}}>
          <Card>
            <CardHeader className="flex gap-3">
              <Image
                alt="WhatsApp logo"
                height={40}
                radius="sm"
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                width={40}
              />
              <div className="flex flex-col">
                <Link showAnchorIcon color="foreground" className="text-md" href="https://wa.me/905616156934" target="_blank" rel="noopener noreferrer">WhatsApp</Link>
              </div>
            </CardHeader>
            <CardBody>
              <p>Contact us via WhatsApp for quick support.</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex gap-3">
              <Image
                alt="Discord logo"
                height={40}
                radius="sm"
                src="https://www.svgrepo.com/show/353655/discord-icon.svg"
                width={40}
              />
              <div className="flex flex-col">
                <Link showAnchorIcon color="foreground" className="text-md" href="https://discord.gg/hMWfK88qj5" target="_blank" rel="noopener noreferrer">Discord</Link>
              </div>
            </CardHeader>
            <CardBody>
              <p>Join our community on Discord for support and updates.</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex gap-3">
              <MailIcon className="text-4xl text-blue-400 pointer-events-none flex-shrink-0" />
              <div className="flex flex-col">
                <Link showAnchorIcon color="foreground" className="text-md" href="mailto:a.foudhaily@stu.khas.edu.tr?subject=Contact%20Orderly">Email</Link>
              </div>
            </CardHeader>
            <CardBody>
              <p>Email us for detailed inquiries and support.</p>
            </CardBody>
          </Card>

            <Card>
              <CardHeader className="flex gap-3">
                <PhoneIcon className="text-4xl text-default-400 pointer-events-none flex-shrink-0" />
                <div className="flex flex-col">
                  <Link showAnchorIcon color="foreground" href="tel:+905616156934">Call Us</Link>
                </div>
              </CardHeader>
              <CardBody>
                <p>Call our team using a cell phone.</p>
              </CardBody>
            </Card>
      </div>
      <div className="flex justify-center mt-8" style={{  paddingBottom: '5vh'}}>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.013750146219!2d28.956393612301678!3d41.02495511827729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f12ab56e17%3A0x9485bbf687d7cbfd!2sKadir%20Has%20University!5e0!3m2!1sen!2str!4v1715217146875!5m2!1sen!2str"
            style={{  width: '75vw', height: '50vh', border: '0', borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
        ></iframe>
    </div>
      </div>
      </NextThemesProvider>
    </NextUIProvider>
    </>
  );
};
export default Home;
