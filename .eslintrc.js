module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    parser: 'babel-eslint', // include eslint-plugin-import
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
        }
    },
    extends: 'airbnb-base',
    rules: {
        // off
        'no-use-before-define': 0,
        'no-console': 0,
        'no-alert': 0,
        'no-plusplus': 0,
        'no-unused-expressions': 0,
        'func-names': 0,
        'eqeqeq': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-new': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'linebreak-style': 0,
        'no-nested-ternary': 0,
        'arrow-body-style': 0,
        'prefer-const': 0,

        // warn
        'import/prefer-default-export': 1,
        'no-unused-vars': 1,

        // error
        indent: [2, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
        }],
        'space-before-function-paren': [2, 'never'],
        'wrap-iife': [2, 'inside', { functionPrototypeMethods: true }],
        'max-len': [2, 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],

        // react
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react-hooks/rules-of-hooks': 2,
        // 使用后会添加不希望出现的变量到依赖
        // 'react-hooks/exhaustive-deps': 1,

        // no debugger
        'no-debugger': 2,
    }
};
