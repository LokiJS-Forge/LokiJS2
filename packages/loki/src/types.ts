export namespace lokijs {

  export interface Storage {
    loadDatabase(dbname: string): Promise<string | object>;

    saveDatabase(dbname: string, serialization: string): Promise<void> | Promise<{}>;

    deleteDatabase(dbname: string): Promise<void>;

    mode?: string;

    exportDatabase?: Function;
  }

  export type Document = any;
}
