import DataSource, { EntityType } from "../dataSource";
import Path from "path";
import fs from "fs";
import shelljs from "shelljs";

const DATA_DIR = Path.join(process.cwd(), "private", "data");
const COLLS: { [key: string]: any } = {};

export default class LocalData extends DataSource {
    constructor() {
        super("LocalData");
    }

    public async initialize() {
        shelljs.mkdir("-p", DATA_DIR);
        this.log.info("Initialized data directory", DATA_DIR);
    }

    public async readAll(type: EntityType) {
        return Object.values(this.coll(type));
    }

    public async saveData(type: EntityType, id: string, data: any) {
        delete this.coll(type)[id];
        this.coll(type)[data.id] = data;
        this.saveColl(type);
        this.log.info(this.coll(type));
    }
    public async deleteData(type: EntityType, id: string) {
        delete this.coll(type)[id];
        this.saveColl(type);
    }

    private saveColl(type: EntityType) {
        const dataFile = Path.join(DATA_DIR, type + ".json");
        this.log.info("Saving file", dataFile);
        fs.writeFileSync(dataFile, JSON.stringify(this.coll(type)));
    }

    private coll(type: EntityType) {
        if (!COLLS[type]) {
            const dataFile = Path.join(DATA_DIR, type + ".json");
            if (fs.existsSync(dataFile)) {
                this.log.info("Reading file", dataFile);
                COLLS[type] = JSON.parse(fs.readFileSync(dataFile).toString("utf8"));
            } else {
                COLLS[type] = {};
            }
        }
        return COLLS[type];
    }
}