import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
describe("maps tutorial test suite", () => {

  let client: Client;
  let provider: Provider;

  const contractSig = "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB";
  const owner1Sig = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";
  const owner2Sig = "SP3T8WFCWHZNQ97SBYQH8T6ZJ1VWDMD46Y3VZ3JNJ";

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(contractSig + ".maps", "maps", provider);
  });

  describe("Deploying an instance of the contract", () => {
    it("should have a valid syntax", async () => {
      await client.checkContract();
      await client.deployContract();
    });
  });

  describe("Inserting and getting from maps", () => {
    it("inserting one object should let me get the object by key tuple", async () => {
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
      assert.isOk(txreceive.result.indexOf('Transaction executed and committed. Returned: false') > -1), "Did not insert alice1");
      assert.isOk(txreceive.success, "Inserted alice1");
    })
  });
  
  describe("Setting and getting from maps", () => {
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

  describe("Deletions from map ... ", () => {
  });
  after(async () => {
    await provider.close();
  });
});
