export const environment = {
  production: true,
  config: {
    API_GATEWAY: 'http://localhost:5000',
    endpoint: {
      product: 'api/v1/product',
      stock: {
        stock: 'api/v1/stock',
        productStock: 'api/v1/stock/product_stock',
        storageZone: 'api/v1/stock/storage_zones',
        productAcuiqisition: '/api/v1/stock/product_acquisition',
      },
      community: {
        community: 'api/v1/community',
        city: 'api/v1/community/cities',
      },
      ai: {
        ai: 'api/v1/ai',
        chat: 'api/v1/ai/chat',
      },
      user: {
        user: 'api/v1/users',
        login: 'api/v1/users/login',
      }
    },
  },
};
