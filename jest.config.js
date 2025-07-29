module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Configurações para evitar erros de serialização
  workerThreads: true,
  maxWorkers: 1,
  
  // Timeout maior para testes E2E
  testTimeout: 30000,
  
  // Padrões de teste
  testMatch: [
    '**/__tests__/**/*.(ts|js)',
    '**/*.(test|spec).(ts|js)'
  ],
  
  // Configurações de cobertura
  collectCoverageFrom: [
    'src/**/*.(ts|js)',
    '!src/**/*.d.ts',
  ],
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Transformações
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  
  // Extensões de arquivo
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Verbose para debugging
  verbose: true,
  
  // Evitar problemas com módulos ESM
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
};