"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Icons from lucide-react
import {
  Menu,
  Home,
  Server,
  Code,
  Smartphone,
  Computer,
  ShoppingCart,
  Globe,
  MessageCircle,
  Megaphone,
  Search,
  MousePointerClick,
  ThumbsUp,
  BadgeCheck,
  Mail,
  Video,
  FileText,
  MessageSquare,
  Scale,
  Shield,
  Receipt,
  Users,
  Briefcase,
  Phone,
  NewspaperIcon,
} from "lucide-react";
import Image from "next/image";
import { FaProductHunt, FaWhatsapp } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const homeLink = {
  href: "/",
  label: "Home",
  icon: <Home className="h-4 w-4 text-sky-600" />,
};

const dropdownLinksConfig = [
  {
    title: "IT Services",
    icon: <Server className="h-4 w-4 text-sky-600" />,
    links: [
      {
        href: "/web-development-company-in-patna",
        title: "Website Development",
        icon: <Code className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/mobile-app-development-services-in-patna",
        title: "App Development",
        icon: <Smartphone className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/software-development",
        title: "Software Development",
        icon: <Computer className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/ecommerce-website-development",
        title: "Ecommerce Development",
        icon: <ShoppingCart className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/domain-and-hosting",
        title: "Domain and Hosting",
        icon: <Globe className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/sms-push-notification",
        title: "SMS & Push Notification",
        icon: <MessageCircle className="h-4 w-4 text-sky-600" />,
      },
    ],
  },
  {
    title: "Digital Marketing",
    icon: <Megaphone className="h-4 w-4 text-sky-600" />,
    links: [
      {
        href: "/seo-company-in-patna",
        title: "SEO",
        icon: <Search className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/digital-marketing-agency-in-patna",
        title: "Digital Marketing",
        icon: <Megaphone className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/sem-ppc-service-in-patna",
        title: "SEM-PPC",
        icon: <MousePointerClick className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/smo-smm",
        title: "SMO | SMM",
        icon: <ThumbsUp className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/branding-promotion",
        title: "Branding & Promotion",
        icon: <BadgeCheck className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/email-marketing",
        title: "Email Marketing",
        icon: <Mail className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/video-marketing",
        title: "Video Marketing",
        icon: <Video className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/content-marketing",
        title: "Content Marketing",
        icon: <FileText className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/whatsapp-marketing",
        title: "Whatsapp Marketing",
        icon: <FaWhatsapp className="h-4 w-4 text-sky-600" />,
      },
    ],
  },
  {
    title: "Products",
    icon: (
      <MdOutlineProductionQuantityLimits className="h-4 w-4 text-sky-600" />
    ),
    links: [
      {
        href: "/products/hospital-management-system",
        title: "Hospital Management System",
        icon: <Megaphone className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/products/balaji-juice-corner",
        title: "Hostel Management System",
        icon: <Megaphone className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/products/sathi-cab",
        title: "Food Delievery App",
        icon: <Megaphone className="h-4 w-4 text-sky-600" />,
      },
      {
        href: "/products/sathi-cab",
        title: "Ride Booking Application",
        icon: <Megaphone className="h-4 w-4 text-sky-600" />,
      },
    ],
  },
  // {
  //     title: "Legal",
  //     icon: <Scale className="h-4 w-4 text-sky-600" />,
  //     links: [
  //         { href: "/legal/tax-return-filling", title: "Tax Return Filling", icon: <Receipt className="h-4 w-4 text-sky-600" /> },
  //         { href: "/legal/privacy-policy", title: "Privacy Policy", icon: <Shield className="h-4 w-4 text-sky-600" /> },
  //     ],
  // },
];
const otherLinks = [
  {
    href: "/legal",
    label: "Legal",
    icon: <Scale className="h-4 w-4 text-sky-600" />,
  },
  {
    href: "/about",
    label: "About Us",
    icon: <Users className="h-4 w-4 text-sky-600" />,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: <NewspaperIcon className="h-4 w-4 text-sky-600" />,
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: <Briefcase className="h-4 w-4 text-sky-600" />,
  },
  {
    href: "/contact",
    label: "Contact Us",
    icon: <Phone className="h-4 w-4 text-sky-600" />,
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur py-1">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Image src="/icon.png" alt="logo" width="120" height="100" />
        </Link>

        {/* ================================== */}
        {/* DESKTOP NAVIGATION */}
        {/* ================================== */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href={homeLink.href}
                className={
                  navigationMenuTriggerStyle() + " flex items-center gap-2"
                }
              >
                {homeLink.icon} {homeLink.label}
              </Link>
            </NavigationMenuItem>

            {dropdownLinksConfig.map((dropdown) => (
              <NavigationMenuItem key={dropdown.title}>
                <NavigationMenuTrigger className="flex items-center text-center gap-2">
                  {dropdown.icon} {dropdown.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-3 w-[500px] gap-3 p-4 md:w-[600px]">
                    {dropdown.links.map((service) => (
                      <ListItemSimple
                        key={service.title}
                        title={service.title}
                        href={service.href}
                        icon={service.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            {otherLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className={
                    navigationMenuTriggerStyle() + " flex items-center gap-2"
                  }
                >
                  {link.icon} {link.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ================================== */}
        {/* MOBILE NAVIGATION                 */}
        {/* ================================== */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation menu
                </SheetDescription>
              </SheetHeader>

              <div className="p-2">
                <Link href="/" className="mb-6 flex items-center gap-2">
                  <Image src="/icon.png" alt="logo" width="120" height="100" />
                </Link>

                <div className="grid gap-2">
                  <Link
                    href={homeLink.href}
                    className="flex items-center gap-4 rounded-md p-2 text-lg font-medium hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {homeLink.icon} {homeLink.label}
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    {dropdownLinksConfig.map((dropdown) => (
                      <AccordionItem
                        key={dropdown.title}
                        value={dropdown.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}
                      >
                        <AccordionTrigger className="flex items-center gap-4 rounded-md p-2 text-lg font-medium hover:bg-accent [&[data-state=open]>svg]:rotate-180">
                          <div className="flex items-center gap-4">
                            {dropdown.icon} {dropdown.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-1 pl-8">
                            {dropdown.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-4 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {link.icon} {link.title}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {otherLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-4 rounded-md p-2 text-lg font-medium hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon} {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItemSimple = ({ className, title, href, icon, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`flex items-center gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          {icon}
          <span className="text-sm font-medium leading-none">{title}</span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
