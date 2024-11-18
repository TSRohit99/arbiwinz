// global.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ARBISCAN_API_KEY:string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
