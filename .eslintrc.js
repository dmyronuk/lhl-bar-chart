module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "jquery": true
    },
    "extends": "eslint:recommended",
    "rules": {
      "indent": [
        "error",
        4
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "double"
      ],
      "semi": [
        "error",
        "always"
      ],
     "accessor-pairs": "off",
  	 "array-bracket-spacing": "off",
  	 "array-callback-return": "error",
  	 "arrow-body-style": "off",
  	 "arrow-parens": "off",
  	 "arrow-spacing": "off",
  	 "block-scoped-var": "error",
  	 "block-spacing": [
	      "error", "always"
	   ],
    "brace-style": [
		  "error",
		  "1tbs",
		  {"allowSingleLine": true}
	   ],
    "callback-return": "off",
    "camelcase": "error",
    "comma-dangle": [
		  "error", "never"
	   ],
    "comma-spacing": [
		  "error",
		  {"before": false, "after": true}
	   ],
  	"comma-style": ["error", "last"],
  	"complexity": "error",
  	"computed-property-spacing": "off",
  	"consistent-return": "off",
  	"consistent-this": "off",
  	"constructor-super": "error",
  	"curly": "error",
  	"default-case": "off",
  	"dot-location": "off",
  	"dot-notation": "off",
  	"eol-last": "off",
  	"eqeqeq": "error",
  	"func-names": "off",
  	"func-style": "off",
  	"generator-star-spacing": "off",
  	"global-require": "error",
  	"guard-for-in": "off",
  	"handle-callback-err": "off",
  	"id-blacklist": "off",
  	"id-length": "off",
  	"id-match": "off",
  	"indent": [
		  "error", 2
	   ],
  	"init-declarations": "off",
  	"jsx-quotes": "off",
  	"key-spacing": [
		  "error",
		  {"beforeColon": false, "afterColon": true}
	   ],
  	"keyword-spacing": "off",
  	"linebreak-style": "off",
  	"lines-around-comment": "off",
  	"max-depth": "off",
    "max-len": "off",
    "max-nested-callbacks": [
		  "error", 3
	   ],
    "max-params": [
		  "error", 3
	   ],
  	"max-statements": "off",
  	"new-cap": "off",
  	"new-parens": "off",
  	"newline-after-var": "off",
  	"newline-before-return": "off",
  	"newline-per-chained-call": "off",
  	"no-alert": "off",
  	"no-array-constructor": "off",
  	"no-bitwise": "off",
  	"no-caller": "off",
  	"no-case-declarations": "error",
  	"no-catch-shadow": "off",
  	"no-class-assign": "error",
  	"no-cond-assign": "error",
  	"no-confusing-arrow": "off",
  	"no-console": "off",
  	"no-const-assign": "error",
  	"no-constant-condition": "error",
  	"no-continue": "error",
  	"no-control-regex": "error",
  	"no-debugger": "error",
  	"no-delete-var": "error",
  	"no-div-regex": "off",
  	"no-dupe-args": "error",
  	"no-dupe-class-members": "error",
  	"no-dupe-keys": "error",
  	"no-duplicate-case": "error",
  	"no-else-return": "off",
  	"no-empty": "error",
  	"no-empty-character-class": "error",
  	"no-empty-function": "error",
  	"no-empty-pattern": "error",
  	"no-eq-null": "off",
  	"no-eval": "error",
  	"no-ex-assign": "error",
  	"no-extend-native": "off",
  	"no-extra-bind": "off",
  	"no-extra-boolean-cast": "error",
  	"no-extra-label": "off",
  	"no-extra-parens": "off",
  	"no-extra-semi": "error",
  	"no-fallthrough": "error",
  	"no-floating-decimal": "error",
  	"no-func-assign": "error",
  	"no-implicit-coercion": "error",
  	"no-implicit-globals": "off",
  	"no-implied-eval": "error",
  	"no-inline-comments": "error",
  	"no-inner-declarations": "error",
  	"no-invalid-regexp": "error",
  	"no-invalid-this": "off",
  	"no-irregular-whitespace": "error",
  	"no-iterator": "off",
  	"no-label-var": "off",
  	"no-labels": "off",
  	"no-lone-blocks": "error",
  	"no-lonely-if": "off",
  	"no-loop-func": "off",
  	"no-magic-numbers": "off",
  	"no-mixed-requires": "error",
  	"no-mixed-spaces-and-tabs": "error",
  	"no-multi-spaces": "off",
  	"no-multi-str": "off",
  	"no-multiple-empty-lines": "off",
  	"no-native-reassign": "off",
  	"no-negated-condition": "off",
  	"no-negated-in-lhs": "error",
  	"no-nested-ternary": "error",
  	"no-new": "off",
  	"no-new-func": "off",
  	"no-new-object": "off",
  	"no-new-require": "off",
  	"no-new-symbol": "error",
  	"no-new-wrappers": "off",
  	"no-obj-calls": "error",
  	"no-octal": "error",
  	"no-octal-escape": "off",
  	"no-param-reassign": "error",
  	"no-path-concat": "off",
  	"no-plusplus": "off",
  	"no-process-env": "off",
  	"no-process-exit": "off",
  	"no-proto": "off",
  	"no-redeclare": "error",
  	"no-regex-spaces": "error",
  	"no-restricted-globals": "off",
  	"no-restricted-imports": "off",
  	"no-restricted-modules": "off",
  	"no-restricted-syntax": "off",
  	"no-return-assign": "off",
  	"no-script-url": "off",
  	"no-self-assign": "error",
  	"no-self-compare": "error",
  	"no-sequences": "error",
  	"no-shadow": "off",
  	"no-shadow-restricted-names": "off",
  	"no-spaced-func": "error",
  	"no-sparse-arrays": "error",
  	"no-sync": "off",
  	"no-ternary": "off",
  	"no-this-before-super": "error",
  	"no-throw-literal": "off",
    "no-trailing-spaces": ["error", { "skipBlankLines": true}],
    "no-undef": "off",
    "no-undef-init": "off",
    "no-undefined": "off",
    "no-underscore-dangle": "off",
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "off",
    "no-unneeded-ternary": "error",
    "no-unreachable": "error",
    "no-unused-expressions": "off",
    "no-unused-labels": "error",
    "no-unused-vars": "off",
    "no-use-before-define": "error",
    "no-useless-call": "off",
    "no-useless-concat": "off",
    "no-useless-constructor": "off",
    "no-var": "off",
    "no-void": "off",
    "no-warning-comments": "off",
    "no-whitespace-before-property": "off",
    "no-with": "off",
    "object-curly-spacing": "off",
    "object-shorthand": "off",
    "one-var": ["error", "never"],
    "one-var-declaration-per-line": "off",
    "operator-assignment": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "prefer-arrow-callback": "off",
    "prefer-const": "off",
    "prefer-reflect": "off",
    "prefer-rest-params": "off",
    "prefer-spread": "off",
    "prefer-template": "off",
    "quote-props": "off",
    "quotes": "off",
    "radix": "error",
    "require-jsdoc": "off",
    "require-yield": "off",
    "semi": ["error", "always"],
    "semi-spacing": "off",
    "sort-imports": "off",
    "sort-vars": "off",
    "space-before-blocks": "off",
    "space-before-function-paren": "off",
    "space-in-parens": "off",
    "space-infix-ops": [2, {"int32Hint": false}],
    "space-unary-ops": "off",
    "spaced-comment": "off",
    "strict": "off",
    "template-curly-spacing": "off",
    "use-isnan": "error",
    "valid-jsdoc": "off",
    "valid-typeof": "error",
    "vars-on-top": "off",
    "wrap-iife": "error",
    "wrap-regex": "off",
    "yield-star-spacing": "off",
    "yoda": "off"
    }
};
