module.exports = {
    // extends: ,
    'parser': '@typescript-eslint/parser',
    'plugins': ['@typescript-eslint'],
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
