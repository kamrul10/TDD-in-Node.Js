
import express from "express";
import logger from "../../utils/logger";
import { getSlug } from "../libs";
import Product,{ProductAttrs} from "../models";


export const getProductList:any= async (req: express.Request, res:express.Response) =>{
    try {
        const query = {  }
        let limit = 10
        if (req.query.limit) {
        limit = parseInt(req.query.limit as string,10);
        }
        const skip = (parseInt(req.query.page as string,10)- 1) * limit;
        const projection = { name: 1, slug: 1, images: 1 }
        const products:ProductAttrs[] = await Product.find(query, projection).skip(skip).limit(limit)
        return res
                .status(200)
                .json({success:true,message:"product list fetched successfully", data: products})
    } catch(error){
        logger.info("error: %s",error)
        res.status(500).json({message:"Something went wrong",success:false});
    }

}

export const getProduct:any= async (req: express.Request, res:express.Response) => {
    try {
        const query = {'slug':req.params.slug}
        const projection = { name: 1, slug: 1, images: 1, description: 1, status:1 }
        const product:ProductAttrs = await Product.findOne(query, projection);
        return res.status(200).json({success:true, message:"product details fetched successfully", data: product})
    } catch(error){
        logger.info("error: %s",error)
        res.status(500).json({message:"Something went wrong",success:false});
    }

}

export const createProduct:any = async (req:express.Request, res:express.Response) => {
    try {
        const reqBody:ProductAttrs = req.body;
        reqBody.slug = await getSlug(reqBody.name);
        await Product.build(reqBody).save();

        res.status(201).json({message:"Product Created successfully",success:true,data:reqBody});
    } catch(error) {
        logger.error("error: %s",error)
        res.status(500).json({message:"Something went wrong",success:false});
    }


}