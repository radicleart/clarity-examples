;; Upto 10 fruits with names no more than 10 bytes
(define-data-var topic (buff 10) "astrology")

;; (var-set fruit
;;   (unwrap! (as-max-len? (append (var-get fruit) "apples") u10) (err 10)))

(define-read-only (get-topic)
    (ok (var-get topic)
))

(define-read-only (get-length)
    (ok (len (var-get topic))
))

(define-public (change-topic (new-topic (buff 10)))
  (ok (var-set topic new-topic))
)