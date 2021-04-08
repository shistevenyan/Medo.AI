import * as request from "supertest";
import App from "../src/backend/lib/app";
import inMemory from "../src/backend/lib/datasources/inMemory";

const dataSource = new inMemory();

dataSource.initialize().then(() => {
    const app = new App(dataSource);
    app.start();
});


test('adds 1 + 2 to equal 3', () => {

    expect(1+2).toBe(3);
});