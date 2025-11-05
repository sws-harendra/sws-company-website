// dummyProjects data (updated with slug and more details)
export const dummyProjects = [
    {
        id: 1,
        slug: 'shopsphere-ecommerce', // Unique slug
        title: 'E-commerce Platform "ShopSphere"',
        category: 'Web Development',
        description: 'A full-stack e-commerce solution with product management, user accounts, and payment gateway integration.',
        imageUrl: '/portfolio.jpg',
        details: {
            challenge: 'Client needed a scalable platform to handle growing product inventory and user base.',
            solution: 'Built using Next.js, Node.js, and MongoDB, with Stripe integration for payments.',
            technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
            gallery: [
                '/portfolio.jpg',
                '/portfolio.jpg',
            ]
        }
    },
    {
        id: 2,
        slug: 'finsecure-mobile-app', // Unique slug
        title: 'Mobile Banking App "FinSecure"',
        category: 'App Development',
        description: 'A secure and user-friendly mobile app for banking transactions, balance checks, and financial planning.',
        imageUrl: '/portfolio.jpg',
        details: {
            challenge: 'Ensuring top-level security while maintaining an intuitive user experience.',
            solution: 'Developed native iOS and Android apps with biometric authentication and end-to-end encryption.',
            technologies: ['Swift (iOS)', 'Kotlin (Android)', 'Firebase', 'Encryption APIs'],
            gallery: [
                '/portfolio.jpg',
                '/portfolio.jpg',
            ]
        }
    },
    // ... Add slugs and details for all other projects ...
    {
        id: 10,
        slug: 'realestate-portal',
        title: 'Real Estate Listing Portal',
        category: 'Web Development',
        description: 'A comprehensive portal for browsing property listings, connecting buyers/renters with agents.',
        imageUrl: '/portfolio.jpg',
        details: {
            challenge: 'Handling large amounts of data and providing advanced search filters.',
            solution: 'Developed using React and a custom backend API with efficient database indexing.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API'],
            gallery: [
                '/portfolio.jpg',
                '/portfolio.jpg',
            ]
        }
    },
];

// Helper function to find project by slug (replace with actual data fetching later)
export const getProjectBySlug = (slug) => {
    return dummyProjects.find(project => project.slug === slug);
};

// Function to get all slugs (needed for generateStaticParams)
export const getAllProjectSlugs = () => {
    return dummyProjects.map(project => ({ slug: project.slug }));
}