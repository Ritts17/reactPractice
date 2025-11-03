// tests/__mocks__/axios.js

const axiosMock = {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({})),
    create: jest.fn(() => axiosMock)
  };
  
  export default axiosMock;
  