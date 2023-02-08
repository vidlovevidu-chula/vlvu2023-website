module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "eslint-config-prettier", "next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  globals: {
    JSX: true,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "warning",
  },
}
