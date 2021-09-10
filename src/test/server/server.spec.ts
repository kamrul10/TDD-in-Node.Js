import request from "supertest";
import {expect} from "chai";
import {createServer}  from "../../index";
import {Application} from "express"

const app:Application = createServer()

describe("server checks",  ()=> {
    it("server instantiated without error",  (done) => {
      request(app).get("/").expect(200, done);
    });
});
