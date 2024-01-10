module.exports = {
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
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
    },
};
