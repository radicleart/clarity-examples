;; A contract for manage non fungible digital collectibles.
;; Each digital collectible is represented by a SHA 256 hash
;; of the collectible itself (this can be generalised to a hash 
;; of ownership / provenance data).

;; NFTs can be minted for an amount of stax set by the contract administrator.

;; NFT meta data (name, collectible url etc) are stored externally via Gaia storage
;; and can be located from a call to metaDataURL

;; Non Fungible Token - clarity built in type
(define-non-fungible-token collectible-token (buff 32))
(define-constant contract-wallet 'ST18PE05NG1YN7X6VX9SN40NZYP7B6NQY6C96ZFRC.collectibles)

;; Storage
;; project-data-map : stores saas client details
(define-map project-data-map
  ((project-id int))
  ((meta-data-base-url (buff 120)) (mint-fee uint)))

;; collectibles-map : linked list of an owners assets
(define-map collectibles-map
  ((c-hash (buff 32)))
  ((prev (buff 32)) (next (buff 32))))

(define-public (dc-mint1 (mint-fee uint) (c-hash (buff 32)))
    (begin
      (let ((original-sender tx-sender))
      (print original-sender)
      (stx-transfer? mint-fee original-sender (as-contract tx-sender)))
      (nft-mint? collectible-token c-hash tx-sender)
      (ok
        (map-set collectibles-map (tuple (c-hash c-hash)) ((prev "0") (next "3"))))
    )
)

(define-public (dc-mint (mint-fee uint))
  (ok
    (stx-transfer? mint-fee tx-sender (as-contract tx-sender)))
)

;; owner is passed in as an argument
(define-read-only (dc-get (asset (buff 32)))
  (unwrap-panic (map-get? collectibles-map {c-hash: asset})))
