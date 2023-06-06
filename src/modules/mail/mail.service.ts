import fs from 'fs';
import path from 'path';

const readTemplate = (filePath: string) => {
  try {
    const templatePath = path.join(__dirname, filePath);
    const template = fs.readFileSync(templatePath, 'utf-8');
    return template;
  } catch (error) {
    console.error('Error reading template:', error);
    throw error;
  }
};

// Usage example
const templatePath = 'templates/otp.html'; // Replace with the path to your template file

const emailTemplate = readTemplate(templatePath);
export default emailTemplate;