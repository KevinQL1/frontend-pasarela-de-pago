// Setup for React Testing Library
import '@testing-library/jest-dom';

// Polyfills for environment APIs used by dependencies
import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Provide a default Vite env for modules that read import.meta.env
process.env.VITE_API_URL = process.env.VITE_API_URL || 'http://localhost';
