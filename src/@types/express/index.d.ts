declare global {
    namespace Express {
      interface Request {
        client: object;
      }
    }
  }
  
  export {};