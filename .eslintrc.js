module.exports = {
    extends: ['alloy', 'alloy/typescript', 'alloy/react'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true
        }
    },
    rules: {
        // 禁止使用 var
        'no-var': 'error',
        'no-param-reassign': 0,
        'react-hooks/exhaustive-deps': 0,
        'react/no-children-prop': 0
    }
};
