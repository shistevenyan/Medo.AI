import Logger from "./lib/logger";
import DataSource from "./lib/dataSource";
import InMemory from "./lib/datasources/inMemory";
import LocalData from "./lib/datasources/localData";
import App from "./lib/app";
const Log = Logger.getLog("Main");


const DATA_SOURCE = process.env.DATA_SOURCE;

if (!DATA_SOURCE) {
    Log.info("No 'DATA_SOURCE' environment variable set, using InMemory");
}
let dataSource: DataSource;
if (DATA_SOURCE === "LocalData") {
    dataSource = new LocalData();
} else {
    dataSource = new InMemory();
}

dataSource.initialize().then(() => {
    const app = new App(dataSource);
    app.start();
    Log.info("Web application started");
});
