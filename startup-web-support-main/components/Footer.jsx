// app/components/Footer.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Column 1: Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image className='rounded' src="/icon.png" alt="Company Logo" width={140} height={120} />
                        </Link>
                        <p className="text-sm">
                            Transform your business with our expert web and mobile app development. We craft custom solutions and use cutting-edge tech to boost your brand’s online presence.            </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/child-safety" className="hover:text-white transition-colors">Child-safety</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/it-internship" className="hover:text-white transition-colors">IT internship</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Our Services */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Our Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/web-development-company-in-patna" className="hover:text-white transition-colors">Website Development</Link></li>
                            <li><Link href="/mobile-app-development-services-in-patna" className="hover:text-white transition-colors">App Development</Link></li>
                            <li><Link href="/digital-marketing-agency-in-patna" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                            <li><Link href="/software-development" className="hover:text-white transition-colors">Software Development</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-white mt-1 shrink-0" />
                                <span>3rd Floor, Parvati Tower, Phulwari Rd, Jagdeo Path, Patna, Bihar 800014</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-white shrink-0" />
                                <a href="mailto:info@yourcompany.com" className="hover:text-white transition-colors">info@startupwebsupport.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-white shrink-0" />
                                <a href="tel:+911234567890" className="hover:text-white transition-colors">+917479499718</a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section: Social Media and Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
                        &copy; {currentYear} Startup Web Support. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook /></Link>
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter /></Link>
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin /></Link>
                        <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;