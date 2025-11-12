const {
  Invoice,
  InvoiceService,
  InvoicePayment,
  InvoiceDetail,
  InvoiceHistory,
} = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const path = require("path");

// Generate unique invoice code like AKA-0001
async function generateInvoiceCode() {
  const latest = await Invoice.findOne({ order: [["id", "DESC"]] });
  const next = latest ? latest.id + 1 : 1;
  return `SWS${next.toString().padStart(4, "0")}`;
}

// 🧾 CREATE INVOICE
exports.createInvoice = async (req, res) => {
  const t = await Invoice.sequelize.transaction();
  try {
    const {
      name,
      companyName,
      number,
      gstNumber,
      email,
      address,
      discount,
      services,
      gst,
      payments,
      details,
    } = req.body;

    const code = await generateInvoiceCode();
    const totalAmount =
      services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) -
      parseFloat(discount || 0);
    const totalReceived = payments.reduce(
      (sum, p) => sum + parseFloat(p.receivedAmount || 0),
      0
    );
    const dueAmount = totalAmount - totalReceived;

    const invoice = await Invoice.create(
      {
        invoiceId: code,
        name,
        companyName,
        number,
        gstNumber,
        email,
        address,
        discount,
        gst,
        totalAmount,
        totalReceived,
        dueAmount,
      },
      { transaction: t }
    );

    if (services?.length)
      await InvoiceService.bulkCreate(
        services.map((s) => ({ ...s, invoiceId: invoice.id })),
        { transaction: t }
      );

    if (payments?.length)
      await InvoicePayment.bulkCreate(
        payments.map((p) => ({ ...p, invoiceId: invoice.id })),
        { transaction: t }
      );

    if (details?.length)
      await InvoiceDetail.bulkCreate(
        details.map((d) => ({ ...d, invoiceId: invoice.id })),
        { transaction: t }
      );

    await t.commit();
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE INVOICE (with history tracking)
exports.updateInvoice = async (req, res) => {
  const t = await Invoice.sequelize.transaction();
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: ["services", "payments", "details"],
    });
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    // Save history snapshot before update
    await InvoiceHistory.create({
      invoiceId: invoice.id,
      snapshot: invoice.toJSON(),
      version: invoice.version,
    });

    const { services, payments, details, discount, gst } = req.body;
    const totalAmount =
      services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) -
      parseFloat(discount || 0);
    const totalReceived = payments.reduce(
      (sum, p) => sum + parseFloat(p.receivedAmount || 0),
      0
    );
    const dueAmount = totalAmount - totalReceived;

    await invoice.update(
      {
        ...req.body,
        totalAmount,
        totalReceived,
        dueAmount,
        version: invoice.version + 1,
      },
      { transaction: t }
    );

    // Replace nested items
    await InvoiceService.destroy({ where: { invoiceId: id }, transaction: t });
    await InvoicePayment.destroy({ where: { invoiceId: id }, transaction: t });
    await InvoiceDetail.destroy({ where: { invoiceId: id }, transaction: t });

    await InvoiceService.bulkCreate(
      services.map((s) => ({ ...s, invoiceId: id })),
      { transaction: t }
    );
    await InvoicePayment.bulkCreate(
      payments.map((p) => ({ ...p, invoiceId: id })),
      { transaction: t }
    );
    await InvoiceDetail.bulkCreate(
      details.map((d) => ({ ...d, invoiceId: id })),
      { transaction: t }
    );

    await t.commit();
    res.json({ message: "Invoice updated successfully", invoice });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 📋 GET ALL INVOICES (with pagination, search, history flag)
exports.getAllInvoices = async (req, res) => {
  try {
    const {
      q, // search keyword
      page = 1,
      limit = 10,
      includeHistory = false,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { companyName: { [Op.like]: `%${q}%` } },
        { code: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
      ];
    }
    const baseIncludes = [
      { model: InvoiceService, as: "services" },
      { model: InvoicePayment, as: "payments" },
      { model: InvoiceDetail, as: "details" },
    ];

    if (includeHistory) {
      baseIncludes.push({ model: InvoiceHistory, as: "histories" });
    }

    const invoices = await Invoice.findAndCountAll({
      where,
      include: baseIncludes,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(invoices.count / limit);

    res.json({
      totalItems: invoices.count,
      totalPages,
      currentPage: parseInt(page),
      invoices: invoices.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🔍 GET SINGLE INVOICE BY ID (with all related data + history)
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        { model: InvoiceService, as: "services" },
        { model: InvoicePayment, as: "payments" },
        { model: InvoiceDetail, as: "details" },
        { model: InvoiceHistory, as: "histories" },
      ],
    });

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.downloadInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Fetch invoice with related data
    const invoice = await Invoice.findByPk(id, {
      include: [
        { model: InvoiceService, as: "services" },
        { model: InvoicePayment, as: "payments" },
        { model: InvoiceDetail, as: "details" },
      ],
    });

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    // 2️⃣ Load the HBS template
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "invoices",
      "template1.hbs"
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const compiledTemplate = handlebars.compile(htmlTemplate);

    // 3️⃣ Prepare Data for Template
    // 3️⃣ Prepare Data for Template
    // Read logo and embed as base64 so Puppeteer can render without external requests
    const logoPath = path.join(__dirname, "..", "public", "sws-logo.png");
    let logoSrc = "";
    try {
      const logoBuf = fs.readFileSync(logoPath);
      const b64 = logoBuf.toString("base64");
      logoSrc = `data:image/png;base64,${b64}`;
    } catch (e) {
      console.warn("Invoice logo not found at:", logoPath);
    }
    const totalAmount =
      invoice.services?.reduce(
        (sum, s) => sum + parseFloat(s.amount || 0),
        0
      ) || 0;

    const totalReceived =
      invoice.payments?.reduce(
        (sum, p) => sum + parseFloat(p.receivedAmount || 0),
        0
      ) || 0;

    const gstPercent = parseFloat(invoice.gst) || 0;
    const gstAmount = (totalAmount * gstPercent) / 100;
    const grandTotal =
      totalAmount + gstAmount - (parseFloat(invoice.discount) || 0);
    const dueAmount = grandTotal - totalReceived;

    // ✅ Register Helpers
    handlebars.registerHelper("inc", (value) => parseInt(value) + 1);
    handlebars.registerHelper("numberToWords", (num) => {
      const { toWords } = require("number-to-words");
      if (!num || isNaN(num)) return "Zero";
      return toWords(Math.floor(num));
    });

    // ✅ Final Data (added numeric fields)
    const data = {
      client: {
        invoice_no: invoice.invoiceId,
        created_at: invoice.createdAt
          ? new Date(invoice.createdAt).toLocaleDateString()
          : "",
        name: invoice.name,
        email: invoice.email,
        company_name: invoice.companyName,
        number: invoice.number,
        address: invoice.address,
        gst_client: invoice.details?.find((d) => d.gstNumber)?.gstNumber || "",
        description: invoice.services?.map((s) => s.description) || [],
        hsn: invoice.services?.map((s) => s.hsnCode) || [],
        amount: invoice.services?.map((s) => s.amount) || [],
        mode_of_payment: invoice.payments?.map((p) => p.modeOfPayment) || [],
        payment_date:
          invoice.payments?.map((p) =>
            new Date(p.paymentDate).toLocaleDateString()
          ) || [],
        receive_amount: invoice.payments?.map((p) => p.receivedAmount) || [],
        account_name:
          invoice.details?.find((d) => d.accountName)?.accountName || "",
        accoun_number:
          invoice.details?.find((d) => d.accountNumber)?.accountNumber || "",
        ifsc_code: invoice.details?.find((d) => d.ifsc)?.ifsc || "",
        gst: gstPercent,
        discount: parseFloat(invoice.discount) || 0,
        logoSrc,

        // ✅ Added computed values
        total_amount: totalAmount.toFixed(2),
        gst_amount: gstAmount.toFixed(2),
        grand_total: grandTotal.toFixed(2),
        total_received: totalReceived.toFixed(2),
        due_amount: dueAmount.toFixed(2),
      },
    };

    handlebars.registerHelper("inc", (value) => parseInt(value) + 1);
    handlebars.registerHelper("numberToWords", (num) => {
      // simple number to words converter (basic version)
      const words = require("number-to-words");
      return words.toWords(num);
    });

    // 4️⃣ Render HTML
    const html = compiledTemplate(data);

    // 5️⃣ Generate PDF with Puppeteer
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // });

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      headless: "new",

      // headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    await browser.close();

    // 6️⃣ Send PDF as download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceId.replace(/\s+/g, "-")}.pdf`
    );
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error generating invoice PDF:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate invoice PDF",
      error: err.message,
    });
  }
};
