import Product from "../../product/models"
import { getSlug } from "../../product/libs";
import { expect } from "chai";

let product;
const productName = "samsung tv";
beforeEach(async ()=>{
    const productData = {name:productName};
    const slug = await getSlug(productData.name)
    product = Product.build({...productData,slug})
    await product.save()
    //     await product.save()
    // .then((value:string)=>{
    //     product = Product.build({...productData,value})
    //     await product.save()
    // })
})

describe('product model operation check',()=>{
    it('Should read data from product table', (done)=>{
        Product.findOne({name:productName}).then((data:any) =>{
            expect(data.name).to.be.a('string')
            expect(data.name).to.equal(productName)
            expect(data.slug).to.equal(productName.replace(/ /g,'-')+'-1')
            done()
        }).catch((err:Error) =>{
            done(err)
        })
    })
})

afterEach(async ()=>{
    await Product.deleteOne({name:productName})
})