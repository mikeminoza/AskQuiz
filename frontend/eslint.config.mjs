import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript", "prettier"],
        rules: {
            "semi": ["error", "always"],  
            "quotes": ["error", "double"], 
            "indent": ["error", 4], 
            "prefer-arrow-callback": ["error"], 
            "prefer-template": ["error"],
            "no-console": "warn", 
        },
    }),
];

export default eslintConfig;
