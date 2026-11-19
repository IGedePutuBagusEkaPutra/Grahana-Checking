import test from "node:test";
import assert from "node:assert/strict";
import { validateBusiness, safeHttpUrl, parseBusinessArray } from "../src/security.js";

const valid={id:"x1",name:"Ubud Stay",category:"Accommodation",location:"Ubud",status:"Completed",description:"Sample",facilities:["Wi-Fi"],phone:"628123456789",website:"https://example.com",parentMallId:null};
test("accepts valid demo business",()=>assert.equal(validateBusiness(valid).ok,true));
test("rejects empty business name",()=>assert.equal(validateBusiness({...valid,name:" "}).ok,false));
test("rejects name over limit",()=>assert.equal(validateBusiness({...valid,name:"a".repeat(81)}).ok,false));
test("rejects unsupported category",()=>assert.equal(validateBusiness({...valid,category:"Bank"}).ok,false));
test("rejects unsupported status",()=>assert.equal(validateBusiness({...valid,status:"Legal"}).ok,false));
test("rejects invalid phone number",()=>assert.equal(validateBusiness({...valid,phone:"abc"}).ok,false));
test("rejects javascript URL",()=>assert.equal(safeHttpUrl("javascript:alert(1)"),null));
test("accepts HTTPS URL",()=>assert.match(safeHttpUrl("https://example.com"),/^https:/));
test("rejects malformed JSON",()=>assert.equal(parseBusinessArray("{",[]).ok,false));
test("rejects non-array JSON",()=>assert.equal(parseBusinessArray("{}",[]).ok,false));
test("rejects record without id",()=>assert.equal(parseBusinessArray(JSON.stringify([{...valid,id:undefined}]),[]).ok,false));
test("accepts empty array",()=>assert.equal(parseBusinessArray("[]",[]).ok,true));
test("rejects invalid mall tenant relation type",()=>assert.equal(validateBusiness({...valid,parentMallId:42}).ok,false));
test("rejects oversized description",()=>assert.equal(validateBusiness({...valid,description:"x".repeat(241)}).ok,false));


test("rejects tenant relation to a non-mall or missing parent", async () => {
  const { parseBusinessArray } = await import("../src/security.js");
  const record = { id:"tenant-1", name:"Tenant Demo", category:"Restaurant", location:"Denpasar", status:"Not Checked", description:"Demo", facilities:[], phone:"", website:"", parentMallId:"missing-mall" };
  assert.equal(parseBusinessArray(JSON.stringify([record]), []).ok, false);
});
