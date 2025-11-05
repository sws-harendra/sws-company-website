export const headerTextVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
};
export const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};
export const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 14 },
    },
};
export const imageVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 150, damping: 12 }
    }
};
export const imageVariants2 = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            duration: 1.5
        }
    }
}
export const cardContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
}

export const bellShakeAnimation = {
    rotate: [0, 15, -15, 15, -15, 0],
    transition: {
        duration: 0.9,
        ease: 'easeInOut',
    },
};

export const textChildVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 80, damping: 10 },
    },
};



