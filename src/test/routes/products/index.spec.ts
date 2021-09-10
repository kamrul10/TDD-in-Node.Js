import request from "supertest";
import { expect } from "chai";

import {createServer} from "../../../index";
import { assert } from "console";
const app = createServer();

describe("product routes", () => {
  it("/product responds with 200", (done) => {
    request(app).get("/api/v1/products?page=1").expect(200, done);

  });
})