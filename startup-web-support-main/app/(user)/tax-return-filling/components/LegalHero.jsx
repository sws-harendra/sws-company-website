"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline } from 'react-icons/io5'; // Icon representing legality/trust
import { gridContainerVariants, headerTextVariants, textChildVariants } from '@/components/GlobalCss';

const LegalHero = () => {

    return (
        <section className="bg-[url(/marketing.svg)] text-white py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-black/75"></div>
            <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={gridContainerVariants}
                >
                    {/* Icon */}
                    <motion.div variants={textChildVariants} className="mb-6">
                        <IoShieldCheckmarkOutline className="text-6xl text-sky-500 mx-auto opacity-80" />
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl text-sky-500 font-extrabold leading-tight tracking-tight drop-shadow-lg"
                        variants={headerTextVariants}
                    >
                        Legal Information & Registrations
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mt-6 leading-relaxed drop-shadow-md"
                        variants={textChildVariants}
                    >
                        Find all necessary information regarding our company's legal status, registrations, and compliance details. We believe in transparency and adhering to regulations.
                    </motion.p>

                    {/* Optional: Breadcrumbs if it's a subpage */}
                    {/* <motion.nav className="mt-8 text-slate-300" variants={itemVariants}>
               Home / Legal
             </motion.nav> */}
                </motion.div>
            </div>
        </section>
    );
};

export default LegalHero;