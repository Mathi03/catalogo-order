export {};

declare global {
  interface Window {
    setting: {
      url: string;
      personId: string;
    };
  }
}
