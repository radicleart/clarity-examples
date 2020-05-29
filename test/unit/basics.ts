import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
import { readFromContract, execMethod } from "./query-utils"
describe("basics tutorial test suite", () => {

  let client: Client;
  let provider: Provider;

  const contractSig = "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB";
  const owner1Sig = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7";

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(contractSig + ".basics", "basics", provider);
  });

  describe("Deploying an instance of the contract", () => {
    it("should have a valid syntax", async () => {
      await client.checkContract();
      await client.deployContract();
    });
  });

  describe("Test begin structures", () => {
    it("test-begin-1", async () => {
      let result = await readFromContract(client, "test-begin-1", []);
      assert.isOk(result.rawResult.indexOf("5") > -1);
    })
    it("test-begin-2", async () => {
      let result = await readFromContract(client, "test-begin-2", []);
      assert.isOk(result.rawResult.indexOf("12") > -1);
    })
    it("test-begin-3", async () => {
      let result = await readFromContract(client, "test-begin-3", []);
      assert.isOk(result.rawResult.indexOf("ok true") > -1);
    })
    it("test-begin-4", async () => {
      let result = await readFromContract(client, "test-begin-4", []);
      assert.isOk(result.rawResult.indexOf("ok 3") > -1);
    })
  })

  describe("Test let structures", () => {
    it("test-let-1", async () => {
      let result = await readFromContract(client, "test-let-1", []);
      assert.isOk(result.rawResult.indexOf("ok 7") > -1);
    })
    it("test-let-2", async () => {
      let result = await readFromContract(client, "test-let-2", []);
      assert.isOk(result.rawResult.indexOf("20") > -1);
    })
  })

  describe("Test tuple structures", () => {
    it("test-tuple-1", async () => {
      let result = await readFromContract(client, "test-tuple-1", []);
      assert.isOk(result.rawResult.indexOf("ok 0x") > -1);
      assert.isOk(result.strings.indexOf("carrot") > -1);
    })
    it("test-tuple-2", async () => {
      let result = await readFromContract(client, "test-tuple-2", []);
      assert.isOk(result.rawResult.indexOf("ok 0x") > -1);
      assert.isOk(result.strings.indexOf("apple") > -1);
    })
    it("test-tuple-3 - note changes data so requires transaction signature.", async () => {
      //let result = await readFromContract(client, "test-tuple-3", []);
      let result = await execMethod(client, owner1Sig, "test-tuple-3", []);
      assert.isOk(result.success);
    })
    it("test-tuple-4", async () => {
      let result = await readFromContract(client, "test-tuple-4", []);
      assert.isOk(result.rawResult.indexOf("ok (some u19)") > -1);
    })
    it("test-tuple-5", async () => {
      let result = await readFromContract(client, "test-tuple-5", ["\"den\"", "\"pots\""]);
      assert.isOk(result.rawResult.indexOf("(ok (some (tuple (age u19) (height u167))))") > -1);
    })
  })

  describe("Test list structures", () => {
    it("test-list-1", async () => {
      let result = await readFromContract(client, "test-list-1", []);
      assert.isOk(result.rawResult.indexOf("(ok (1 2 3 5 8))") > -1);
    })
    it("test-list-2", async () => {
      let result = await readFromContract(client, "test-list-2", []);
      assert.isOk(result.rawResult.indexOf("(ok (0x486920 0x7468657265))") > -1);
      assert.isOk(result.strings.indexOf("there") > -1);
    })
    it("test-list-3", async () => {
      let result = await readFromContract(client, "test-list-3", []);
      assert.isOk(result.rawResult.indexOf("(ok (0x57697368202077657265 0x68657265))") > -1);
      assert.isOk(result.strings.indexOf("here") > -1);
    })
    it("test-list-4", async () => {
      let result = await readFromContract(client, "test-list-4", []);
      assert.isOk(result.rawResult.indexOf("(ok (0x57697368202077657265 0x68657265))") > -1);
      assert.isOk(result.strings.indexOf("here") > -1);
    })
    it("test-list-5", async () => {
      let result = await readFromContract(client, "test-list-5", []);
      assert.isOk(result.rawResult.indexOf("(ok (1 2 4 5))") > -1);
    })
    it("test-list-6", async () => {
      let result = await readFromContract(client, "test-list-6", []);
      assert.isOk(result.rawResult.indexOf("ok ((1 2) (4 5))") > -1);
    })
    it("test-list-7", async () => {
      let result = await readFromContract(client, "test-list-7", []);
      assert.isOk(result.rawResult.indexOf("(some (2 2 2))") > -1);
    })
    it("test-list-8", async () => {
      let res = await execMethod(client, owner1Sig, "test-list-8", []);
      assert.isOk(res.success);
      let result = await readFromContract(client, "test-list-8", []);
      assert.isOk(result.rawResult.indexOf("(ok (some (1 2 3 5 8 13)))") > -1);
    })
    it("test-list-9 max length fails if M < N", async () => {
      let result = await readFromContract(client, "test-list-9", []);
      assert.isOk(result.rawResult.indexOf("(ok none)") > -1);
    })
    it("test-list-10", async () => {
      let result = await readFromContract(client, "test-list-10", []);
      assert.isOk(result.rawResult.indexOf("(ok (some (1 2 3 5 8 13)))") > -1);
    })
    it("test-list-11", async () => {
      let result = await readFromContract(client, "test-list-11", []);
      assert.isOk(result.rawResult.indexOf("(ok u6)") > -1);
    })
    it("test-list-12", async () => {
      let result = await readFromContract(client, "test-list-12", []);
      assert.isOk(result.rawResult.indexOf("(ok (1 2 3 5 8 13 21))") > -1);
    })
    it("test-list-13", async () => {
      let result = await readFromContract(client, "test-list-13", []);
      assert.isOk(result.rawResult.indexOf("(ok (0x7c2d0e4bb1fdd9b98784c04a255e5991bcefb47f 0x3e3dfec3717972aad4735db5e32507a82ad66783 0xb2c1ebcf775ebf585f4dd70e9f2e6cd6a1dc02bf 0x69473ea0254678e39ed8e34a567eb348e2451434 0x8c39b96153c710f759c64cc6a746a69400250432 0xf60c07b6788f2e01d1561f8672ae0a40adff4095))") > -1);
    })
    it("test-list-14", async () => {
      let result = await readFromContract(client, "test-list-14", [], true);
      assert.isOk(result.rawResult.indexOf("(ok 132)") > -1);
    })
    it("test-list-15", async () => {
      let result = await readFromContract(client, "test-list-15", [], true);
      assert.isOk(result.rawResult.indexOf("(ok (2 8))") > -1);
    })
  })

  describe("Test var structures", () => {
    it("test-vars-1", async () => {
      let result = await readFromContract(client, "test-vars-1", []);
      assert.isOk(result.strings.indexOf("astrology") > -1);
    })
    it("test-vars-2", async () => {
      let result = await readFromContract(client, "test-vars-2", []);
      assert.isOk(result.rawResult.indexOf("(ok u9)") > -1);
    })
    it("test-vars-3", async () => {
      await execMethod(client, owner1Sig, "test-vars-3", ["\"history\""]);
      let result = await readFromContract(client, "test-vars-1", []);
      assert.isOk(result.strings.indexOf("history") > -1);
      result = await readFromContract(client, "test-vars-2", []);
      assert.isOk(result.rawResult.indexOf("ok u7") > -1);
    })
  });

  describe("Test unwrap structures", () => {
    it("test-unwrap-1 unwrap! ", async () => {
      let result = await readFromContract(client, "test-unwrap-1", []);
      assert.isOk(result.rawResult.indexOf("(err 1)") > -1);
    })
    it("test-unwrap-2 unwrap!", async () => {
      await execMethod(client, owner1Sig, "test-unwrap-2", []);
      let result = await readFromContract(client, "test-unwrap-2", []);
      assert.isOk(result.rawResult.indexOf("(ok (tuple (building 0x546f776e2048616c6c) (floors 10)))") > -1);
      assert.isOk(result.strings.indexOf("Town Hall") > -1);
    })
    it("test-unwrap-3 unwrap!", async () => {
      let result = await readFromContract(client, "test-unwrap-3", []);
      assert.isOk(result.rawResult.indexOf("(ok (some (tuple (building 0x546f776e2048616c6c) (floors 10))))") > -1);
      assert.isOk(result.strings.indexOf("Town Hall") > -1);
    })
    it("test-unwrap-4 unwrap!", async () => {
      let result = await readFromContract(client, "test-unwrap-4", []);
      assert.isOk(result.rawResult.indexOf("(err 100)") > -1);
    })
    it("test-unwrap-5 unwrap!", async () => {
      let result = await readFromContract(client, "test-unwrap-5", []);
      assert.isOk(result.rawResult.indexOf("1") > -1);
    })
  });

  describe("Test unwrap-err structures", () => {
    it("test-unwrap-err-1 unwrap! ", async () => {
      let result = await readFromContract(client, "test-unwrap-err-1", []);
      assert.isOk(result.rawResult.indexOf("1") > -1);
    })
    it("test-unwrap-err-1 unwrap! ", async () => {
      let result = await readFromContract(client, "test-unwrap-err-1", []);
      assert.isOk(result.rawResult.indexOf("1") > -1);
    })
  });

  describe("Test unwrap-err-panic structures", () => {
    it("test-unwrap-err-panic-1 unwrap! ", async () => {
      let result = await readFromContract(client, "test-unwrap-err-panic-1", []);
      assert.isOk(result.rawResult.indexOf("1") > -1);
    })
  });

  describe("Test unwrap-panic structures", () => {
    it("test-unwrap-panic-1 unwrap! ", async () => {
      let result = await readFromContract(client, "test-unwrap-panic-1", []);
      assert.isOk(result.rawResult.indexOf("50") > -1);
    })
    it("test-unwrap-panic-1 unwrap! ", async () => {
      let result = await readFromContract(client, "test-unwrap-panic-1", []);
      assert.isOk(result.rawResult.indexOf("50") > -1);
    })
  });

  describe("Test match structures", () => {
    it("test-match-optionals-1", async () => {
      let result = await readFromContract(client, "test-match-optionals-1", []);
      assert.isOk(result.rawResult.indexOf("15") > -1);
    })
    it("test-match-optionals-2", async () => {
      let result = await readFromContract(client, "test-match-optionals-2", []);
      assert.isOk(result.rawResult.indexOf("-10") > -1);
    })
    it("test-match-optionals-3", async () => {
      let result = await readFromContract(client, "test-match-optionals-3", []);
      assert.isOk(result.rawResult.indexOf("20") > -1);
    })
    it("test-match-optionals-4", async () => {
      let result = await readFromContract(client, "test-match-optionals-4", [], true);
      assert.isOk(result.rawResult.indexOf("20") > -1);
    })
    it("test-match-responses-1", async () => {
      let result = await readFromContract(client, "test-match-responses-1", []);
      //assert.isOk(result.rawResult.indexOf("15") > -1);
    })
    it("test-match-responses-2", async () => {
      let result = await readFromContract(client, "test-match-responses-2", []);
      //assert.isOk(result.rawResult.indexOf("15") > -1);
    })
  });


  after(async () => {
    await provider.close();
  });
});
