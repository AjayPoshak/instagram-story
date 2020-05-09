module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    parser: "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "rules": {
        "semi": "off",
        "no-tabs": "off",
        "no-plusplus": "off",
        "react/jsx-filename-extension": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "indent": ['error', 'tab', { "SwitchCase": 1 }],
        "arrow-parens": ["error", "as-needed"],
        'react/jsx-indent': 0, // Prettier.
		'react/jsx-indent-props': 0, // Prettier.
		'react/jsx-wrap-multilines': 0, // Prettier.
    }
};