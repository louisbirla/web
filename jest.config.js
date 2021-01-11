module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["components/**/*.{tsx,ts}", "pages/**/*.{tsx,ts}", "utils/**/*.{tsx,ts}"],
  coveragePathIgnorePatterns: ["pages/_app.tsx", "pages/_document.tsx"],
}
