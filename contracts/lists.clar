;; Upto 10 fruits with names no more than 10 bytes
(define-data-var fruits (list 10 (buff 10)) (list))

;; (var-set fruit
;;   (unwrap! (as-max-len? (append (var-get fruit) "apples") u10) (err 10)))

(define-read-only (get-fruits)
    (ok (var-get fruits)
))

(define-public (add-fruit (fruit (buff 10)))
  (begin (var-set fruits (list fruit))
  (ok (append (var-get fruits) fruit))
))