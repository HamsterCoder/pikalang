import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['dist', 'storybook-static'] },
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat['recommended-latest'],
    reactRefresh.configs.vite,
    storybook.configs['flat/recommended'],
    prettier,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        rules: {
            'react-hooks/exhaustive-deps': 'warn',
            // styled(Component) wraps a component, so the result is one too
            'react-refresh/only-export-components': [
                'error',
                {
                    allowConstantExport: true,
                    allowCompoundComponents: true,
                    extraHOCs: ['styled'],
                },
            ],
            'no-restricted-imports': [
                'warn',
                {
                    patterns: [
                        {
                            group: ['../'],
                            message: 'Relative imports are not allowed.',
                        },
                    ],
                },
            ],
            '@typescript-eslint/no-unused-vars': ['error'],
        },
    },
);
