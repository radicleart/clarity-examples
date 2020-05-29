;; Basic contract demonstrating minting of non fungible digital collectibles.

;; This contract aims to shows how an NFT can be minted for an amount of stax. 
;; The roadmap / ambition is to represent digital collectible projects as a data type
;; and provide 
;; - minting / registration of digital collectibles
;; - marketplace functionality
;; - auction capability
;; for digital collectible projects.

;; NFT meta data (name, collectible url etc) are stored externally via Gaia storage
;; and can be located from a call to metaDataURL

;; Our intention is to represent digital collectibles as a space of SHA 256 hashes
;; which secure the collectible itself and or its provenance (ownership history) data.

;; Non Fungible Token - clarity built in data structure
(define-data-var asset-id int 0)
(define-non-fungible-token nongibles (buff 32))

;; Contract address - produced by calling cargo run --bin blockstack-cli generate-sk --testnet
(define-constant contract-address 'ST18PE05NG1YN7X6VX9SN40NZYP7B6NQY6C96ZFRC.assets)
(define-constant contract-error-codes 'ST1X3RGAZ0EBFW9C1TWD3BSBYYTTCB060EV0WTWJ9.error-codes)

;; Storage
;; collectibles-map : linked list of an owners assets
(define-map nongible-owner-map 
  ((owner principal))
  ((project-id principal) (nongible (buff 32)))
)

(define-public (mint-nongible (projectId principal) (assetHash (buff 32)))
  (begin
    (nft-mint? nongibles assetHash tx-sender)
    (ok
      (map-insert nongible-owner-map {owner: tx-sender} ((project-id projectId) (nongible assetHash)))
    )
  )
)

;; owner is passed in as an argument
(define-public (get-nongible-by-owner (owner principal))
  (match (map-get? nongible-owner-map {owner: owner})
    myNongible (ok myNongible) (contract-call? contract-error-codes err-not-found)
  )
)

;; owner is passed in as an argument
(define-public (get-nongible-by-identifier (assetHash (buff 32)))
  (match (nft-get-owner? nongibles assetHash)
    myNongible (ok myNongible) (contract-call? ST1X3RGAZ0EBFW9C1TWD3BSBYYTTCB060EV0WTWJ9.error-codes err-not-found)
  )
)
