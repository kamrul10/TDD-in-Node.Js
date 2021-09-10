
import {getSlug} from "../../../product/libs";
import {expect} from "chai"
describe('Creating random slug',  () => {
    it('slug generate check',   (done) => {
       getSlug('demo name').then((value)=> {
        expect(value).to.equal("demo-name-1")
        done()
       }).catch(err =>{
           done(err)
       })

    });
})

