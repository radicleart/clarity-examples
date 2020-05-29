# Clarity Hackathon Level 2 2020

## Clarity in the Community

Intention is to provide implementations of the examples in the
[clarity reference](https://docs.blockstack.org/core/smart/clarityref)
as a community resource for developers wishing to learn Clarity.

## Unit Tests

```bash
git clone git@github.com:radicleart/clarity-examples.git

npm install
```

(node version `nvm use v12.16.3`)

test classes can be found in `test/unit/*.ts`

```javascript
npm run basics
npm run maps
```

Note: nongibles tests currently fail because of current limitations in tooling around using
`(contract-call?)` in unit test environment.

## References

* [Blockstack Clarity Documentation](https://docs.blockstack.org/core/smart/rpc-api.html)
* [Stacks Transactions JS Library](https://github.com/blockstack/stacks-transactions-js)
* [Stacks Blockchain](https://github.com/blockstack/stacks-blockchain)
* [Stacks Blockchain Sidecar](https://github.com/blockstack/stacks-blockchain-sidecar)
* [Clarity JS SDK](https://github.com/blockstack/clarity-js-sdk)
* [Clarity VSCode](https://github.com/blockstack/clarity-vscode)
