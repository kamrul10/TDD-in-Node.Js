import Product from "../../product/models";
import assert from "assert";
import logger from "../../utils/logger";
import { getSlug } from "../../product/libs";


beforeEach( async () => {
    // Creating a new Instance of User Model

});
describe('Product model create operation',  () => {
    it('Should create a New Product',  (done) => {
        const productAttrs = { name: 'new product'};
        getSlug(productAttrs.name).then((value) => {
            const newProduct = Product.build({...productAttrs,slug:value});
            newProduct.save().then((data:any)=>{
                assert(data.name='new product');
                done();
            })
        })

    });
})