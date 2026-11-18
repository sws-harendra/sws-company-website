"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [existing] = await queryInterface.sequelize.query(
      "SELECT id FROM charities LIMIT 1;"
    );

    if (existing && existing.length > 0) {
      return;
    }

    await queryInterface.bulkInsert("charities", [
      {
        title: "Digital Literacy & STEM Education for Underprivileged Children",
        subtitle: "Empowering 500+ young minds with computers, coding labs, and digital mentorship",
        category: "Education & Youth",
        description:
          "Bridging the digital divide by equipping rural and low-income school centers with modern computer labs, internet connectivity, and volunteer-led STEM coding bootcamps. Every child deserves access to modern tools that unlock a brighter future in tech and innovation.",
        image_url:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
        ]),
        location: "Patna & Rural Bihar, India",
        date: "Ongoing Mission",
        impact_number: "650+ Students Trained",
        target_amount: 150000.0,
        raised_amount: 112000.0,
        status: "active",
        featured: true,
        order: 1,
        redirect_url: "/contact-us",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Winter Warmth & Nutrition Drive",
        subtitle: "Providing thermal blankets, winter kits, and warm wholesome meals to homeless families",
        category: "Hunger & Relief",
        description:
          "During severe winter drops, thousands of families and elder citizens in underprivileged districts struggle without protective wear and nutritious sustenance. Our annual winter drive mobilizes hot community kitchens, distributed 1,200 thermal blankets, and essential warm clothing packets.",
        image_url:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
        ]),
        location: "Bihar Urban Settlements",
        date: "Annual Winter Initiative",
        impact_number: "1,200+ Blankets & Kits Given",
        target_amount: 80000.0,
        raised_amount: 80000.0,
        status: "completed",
        featured: true,
        order: 2,
        redirect_url: "/contact-us",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Clean Water Access & Sanitation for Village Schools",
        subtitle: "Installing solar-powered water filtration units and hygienic wash facilities",
        category: "Health & Sanitation",
        description:
          "Access to safe drinking water drastically reduces water-borne illnesses and school absenteeism among young girls. This project installed 10 advanced multi-stage filtration kiosks and renovated sanitation units across 6 regional government elementary schools.",
        image_url:
          "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=1200&q=80",
        ]),
        location: "Gaya & Vaishali Districts",
        date: "Phase 2 Active",
        impact_number: "4,000+ Liters Clean Water/Day",
        target_amount: 120000.0,
        raised_amount: 94000.0,
        status: "active",
        featured: false,
        order: 3,
        redirect_url: "/contact-us",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("charities", null, {});
  },
};
