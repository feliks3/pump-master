1, npm create vite@latest pump-master -- --template react-ts
2, npm install tailwindcss @tailwindcss/vite
3,
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
plugins: [
tailwindcss(),
],
})
4, @import "tailwindcss";
5, npm run dev
6,

  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
7,
npm install -D eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-react-hooks eslint-plugin-jsx-a11y
8,创建 .eslintrc.cjs：
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};
9,.prettierrc：
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5"
}
10.
npm install react-router-dom
npm install lucide-react
npm install axios
