/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["components/**/*.{ts,tsx}", "utils/*.ts"],

  coveragePathIgnorePatterns: [
    ".styles.",
    "globalStyles.",
    "queryConfiguration.ts",
    "routes.ts",
    "types.",
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "../coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^.+\\.(css|less)$": "<rootDir>/testMocks/cssStub.js",
    "^.+\\.(jpg|jpeg|png)$": "<rootDir>/testMocks/photoStub.js",
  },

  // The root directory that Jest should scan for tests and modules within
  rootDir: "src/",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["components/", "utils"],

  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
