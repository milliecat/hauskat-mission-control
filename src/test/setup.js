import '@testing-library/jest-dom';

// Mock electron APIs for testing
global.electronAPI = {
  onExportData: vi.fn(),
  removeExportDataListener: vi.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;
