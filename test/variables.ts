import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
describe("variables tutorial test suite", () => {

  let client: Client;
  let provider: Provider;

  const contractSig = "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB";
  const owner1Sig = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";
  const owner2Sig = "SP3T8WFCWHZNQ97SBYQH8T6ZJ1VWDMD46Y3VZ3JNJ";

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(contractSig + ".variables", "variables", provider);
  });

  describe("Deploying an instance of the contract", () => {
    it("should have a valid syntax", async () => {
      await client.checkContract();
      await client.deployContract();
    });
  });

  describe("Get starting topic", () => {
    it("should return astrology", async () => {
      let result = await readFromContract(client, "get-topic", []);
      assert.isOk(result.strings.indexOf("astrology") > -1);
      result = await readFromContract(client, "get-length", []);
      assert.isOk(result.rawResult.indexOf("ok u9") > -1);
    })
    it("should return history", async () => {
      await execMethod(client, owner1Sig, "change-topic", ["\"history\""]);
      let result = await readFromContract(client, "get-topic", []);
      assert.isOk(result.strings.indexOf("history") > -1);
      result = await readFromContract(client, "get-length", []);
      assert.isOk(result.rawResult.indexOf("ok u7") > -1);
    })
  });

  after(async () => {
    await provider.close();
  });
});
