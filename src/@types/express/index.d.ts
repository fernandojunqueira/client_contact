declare global {
    namespace Express {
      interface Request {
        client: IVerifyOwner;
      }
    }
  }
  
  export {};