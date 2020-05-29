;; Building Blocks
;; Intention is to provide implementations of the example in the
;; clarity reference: https://docs.blockstack.org/core/smart/clarityref
;; as a community resource for developers wishing to learn Clarity

;; The begin function evaluates each of its input expressions, returning the return value 
;; of the last such expression.
(define-read-only (test-begin-1)
    (begin (+ 1 2) 4 5)
)
(define-read-only (test-begin-2)
    (begin (+ (+ 1 2) 4 5))
)
(define-public (test-begin-3)
    (begin 
        (ok (not (is-eq "2" "1")))
    )
)
(define-read-only (test-begin-4)
    (begin 
        (err 1)
        (ok 2)
        (ok 3)
    )
)

;; The let function accepts a list of variable name and expression pairs, evaluating each 
;; expression and binding it to the corresponding variable name. The context created by 
;; this set of bindings is used for evaluating its body expressions. The let expression 
;; returns the value of the last such body expression.
;; note define-public functions cannot return a raw value
(define-public (test-let-1)
    (let ((a 2) (b 5)) (ok (+ a b)))
)
;; note read only functions can return a raw value
(define-read-only (test-let-2)
    (let ((a 2) (b (+ 5 6 7))) (print a) (print b) (+ a b))
)

;; The tuple function constructs a typed tuple from the supplied key and expression pairs. 
;; A get function can use typed tuples as input to select specific values from a given tuple. 
;; Key names may not appear multiple times in the same tuple definition. Supplied expressions 
;; are evaluated and associated with the expressions paired key name.
(define-public (test-tuple-1)
    (ok (get vegetable (tuple (fruit "apple") (vegetable "carrot"))))
    ;; get returns an optional some/none value
    ;; (get (fruit my-tuple))
)

(define-public (test-tuple-2)
    (begin 
        (ok (get fruit (tuple (fruit "apple") (vegetable "carrot"))))
    )
)

(define-map names ((firstname (buff 10)) (lastname (buff 10))) ((age uint) (height uint)))
(define-public (test-tuple-3)
    (begin
        (map-insert names (tuple (firstname "den") (lastname "pots")) ((age u19) (height u167)))
        ;; note both keys have to be supplied here to get a value.
        (ok (get age (map-get? names (tuple (firstname "bob") (lastname "fob")))))
    )
)
(define-read-only (test-tuple-4)
    (begin
        ;; note both keys have to be supplied here to get a value.
        (ok (get age (map-get? names (tuple (firstname "den") (lastname "pots")))))
    )
)
(define-read-only (test-tuple-5 (fname (buff 10)) (lname (buff 10)))
    (begin
        ;; note both keys have to be supplied here to get a value.
        (ok (map-get? names (tuple (firstname fname) (lastname lname))))
    )
)

;; The list function constructs a list composed of the inputted values. 
;; Each supplied value must be of the same type.
(define-read-only (test-list-1)
    (ok (list (- 30 29) 2 (+ 1 2) (+ 3 2) (+ 5 3)))
)
(define-read-only (test-list-2)
    (ok (list (concat "Hi" " ") "there"))
)
(define-read-only (test-list-3)
    (ok 
        ;; note list element type is consistent.
        (list 
            (let ((one (concat "Wish" " ")) (two "you ") (three " were")) (concat one three))
            "here"
        )
    )
)
(define-read-only (test-list-4)
    (ok 
        (list
            (let ((one (concat "Wish" " ")) (two "you ") (three " were")) (concat one three)) "here"
        )
    )
)
(define-read-only (test-list-5)
    (ok (let ((a (list 1 2)) (b (list 4 5))) (concat a b)))
)
(define-read-only (test-list-6)
    (ok (let ((a (list 1 2)) (b (list 4 5))) (list a b)))
)
(define-read-only (test-list-7)
    (as-max-len? (list 2 2 2) u3)
)
(define-data-var in-list (list 10 int) (list))
(define-public (test-list-8)
    (begin
        (var-set in-list (list 1 2 3 5 8 13))
        (ok (as-max-len? (var-get in-list) u6))
    )
)
(define-public (test-list-9)
    (begin
        (var-set in-list (list 1 2 3 5 8 13))
        (ok (as-max-len? (var-get in-list) u4)) ;; u4 must be a literal
    )
)
(define-public (test-list-10)
    (begin
        (var-set in-list (list 1 2 3 5 8 13))
        (ok (as-max-len? (var-get in-list) u8)) ;; u4 must be a literal
    )
)
(define-read-only (test-list-11)
    (begin
        (ok (len (var-get in-list)))
    )
)
(define-read-only (test-list-12)
    (ok (append (var-get in-list) 21))
)
(define-read-only (test-list-13)
    (ok (map hash160 (var-get in-list)))
)
(define-read-only (test-list-14)
    (ok (fold + (var-get in-list) 100))
)
(define-private (is-even (value int))
    (is-eq 0 (mod value 2))
)
(define-read-only (test-list-15)
    (ok (filter is-even (var-get in-list)))
)

;; var get / set
(define-data-var topic (buff 10) "astrology")
(define-read-only (test-vars-1)
    (ok (var-get topic)
))
(define-read-only (test-vars-2)
    (ok (len (var-get topic))
))
(define-public (test-vars-3 (new-topic (buff 10)))
  (ok (var-set topic new-topic))
)

;; unwrap contructs
(define-map coordinates ((x int) (y int) (z int)) ((building (buff 10)) (floors int)))
(define-read-only (test-unwrap-1)
    ;; nothing at 1,1,1 so return err 1
    (ok (unwrap! (map-get? coordinates (tuple (x 1) (y 1) (z 1))) (err 1)))
)
(define-public (test-unwrap-2)
  (begin 
    (map-insert coordinates (tuple (x 1) (y 1) (z 1)) ((building "Town Hall") (floors 10)))
    ;; something is now at 1,1,1 so return unwrapped tuple
    (ok (unwrap! (map-get? coordinates (tuple (x 1) (y 1) (z 1))) (err 1)))
  )
)
(define-read-only (test-unwrap-3)
  (begin
    (ok 
        (let 
            ((one (unwrap! (map-get? coordinates (tuple (x 1) (y 1) (z 1))) (err 1)))) (some one)
        )
    )
  )
)
(define-read-only (test-unwrap-4)
  (begin
    (ok (let ((one (unwrap! (map-get? coordinates (tuple (x 2) (y 1) (z 1))) (err 100)))) (some one)))
  )
)
(define-read-only (test-unwrap-5)
    (unwrap! (some 1) 2)
)

;; return the inner value of the err - 1.
(define-read-only (test-unwrap-err-1)
    (unwrap-err! (err 1) 2)
)
;; can't make this compile?
;;(define-read-only (test-unwrap-err-1)
;;    (unwrap! (map-get? coordinates (tuple (x 1) (y 1) (z 1))) (err 1)) ;; Returns (tuple (id 1337))
;;)

;; allows an arror code to return else trown runtime exception.
(define-read-only (test-unwrap-err-panic-1)
    (unwrap-err-panic (err 1))
)
;; allows optionals and responses to be unpacked. If ok or some return inner value else throw runtime exception.
(define-read-only (test-unwrap-panic-1)
    (unwrap-panic (ok 50))
)
(define-read-only (test-unwrap-panic-2)
    (unwrap-panic (some 50))
)

;; match an optional and branch on some / none.
(define-read-only (test-match-optionals-1)
    (add-10 (some 5)) ;; returns 15
)
(define-read-only (test-match-optionals-2)
    ;; note (2,1,1) is none
    (add-10 (get floors (map-get? coordinates (tuple (x 2) (y 1) (z 1)))))
)
(define-read-only (test-match-optionals-3)
    ;; note (1,1,1) is some
    (add-10 (get floors (map-get? coordinates (tuple (x 1) (y 1) (z 1)))))
)
(define-public (test-match-optionals-4)
  (match (map-get? coordinates (tuple (x 1) (y 1) (z 1)))
    myProject (ok myProject) (err 2)
  )
)

(define-private (add-10 (x (optional int)))
  (match x
  value (+ 10 value)
  -10))
;; match a response and branch on ok / err.
(define-read-only (test-match-responses-1)
    ;; TODO (add-or-pass-err (ok 5) 20) ;; returns 25
    (unwrap! (some 1) 2)
)
(define-read-only (test-match-responses-2)
    ;; TODO (add-or-pass-err (err "ERROR") 20) ;; returns (err "ERROR")
    (unwrap! (some 1) 2)
)
;;(define-private (add-or-pass-err (x (response int)) (to-add int))
;;  (match x
;;   value (+ to-add value)
;;   err-value (err err-value))
;;)

