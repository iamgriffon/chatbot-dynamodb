import swaggerAutogen from "swagger-autogen";

import { swaggerOptions } from "./bootstrap";

const routes = ["../server.ts"]

const outputFile = "../swagger.json"

swaggerAutogen()(outputFile, routes, swaggerOptions)