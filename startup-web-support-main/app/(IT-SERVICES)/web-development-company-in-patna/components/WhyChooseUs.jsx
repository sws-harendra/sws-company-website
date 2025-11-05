"use client"
import { gridContainerVariants, imageVariants2, textChildVariants } from '@/components/GlobalCss';
import { motion } from 'framer-motion';


const WhyChooseUs = () => {
    return (
        <section className="bg-[#1e88e5] text-white py-24  overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={gridContainerVariants}

                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


                    <motion.img
                        variants={imageVariants2}
                        src="web.jpg"
                        alt="Web Development Team"
                        className="w-full h-auto rounded-lg"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={gridContainerVariants}
                    >
                        <motion.h2
                            className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
                            variants={textChildVariants}
                        >
                            Establish a Fast, Responsive Website with a Trusted Partner
                        </motion.h2>

                        <motion.p className="text-slate-100 text-lg leading-relaxed mb-8" variants={textChildVariants}>
                            Your website is the first impression of your business. We deliver not just impressive, but high-performing websites that grow your business. With expertise trusted by startups and established brands, we bring your online vision to life.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <motion.div variants={textChildVariants}>
                                <h3 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500 mb-2">
                                </h3>
                                <p className="text-slate-100 font-medium">Dynamic Projects Delivered</p>
                            </motion.div>
                            <motion.div variants={textChildVariants}>
                                <h3 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
                                </h3>
                                <p className="text-slate-100 font-medium">of Indian Businesses are Online</p>
                            </motion.div>
                        </div>

                        <motion.div variants={textChildVariants}>
                            <motion.button
                                className="bg-sky-600 hover:bg-sky-700 shadow-xl hover:shadow-2xl text-white font-bold py-4 px-8 rounded-full transition-colors duration-300 text-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Hire Us
                            </motion.button>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;