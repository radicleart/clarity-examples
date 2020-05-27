;; Project Administration
;; --------------------------

;; Constants
(define-constant administrator 'ST18PE05NG1YN7X6VX9SN40NZYP7B6NQY6C96ZFRC)
(define-constant not-allowed (err 1))

;; Storage
(define-data-var counter int 0)

;; PROJECT-MAP
;; params: 
;;     base-url - url from where to read project meta data
;;     mint-fee - fee 
(define-map project-map
  ((project-id principal))
  ((base-url (buff 40)) (mint-fee uint)))

;; Add a new project - administrator level call.
(define-public (add-project (projectId principal) (baseUrl (buff 40)) (mintFee uint))
  (begin
    (if (is-allowed)
      (begin
        (map-set project-map {project-id: projectId} ((base-url baseUrl) (mint-fee mintFee)))
        (ok (var-get counter)))
      (err not-allowed)
    )
  )
)

(define-read-only (get-project (projectId principal))
  (unwrap-panic (map-get? project-map {project-id: projectId})))

;; Only contract administrator can do these things.
(define-private (is-allowed)
  (is-eq tx-sender administrator)
)

;; Two Key Map Examples
;; --------------------------
;; 1. Storage
(define-map two-key-map ((owner principal) (asset-hash (buff 32))) ((property1 (buff 40)) (property2 int)))

;; 2. Public Functions
;; set values in map
(define-public (set-value (asset (buff 32)) (name (buff 40)) (age int))
  (begin
    (ok
      (map-set two-key-map (tuple (owner tx-sender) (asset-hash asset)) ((property1 name) (property2 age)))
    )
  )
)

;; insert values in map
(define-public (insert-value (asset (buff 32)) (name (buff 40)) (age int))
  (begin
  (ok (map-insert two-key-map (tuple (owner tx-sender) (asset-hash asset)) ((property1 name) (property2 age)))))
)

;; 3. Read Only Functions
;; read values from a map
(define-read-only (get-by-owner (asset (buff 32)) (owner principal))
  (unwrap-panic (map-get? two-key-map {owner: owner, asset-hash: asset})))