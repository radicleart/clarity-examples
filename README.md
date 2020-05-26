# Clarity Tutorial 2020.


Much of this was worked out by [friedger](https://github.com/friedger/clarity-smart-contracts) in Blockstack Community.

```
$ cargo run --bin blockstack-cli generate-sk --testnet > ../../radicle-solutions/clarity-tutorials/keys4.json
```

### Run Mocknet

In directory **stacks-blockchain**:

```
cargo testnet start --config=./testnet/stacks-node/Stacks.toml
```



@mijoco prints actually produce events
byadding an events_observer in your toml file, you setup a webhook that can subscribe to events, and receive an http call when one of these occurs
https://github.com/blockstack/stacks-blockchain/blob/a94119e39eeeee13a5cd1d1fa4e012217b73d657/testnet/stacks-node/conf/local-follower-conf.toml#L31
we'll probably add named events with indexed fields in a future
mijocoToday at 15:29
@diwaker @ludo great! Yes - solidity mutator funcs don't 'return' variables (just the txid) so you need events to get the change in state back to the client and they enable lots more. So its great we have this capability also!


[[events_observer]]
endpoint = "http://127.0.0.1:8080"
events_keys = [
    "STGT7GSMZG7EA0TS6MVSKT5JC1DCDFGZWJJZXN8A.store::print",
    "STGT7GSMZG7EA0TS6MVSKT5JC1DCDFGZWJJZXN8A.contract.ft-token",
    "STGT7GSMZG7EA0TS6MVSKT5JC1DCDFGZWJJZXN8A.contract.nft-token",
    "stx"
]



@mijoco I'm not familiar with events in ethereum, but we do have a mechanism to "emit" events as they happen on the chain, and this event stream can be consumed for storage / analysis etc. This is how we're building the backend of the new Explorer. Is that similar to what you were asking?
jefreybullaToday at 15:20
I've trying to use the v2/contracts endpoint to call a smart contract function but I keep getting a '400 bad request' from the node (I am using Mocknet)

Has anyone been successful at this?

curl http://127.0.0.1:20443/v2/accounts/ST3PP4PA8H5CRQPVFYA52HH7SX5P53B041JC4SSM6?proof=0
{"balance":"0x000000000000000000000000000f4240","nonce":0}
