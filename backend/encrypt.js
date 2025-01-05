const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config(); 

// Encryption settings
const algorithm = process.env.ENCRYPTION_ALOGORITHM
const secretKey = process.env.SECRET_KEY 
const iv = crypto.randomBytes(16); 
// Encrypt a file
function encryptFile(inputPath, outputPath) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    // Write the IV as the first part of the file
    output.write(iv);

    input.pipe(cipher).pipe(output);
    output.on('finish', () => console.log(`File encrypted with IV prepended: ${outputPath}`));
}

