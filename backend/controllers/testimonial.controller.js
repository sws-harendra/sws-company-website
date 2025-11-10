const { Testimonial } = require("../models");

// Create testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { client_name, client_position, text } = req.body;

    if (!client_name || !text) {
      return res
        .status(400)
        .json({ error: "client_name and text are required." });
    }

    const testimonial = await Testimonial.create({
      client_name,
      client_position,
      text,
    });

    res.status(201).json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Not found" });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const { client_name, client_position, text } = req.body;
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) return res.status(404).json({ error: "Not found" });

    await testimonial.update({ client_name, client_position, text });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ error: "Not found" });

    await testimonial.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
