import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
import * as fs from "fs";
describe("error-codes tutorial test suite", () => {

  const contractKeys = JSON.parse(fs.readFileSync("./keys-contract.json").toString());
  let client: Client;
  let provider: Provider;

  const contractKey = contractKeys.stacksAddress;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(contractKey + ".error-codes", "error-codes", provider);
  });

  describe("Deploying an instance of the contract", () => {
    it("should have a valid syntax", async () => {
      await client.checkContract();
      await client.deployContract();
    });
  });

  describe("Asset tests", () => {
    it("not found should return error code 1", async () => {
      const result = await readFromContract(client, "err-not-allowed", []);
      assert.isOk(result.rawResult.indexOf('err 1') > -1, "Ensure err 1 is returned.");
    })
    it("not allowed should return error code 1", async () => {
      const result = await readFromContract(client, "err-not-found", []);
      assert.isOk(result.rawResult.indexOf('err 2') > -1, "Ensure err 2 is returned.");
    })
  });
  
  after(async () => {
    await provider.close();
  });
});
