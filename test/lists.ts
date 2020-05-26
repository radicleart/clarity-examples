import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
describe("lists tutorial test suite", () => {

  let client: Client;
  let provider: Provider;

  const contractSig = "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB";
  const owner1Sig = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";
  const owner2Sig = "SP3T8WFCWHZNQ97SBYQH8T6ZJ1VWDMD46Y3VZ3JNJ";

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(contractSig + ".lists", "lists", provider);
  });

  describe("Deploying an instance of the contract", () => {
    it("should have a valid syntax", async () => {
      await client.checkContract();
      await client.deployContract();
    });
  });

  describe("Get list", () => {
    it("should return empty list", async () => {
      const result = await readFromContract(client, "get-fruits", []);
      assert.equal(result.rawResult, "(ok ())");
    })
    it("should return apples", async () => {
      await execMethod(client, owner1Sig, "add-fruit", ["\"apples\""]);
      const result = await readFromContract(client, "get-fruits", []);
      assert.isOk(result.strings.indexOf("apples") > -1, "(ok (apples))");
    })
  });

  after(async () => {
    await provider.close();
  });
});
