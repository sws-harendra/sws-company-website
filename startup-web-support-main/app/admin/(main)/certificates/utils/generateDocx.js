import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import axios from 'axios';

/**
 * Generate a DOCX document using a template and a data object.
 * 
 * @param {Object} options
 * @param {string} options.templateUrl - The URL of the .docx template
 * @param {Object} options.data - The form data mapping tags (e.g. { name: "John Doe", role: "Dev" })
 * @param {string} options.fileName - Output filename
 */
export const generateDocxCertificate = async ({ templateUrl, data, fileName }) => {
  try {
    // 1. Fetch the binary template from the server
    const response = await axios.get(templateUrl, {
      responseType: 'arraybuffer'
    });

    const content = response.data;

    // 2. Unzip the content using PizZip
    const zip = new PizZip(content);

    let doc;
    try {
      // 3. Parse the .docx using docxtemplater
      doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // 4. Set the data for the template
      doc.setData({
        name: data.name,
        role: data.role,
        serialNo: data.serialNo,
        issueDate: data.issueDate,
        duration: data.duration,
        ...data
      });

      // 5. Render the document (replace tags)
      doc.render();
    } catch (error) {
      console.error("Error rendering docxtemplater", error);
      throw new Error("Your Word Document has invalid tags. Please fix any missing or broken curly brackets (e.g. {{name}}) in the file, upload it again, and retry.");
    }

    // 6. Generate the final blob
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // 7. Trigger the download
    saveAs(out, fileName || 'document.docx');
  } catch (error) {
    console.error("Failed to generate DOCX:", error);
    throw error;
  }
};
