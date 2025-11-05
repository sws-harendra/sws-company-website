export const dummyBlogPosts = [
  {
    id: 1,
    slug: 'importance-of-seo-for-startups', // Unique URL-friendly slug
    title: 'Why SEO is Crucial for Startups in Patna',
    excerpt: 'Learn how Search Engine Optimization can help your new business gain visibility and attract customers in the competitive Patna market.',
    imageUrl: '/marketing.svg',
    author: 'Amit Kumar',
    date: 'October 22, 2025',
    category: 'SEO',
    content: `
      <p>In today's digital age, having an online presence is not enough. You need to be visible. Search Engine Optimization (SEO) is the key to unlocking that visibility, especially for startups operating in a competitive environment like Patna.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-3">Reach Your Target Audience</h3>
      <p>Effective SEO helps your website appear in front of potential customers who are actively searching for the products or services you offer. By targeting relevant keywords like "best software company in Patna" or "digital marketing services Bihar", you attract qualified leads.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-3">Build Credibility and Trust</h3>
      <p>Ranking higher on Google builds trust. Users perceive top-ranking sites as more credible and authoritative. For a startup, this trust is invaluable in establishing your brand.</p>
      <p class="mt-4">Investing in SEO from the beginning is investing in the long-term growth and success of your startup.</p>
    ` // Content can be Markdown or HTML string
  },
  {
    id: 2,
    slug: 'choosing-the-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Web Application',
    excerpt: 'Understand the factors to consider when selecting technologies like React, Node.js, PHP, etc., for your next web development project.',
    imageUrl: '/marketing.svg',
    author: 'Priya Sharma',
    date: 'October 18, 2025',
    category: 'Web Development',
    content: `
      <p>Selecting the right technology stack is a critical decision that impacts your application's performance, scalability, and maintenance costs. Factors like project requirements, team expertise, scalability needs, and budget play a crucial role.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-3">Popular Choices</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Frontend:</strong> React, Vue, Angular</li>
        <li><strong>Backend:</strong> Node.js, Python (Django/Flask), PHP (Laravel), Java (Spring)</li>
        <li><strong>Database:</strong> PostgreSQL, MongoDB, MySQL</li>
      </ul>
      <p>At Startup Web Support, we analyze your specific needs to recommend and implement the most suitable and future-proof tech stack for your project.</p>
    `
  },
  // ... Add 8 more dummy blog posts here ...
  {
    id: 3,
    slug: 'mobile-app-trends-2026',
    title: 'Top Mobile App Development Trends to Watch in 2026',
    excerpt: 'Stay ahead of the curve with insights into the latest trends shaping the mobile application landscape.',
    imageUrl: '/marketing.svg',
    author: 'Ravi Singh',
    date: 'October 15, 2025',
    category: 'App Development',
    content: `<p>Mobile technology evolves rapidly. Key trends for 2026 include advancements in AI and Machine Learning integration, increased adoption of cross-platform development for faster deployment, focus on super-apps, and enhanced security measures using biometrics.</p>`
  }
];

// Helper functions (keep these in the same file or separate lib)
export const getAllBlogPosts = () => {
  // In a real app, you'd fetch this from a CMS or database
  return dummyBlogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
};

export const getBlogPostBySlug = (slug) => {
  return dummyBlogPosts.find(post => post.slug === slug);
};

export const getAllBlogSlugs = () => {
    return dummyBlogPosts.map(post => ({ slug: post.slug }));
}