import { Controller } from "../controller/controller.js";

export class Router {
    constructor(app) {
        this.app = app;
        this.controller = new Controller()
    }

    setupRouter() {
        this.app.get('/', this.controller.homePage);
    }
}