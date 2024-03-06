// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    API_GATEWAY: 'https://d80b-176-147-208-38.ngrok-free.app',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
