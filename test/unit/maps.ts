import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
import * as fs from "fs";
describe("maps tutorial test suite", () => {

  let client: Client;
  let provider: Provider;
  const owner1Sig = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";

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

  describe("Map tests", () => {
    it("test-map-1 insert some names into the map", async () => {
      await execMethod(client, owner1Sig, "test-map-1", [], true);
      let result = await readFromContract(client, "test-map-1", []);
      assert.isOk(result.rawResult.indexOf("true") > -1);
    })
    it("test-map-1 insert some names into the map", async () => {
      await execMethod(client, owner1Sig, "test-map-1", [], true);
      let result = await readFromContract(client, "test-map-1", []);
      assert.isOk(result.rawResult.indexOf("true") > -1);
    })
  });

  after(async () => {
    await provider.close();
  });
});
