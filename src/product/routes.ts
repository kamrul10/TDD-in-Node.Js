"use strict";

import express, { Router } from "express";
import {getProductList,createProduct,getProduct} from "./controllers"
const productRoute: express.IRouter = express.Router();

productRoute
    .route("/")
        .get(getProductList)
        .post(createProduct)
productRoute
    .route("/:slug")
    .get(getProduct);
export default productRoute;