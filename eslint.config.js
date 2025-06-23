import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        defineNuxtConfig: "readonly",
        useRuntimeConfig: "readonly",
        definePageMeta: "readonly",
        defineNuxtPlugin: "readonly",
        useNuxtApp: "readonly",
        navigateTo: "readonly",
        clearError: "readonly",
        createError: "readonly",
        $fetch: "readonly",
      },
    },
  },
  tseslint.configs.recommended,
  ...pluginVue.configs["flat/strongly-recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    ignores: ["**/.nuxt/**", "**/node_modules/**", "**/dist/**"],
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "vue/multi-word-component-names": "off",
      "no-console": "warn",
      "no-undef": "warn",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
]);
