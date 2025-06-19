
declare global {
  interface Window {
    gapi: {
      load: (apis: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey: string;
          clientId: string;
          discoveryDocs: string[];
          scope: string;
        }) => Promise<void>;
        drive: {
          files: {
            create: (params: any) => Promise<any>;
            list: (params: any) => Promise<any>;
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<void>;
          currentUser: {
            get: () => {
              getAuthResponse: () => {
                access_token: string;
              };
            };
          };
        };
      };
    };
  }
}

export {};
