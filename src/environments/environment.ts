// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    API_GATEWAY: 'http://localhost:5000/',
    endpoint: {
      product: "api/v1/product/",
      stock: "api/v1/stock/product_stock/",
      community: "api/v1/community/",
      storage: "api/v1/storage/"
    
    },
    ai: {
      endpoint: "api/v1/ai/chat"
    },
    user: {
      createUser: "api/v1/users",
      login: "api/v1/users/login",
    }
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
