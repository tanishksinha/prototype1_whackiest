const fs = require('fs');
const crypto = require('crypto');


function logAuditEvent(event) {
    const logEntry = `[${new Date().toISOString()}] ${event}\n`;
    fs.appendFileSync('audit.log', logEntry);
}


function encryptData(data) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex'), key: key.toString('hex') };
}

function verifyAccess(req, res, next) {
    const userRole = req.headers['user-role']; 
    const allowedRoles = req.headers['allowed-roles'] ? req.headers['allowed-roles'].split(',') : [];

    if (!allowedRoles.includes(userRole)) {
        logAuditEvent(`Access denied for user role: ${userRole} on ${req.url}`);
        return res.status(403).json({ error: 'Access Denied' });
    }
    next();
}


module.exports = (req, res, next) => {
    try {
        
        logAuditEvent(`Request received: ${req.method} ${req.url} from IP: ${req.ip}`);

       
        if (req.body && typeof req.body === 'object') {
            const encryptedData = encryptData(JSON.stringify(req.body));
            req.body = { encryptedData }; 
        }

        
        verifyAccess(req, res, next);
    } catch (error) {
        logAuditEvent(`Error in HIPAA middleware: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};