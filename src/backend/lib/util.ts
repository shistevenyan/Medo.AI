import Path from "path";
import fs from "fs";
import crypto from "crypto";

// QUESTION: Why use Path here?
const PUBLIC_KEY_PATH = Path.join(process.cwd(), "certs", "public.crt");
const PRIVATE_KEY_PATH = Path.join(process.cwd(), "certs", "private.key");

// QUESTION: Can we use aynchronous read?
const PUBLIC_KEY = fs.readFileSync(PUBLIC_KEY_PATH);
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH);

export default {
    decrypt: async (base64Enc: string) => {
        // QUESTION: What are these encodings for?
        // why encode base 64, asymmetric encryption
        // Base-64 encoding is a way of taking binary data and turning it into text so that it's more easily transmitted in things like e-mail and HTML form data.
        const decrypted = crypto.publicDecrypt(PUBLIC_KEY,
            Buffer.from(base64Enc, "base64")).toString("utf8");
        return decrypted;
    },

    encrypt: async (plain: string) => {
        return crypto.privateEncrypt(PRIVATE_KEY,
            Buffer.from(plain, "utf8")).toString("base64");
    },

    generateRandom: (length: number) => {
        return crypto.pseudoRandomBytes(length).toString("base64");
    }

};


