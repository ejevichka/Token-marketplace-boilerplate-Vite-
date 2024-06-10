import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Adjust this if you have path aliases in Vite
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
};

export default config;
  