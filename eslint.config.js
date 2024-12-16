import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: parser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json"
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
            }
        },
        plugins: {
            "@typescript-eslint": plugin
        },
        rules: {
            "no-undef": "off",
            "no-explicit-any": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/explicit-member-accessibility": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "format": [
                        "camelCase",
                        "UPPER_CASE"
                    ],
                    "selector": [
                        "function",
                        "variable",
                        "parameter",
                        "classProperty",
                        "classMethod"
                    ],
                    "leadingUnderscore": "allow"
                }
            ],
            "no-multiple-empty-lines": [
                "error",
                { "max": 1 }
            ],
            "indent": [
                "error",
                4,
                { "SwitchCase": 1 }
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "never"
            ],
            "comma-dangle": [
                "error",
                "always-multiline"
            ],
        }
    }
];