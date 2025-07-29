// jest.setup.js

// Aumentar timeout para testes que fazem requisições HTTP
jest.setTimeout(30000);

// Mock console para evitar logs desnecessários durante os testes
const originalConsole = global.console;

beforeAll(() => {
  global.console = {
    ...originalConsole,
    // Manter apenas os logs importantes
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: originalConsole.warn,
    error: originalConsole.error,
  };
});

afterAll(() => {
  global.console = originalConsole;
});

// Função helper para extrair apenas propriedades simples de objetos complexos
global.extractSimpleProps = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  const simple = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' || 
        typeof value === 'number' || 
        typeof value === 'boolean' || 
        value === null || 
        value === undefined) {
      simple[key] = value;
    }
  }
  return simple;
};

// Handler para erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});