import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

export default tseslint.config(
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    {
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                project: "./tsconfig.json",
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    pluginJs.configs.recommended,
    // tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    // tseslint.configs.strict,
    tseslint.configs.strictTypeChecked,
    // tseslint.configs.stylistic,
    tseslint.configs.stylisticTypeChecked,

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    eslintConfigPrettier,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    importPlugin.flatConfigs.recommended,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    importPlugin.flatConfigs.typescript,
    {
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                typescript: {},
            },
            "import/resolver-next": [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                }),
            ],
        },
    },
);
