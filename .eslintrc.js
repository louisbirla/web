module.exports = {
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jsx-a11y/recommended"],
	plugins: ["jsx-a11y"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/jsx-key": ["error"],
		"jsx-a11y/anchor-is-valid": "off",
		"prefer-const": ["warn"],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"no-magic-numbers": [
			"warn",
			{
				ignore: [-1, 0, 1],
			},
		],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		node: true,
	},
}
