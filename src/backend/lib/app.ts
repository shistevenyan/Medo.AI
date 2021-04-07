import DataSource from "./dataSource";
import Http from "http";
import Express, { Request, Response, NextFunction } from "express";
import Logger from "./logger";
import { json as bodyParser } from "body-parser";
import * as testData from "./_testData.json";
import Util from "./util";
import Path from "path";
import fs from "fs";
import webpack from "webpack";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackMiddleware from "webpack-dev-middleware";

const Log = Logger.getLog("App");

type Handler = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

export default class App {
    private readonly tokens: string[] = [];
    private readonly httpServer: Http.Server;

    constructor(private source: DataSource) {
        const exp = Express();
        exp.use(bodyParser({
            limit: "200kb"
        }));
        this.httpServer = Http.createServer(exp);
        // QUESTION: Does the order of the following calls matter?
        this.addUiHandler(exp);
        this.addApiEndpoints(exp);
    }

    public start() {
        const port = process.env.PORT || 8080;
        // TODO validate PORT is an integer

        this.httpServer.listen(port);
        Log.info(`Application ready at http://127.0.0.1:${port}/ui`);
    }

    private addUiHandler(server: Express.Application) {
        if (process.env.NODE_ENV !== "production") {
            const wpConfig = require(Path.join(process.cwd(), "./webpack.config.js"));

            const compiler = webpack(wpConfig);
            const middleware = webpackMiddleware(compiler, {
                publicPath: wpConfig.output.publicPath
            });
            server.use(middleware);
            // Enable deep linking
            server.get("/ui/*", (req: Request, res: Response) => {
                res.header("Content-Type", "text/html");
                compiler.outputFileSystem.readFile(process.cwd() + "/dist-react/index.html", (err, f) => {
                    if (!f) {
                        res.send("<html><body>Error</body></html>");
                    } else {
                        res.send(f.toString());
                    }
                });
            });
            server.use(webpackHotMiddleware(compiler));
        } else {
            Log.info("Using Production");
            const stMw = Express.static(process.cwd() + "/dist-react/", {
                maxAge: "1y",
                etag: false
            });
            // Enable deep linking
            server.get("/ui/*", (req: Request, res: Response, next: NextFunction) => {
                if (req.path.match(/.(js|svg)(.map)?$/)) {
                    next();
                    return;
                }
                res.header("Content-Type", "text/html");
                fs.readFile(process.cwd() + "/dist-react/index.html", (err, f) => {
                    if (!f) {
                        res.send("<html><body>Error</body></html>");
                    } else {
                        res.send(f.toString());
                    }
                });
            });
            server.use("/ui", (req: Request, res: Response, next: NextFunction) => {
                stMw(req, res, next);
            });
        }

    }

    private adapt(handler: Handler) {
        const adapted = (req: Request, res: Response, next: NextFunction) => {
            handler.bind(this)(req, res, next).catch((error) => {
                Log.error(error);
            });
        };
        return adapted;
    }

    private addApiEndpoints(exp: Express.Application) {
        exp.post("/api/login", this.adapt(this.login));
        exp.use((req: Request, res: Response, next: NextFunction) => {
            if (this.isTokenValid(req)) {
                next();
            } else {
                res.status(401).end();
            }
        });
        exp.post("/api/initialize", this.adapt(this.initialize));
        exp.get("/api/patients", this.adapt(this.listPatients));
        exp.get("/api/patients/:id", this.adapt(this.getPatient));
        exp.post("/api/patients/:id", this.adapt(this.savePatient));

        // TODO: Add user, reset password
    }

    private isTokenValid(req: Request) {
        const auth = req.header("Authorization");
        return auth && this.tokens.includes(auth);
    }

    private async login(req: Request, res: Response) {
        const body = req.body || {};
        const id = body.id;
        const user = testData.users.find((u) => {
            return u.id === id;
        });
        if (!user) {
            res.status(401).send({
                // QUESTION: Is this a good message
                // not good, the messages be more vague, right now too specific 
                message: "User with id not found"
            });
        } else {
            // QUESTION: Is this really a good way to verify passwords?
            const decrypted = await Util.decrypt(user.password);
            Log.info(decrypted);
            if (decrypted !== body.password) {
                res.status(401).send({
                    message: "Invalid password"
                });
                return;
            }
            const token = Util.generateRandom(16);
            this.tokens.push(token);
            res.status(200).send({
                message: "Authenticated",
                token
            });
        }
    }

    private async savePatient(req: Request, res: Response) {
        const id = req.params["id"];
        const body = req.body;
        // QUESTION: Is AHC Number or name sensitive data?
        if (!body.name || !body.ahcNum) {
            res.status(400).send({
                message: "name and ahcNum are required"
            });
        } else {
            await this.source.saveData("patient", id, body);
            res.status(200).end();
        }
    }

    private async getPatient(req: Request, res: Response) {
        const patient = await this.source.readData("patient", req.params["id"]);
        if (patient === null) {
            res.status(404).send({
                message: "Not found"
            });
        } else {
            res.send(patient);
        }
    }

    private async listPatients(req: Request, res: Response) {
        const patients = await this.source.readAll("patient");
        res.send(patients);
    }

    private async initialize(req: Request, res: Response) {
        Log.info("Clearing patients");
        await this.source.clearAll("patient");
        for (const p of testData.patients) {
            this.source.saveData("patient", p.id, p);
        }
        const patientNames = (await this.source.readAll("patient")).map((p) => {
            return p.name;
        }).join(", ");
        res.send("Database Initialized with patients " + patientNames);
    }

}