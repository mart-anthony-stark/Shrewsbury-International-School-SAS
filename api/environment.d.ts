declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    DB_URI: string;
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
  }
}
