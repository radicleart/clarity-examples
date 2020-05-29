;; Map functions
;; Intention is to provide implementation of the example in the
;; clarity reference: https://docs.blockstack.org/core/smart/clarityref
;; as a community resource for developers wishing to learn Clarity

(define-map coordinates ((x int) (y int)) ((prev-y int) (name (buff 20))))
(define-map link-map ((x int)) ((counter int)))

;; In progress: demonstrate linked / double linked list data structures.
(define-public (new-project)
  (begin
    (map-insert coordinates (tuple (x 1) (y 1)) ((prev-y 0) (name "Shopping Mall")))
    (map-insert coordinates (tuple (x 1) (y 2)) ((prev-y 1) (name "Town Hall")))
    (map-insert coordinates (tuple (x 1) (y 3)) ((prev-y 2) (name "Post Office")))
    (map-insert coordinates (tuple (x 2) (y 1)) ((prev-y 0) (name "Barbara")))
    (map-insert coordinates (tuple (x 2) (y 2)) ((prev-y 1) (name "Tony")))
    (map-insert coordinates (tuple (x 2) (y 3)) ((prev-y 2) (name "Sam")))
    ;; something is now at 1,1,1 so return unwrapped tuple
    (ok 1)
  )
)
