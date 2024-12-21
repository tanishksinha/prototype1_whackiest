/*// DocumentService.js
const AWS = require('aws-sdk');
const fs = require('fs');
const tesseract = require('tesseract.js'); // OCR library

// Set up AWS S3 client
const s3 = new AWS.S3();
const bucketName = 'healthcare-documents-bucket';

class DocumentService {
  // Scan and store a document in Amazon S3
  async scanAndStoreDocument(filePath) {
    try {
      // Perform OCR on the document
      const ocrResult = await this.performOCR(filePath);
      
      // Upload file to S3
      const fileContent = fs.readFileSync(filePath);
      const s3UploadResponse = await s3.upload({
        Bucket: bucketName,
        Key: documents/${Date.now()}_${filePath},
        Body: fileContent,
        ContentType: 'application/pdf',
      }).promise();

      // Return OCR text and S3 file URL
      return { ocrText: ocrResult.text, s3Url: s3UploadResponse.Location };
    } catch (error) {
      console.error('Error scanning and storing document:', error);
      throw new Error('Document storage failed');
    }
  }

  // Perform OCR on the document to extract text
  async performOCR(filePath) {
    return new Promise((resolve, reject) => {
      tesseract.recognize(filePath, 'eng', {
        logger: (m) => console.log(m),
      })
      .then(({ data: { text } }) => {
        resolve({ text });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = DocumentService;*/