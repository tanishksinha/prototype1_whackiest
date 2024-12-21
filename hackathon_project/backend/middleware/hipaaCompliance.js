const fs = require('fs');
const crypto = require('crypto');
//Audit Logging
function logAuditEvent(event) {
    const logEntry = `[${new Date().toISOString()}] ${event}\n`;
    fs.appendFileSync('audit.log', logEntry);
    }

    // Data Encryption (Utility Function)
function encryptData(data) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); // Store this securely (e.g., environment variable)
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { encrypted, iv: iv.toString('hex'), key: key.toString('hex') };
    }

    // Access Control Middleware
function verifyAccess(req, res, next) {
    const userRole = req.headers['user-role']; // Assume role is passed in the header
    const allowedRoles = req.headers['allowed-roles'] ? req.headers['allowed-roles'].split(',') : [];

    if (!allowedRoles.includes(userRole)) {
        logAuditEvent(`Access denied for user role: ${userRole} on ${req.url}`);
        return res.status(403).json({ error: 'Access Denied' });
    }

    next();
}

module.exports = (req, res, next) =>{

    try {
        // Log every request for auditing
        logAuditEvent(`Request received: ${req.method} ${req.url} from IP: ${req.ip}`);
    
        // Encrypt sensitive data (e.g., request payload)
        if (req.body && typeof req.body === 'object') {
          const encryptedData = encryptData(JSON.stringify(req.body));
          req.body = { encryptedData };
        }
    
        // Verify access control
        verifyAccess(req, res, next);
    } catch (error) {
        logAuditEvent(`Error in HIPAA middleware: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  