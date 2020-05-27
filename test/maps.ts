import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
import * as fs from "fs";
describe("maps tutorial test suite", () => {

  const contractKeys = JSON.parse(fs.readFileSync("./keys-contract.json").toString());
  const minterKeys = JSON.parse(fs.readFileSync("./keys-minter.json").toString());
  let client: Client;
  let provider: Provider;

  const owner1Sig = contractKeys.stacksAddress;
  const owner2Sig = minterKeys.stacksAddress;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(owner1Sig + ".maps", "maps", provider);
  });

  describe("Deploying an instance of the contract", () => {
    it("should have a valid syntax", async () => {
      await client.checkContract();
      await client.deployContract();
    });
  });

  describe("Project map tests", () => {
    it("should allow new project if tx-sender is contract owner", async () => {
      let txreceive = await execMethod(client, owner1Sig, "add-project", [ `'${owner2Sig}`, "\"http://risido.com/assets/v1\"","u5000"]);
      assert.isOk(txreceive.success, "Added project");
      const result = await readFromContract(client, "get-project", [`'${owner2Sig}`]);
      assert.equal(result.strings[0], "http://risido.com/assets/v1");
      assert.equal(result.strings.length, 1);
    })
  });
/**
  describe("Two key map operations", () => {
    it("insert one object should allow retrieve the object by key", async () => {
      let txreceive = await execMethod(client, owner1Sig, "insert-value", ["\"hash1\"", "\"alice1\"", "1"]);
      assert.isOk(txreceive.success, "Inserted (alice1, 1)");
      const result = await readFromContract(client, "get-by-owner", ["\"hash1\"", `'${owner1Sig}`]);
      assert.equal(result.rawResult, "(tuple (property1 0x616c69636531) (property2 1))");
      assert.equal(result.strings[0], "alice1");
      assert.equal(result.strings.length, 1);
    })
    it("inserting two objects should let me get the second by key tuple", async () => {
      let txreceive = await execMethod(client, owner1Sig, "insert-value", ["\"hash1\"", "\"alice1\"", "1"]);
      assert.isOk(txreceive.result.indexOf('Transaction executed and committed. Returned: false') > -1, "Did not insert alice1");
      assert.isOk(txreceive.success, "Inserted alice1");
      txreceive = await execMethod(client, owner1Sig, "insert-value", ["\"hash2\"", "\"alice2\"", "2"]);
      assert.isOk(txreceive.success, "Inserted alice2");
      const result = await readFromContract(client, "get-by-owner", ["\"hash1\"", `'${owner1Sig}`]);
      assert.equal(result.rawResult, "(tuple (property1 0x616c69636531) (property2 1))");
      assert.equal(result.strings[0], "alice1");
      assert.equal(result.strings.length, 1);
    })
    it("inserting same object twice returns false", async () => {
      let txreceive = await execMethod(client, owner1Sig, "insert-value", ["\"hash1\"", "\"alice1\"", "1"]);
      assert.isOk(txreceive.result.indexOf('Transaction executed and committed. Returned: false') > -1, "Did not insert alice1");
      assert.isOk(txreceive.success, "Inserted alice1");
    })
    it("sets should return last entry", async () => {
      await execMethod(client, owner1Sig, "set-value", ["\"hash1\"", "\"bob1\"", "1"]);
      await execMethod(client, owner1Sig, "set-value", ["\"hash1\"", "\"bob2\"", "2"]);
      const result = await readFromContract(client, "get-by-owner", ["\"hash1\"", `'${owner1Sig}`]);
      assert.equal(result.rawResult, "(tuple (property1 0x626f6232) (property2 2))");
      assert.equal(result.strings[0], "bob2");
      assert.equal(result.strings.length, 1);
    })

    it("get all entries for key", async () => {
      await execMethod(client, owner1Sig, "set-value", ["\"hash2\"", "\"pete\"", "1"]);
      await execMethod(client, owner1Sig, "set-value", ["\"hash2\"", "\"bob\"", "2"]);
      const result = await readFromContract(client, "get-by-owner", ["\"hash2\"", `'${owner1Sig}`]);
      assert.equal(result.rawResult, "(tuple (property1 0x626f62) (property2 2))");
      assert.equal(result.strings[0], "bob");
      assert.equal(result.strings.length, 1);
    })
  });
**/
after(async () => {
    await provider.close();
  });
});
