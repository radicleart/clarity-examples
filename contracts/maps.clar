(define-map two-key-map ((owner principal) (asset-hash (buff 32))) ((property1 (buff 40)) (property2 int)))

;; set values in map
(define-public (set-value (asset (buff 32)) (name (buff 40)) (age int))
  (begin
    (ok
      (map-set two-key-map (tuple (owner tx-sender) (asset-hash asset)) ((property1 name) (property2 age)))
    )
  )
)

;; owner has been set via the transaction signature
(define-public (insert-value (asset (buff 32)) (name (buff 40)) (age int))
  (begin
  (ok (map-insert two-key-map (tuple (owner tx-sender) (asset-hash asset)) ((property1 name) (property2 age)))))
)


;; owner is passed in as an argument
(define-read-only (get-by-owner (asset (buff 32)) (owner principal))
  (unwrap-panic (map-get? two-key-map {owner: owner, asset-hash: asset})))

;; owner is passed in as an argument
