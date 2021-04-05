import Logger, { Log } from "./logger";
export type EntityType = "patient";

// QUESTION: Why have different implementations of DataSource?
// QUESTION: What do abstract, private, protected, public, async mean?
export default abstract class DataSource {
    protected readonly log: Log;

    constructor(logName: string) {
        this.log = Logger.getLog(logName);
    }
    // Perform any required data structure intialization
    public abstract initialize(): Promise<void>;

    public abstract readAll(type: EntityType): Promise<any[]>;
    public abstract saveData(type: EntityType, id: string, data: any): Promise<void>;
    public abstract deleteData(type: EntityType, id: string): Promise<void>;

    public async clearAll(type: EntityType) {
        const all = await this.readAll(type);
        for (const data of all) {
            await this.deleteData(type, data.id);
        }
    }

    public async readData(type: EntityType, id: string) {
        const all = await this.readAll(type);
        for (const data of all) {
            if (data.id === id) {
                return data;
            }
        }
        return null;
    }
}