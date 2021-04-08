import DataSource, { EntityType } from "../dataSource";
import { Log } from "../logger";

export default class InMemory extends DataSource {
    constructor() {
        super("InMemory");
    }

    public async initialize() {
        this.log.info("Initialized, should only be used for testing");
    }

    public async readAll(type: EntityType) {
        return Object.values(this.coll(type));
    }

    public async saveData(type: EntityType, id: string, data: any) {
        delete this.coll(type)[id];
        this.coll(type)[data.id] = data;
        this.log.info(this.coll(type));
    }
    public async deleteData(type: EntityType, id: string) {
        delete this.coll(type)[id];
    }

    private coll(type: EntityType) {
        if (!this.COLLS[type]) {
            this.COLLS[type] = {};
        }
        return this.COLLS[type];
    }
}