import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
 
  coverageProvider: 'v8',

  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default createJestConfig(config);
