import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**"],
    rules: {
      // React specific rules
      "react/react-in-jsx-scope": "off", // Next.js does not require React to be in scope
      "react/jsx-fragments": ["warn", "syntax"], // Prefer shorthand syntax for fragments
      "react/no-unescaped-entities": "warn", // Warn about unescaped entities in JSX
      "react/prop-types": "off", // Disable prop-types as we use TypeScript for type checking
      "react/jsx-boolean-value": ["warn", "always"], // Enforce boolean attributes notation in JSX

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn about unused variables, ignore variables starting with _
      "@typescript-eslint/explicit-function-return-type": "off", // Disable explicit return types on functions
      "@typescript-eslint/no-explicit-any": "warn", // Warn when using the `any` type
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"], // Prefer interface over type for object type definitions

      // General rules
      "no-console": "off", // Warn about console.log statements
      "import/no-anonymous-default-export": "off",
      "quotes": ["warn", "double", { "allowTemplateLiterals": true }], // Enforce double quotes, allow template literals
      "semi": ["warn", "always"], // Enforce semicolons
      "indent": ["warn", 2], // Enforce 2-space indentation
    },
  },
];

export default eslintConfig;