"use strict"
import Product from "../models"
import logger from "../../utils/logger"

export const getSlug = async (name:string) => {
    const count:number = await Product.count({'name':name});
    logger.info("count"+ count);
    return name.replace(/ /g,'-') + '-' + (count+1);

  }