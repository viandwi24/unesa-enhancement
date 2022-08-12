// export class ServiceManager {
//   services: Service[] = [];

//   create(blueprint: typeof Service, ...args: any) {
//     const service = new blueprint();
//     service.init(...args);
//     this.services.push(service);
//     return service;
//   }

//   destroy() {
//     this.services.forEach((service) => service.destroy());
//   }
// }

// export class Service {
//   isDestroyed = false;

//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   init(...args: any) {}

//   destroy() {
//     this.isDestroyed = true;
//     console.log("destroy");
//   }
// }

// export class SiakaduPlusService extends Service {
//   constructor() {
//     super();
//     console.log("siakadu++ service running");
//     this.runUpdater();
//   }

//   runUpdater() {
//     chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//       const tab = tabs[0];

//       // function to inject
//       function hello() {
//         alert("Hello from the web page");
//       }

//       // inject the function into the current tab
//       chrome.tabs.executeScript(tab.id, { code: "(" + hello + ")();" });
//     });
//     if (!this.isDestroyed) setTimeout(this.runUpdater.bind(this), 1000);
//   }
// }

// console.clear();
// const serviceManager = new ServiceManager();
// serviceManager.create(SiakaduPlusService);
// // console.log("background loaded", serviceManager);
