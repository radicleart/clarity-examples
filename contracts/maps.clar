(define-constant administrator 'ST1ESYCGJB5Z5NBHS39XPC70PGC14WAQK5XXNQYDW)
(define-constant not-allowed (err 100))
(define-constant not-found (err 200))

;; Goal create a linked list.
(define-map projects ((x int) (y int)) ((prev-y int) (name (buff 20))))
(define-map counters ((x int)) (counter int))

(define-public (new-project)
  (begin
    
    (map-insert coordinates (tuple (x 1) (y 1)) ((prev-y 0) (name "Shopping Mall")))
    (map-insert coordinates (tuple (x 1) (y 2)) ((prev-y 1) (name "Town Hall")))
    (map-insert coordinates (tuple (x 1) (y 3)) ((prev-y 2) (name "Post Office")))
    (map-insert coordinates (tuple (x 2) (y 1)) ((prev-y 0) (name "Barbara")))
    (map-insert coordinates (tuple (x 2) (y 2)) ((prev-y 1) (name "Tony")))
    (map-insert coordinates (tuple (x 2) (y 3)) ((prev-y 2) (name "Sam")))
    ;; something is now at 1,1,1 so return unwrapped tuple
    (ok true)
  )
)
(define-public (test-map-2 (project-id int))
  (begin
    (map-insert coordinates (tuple (x 1) (y 1)) ((prev-y 0) (name "Shopping Mall")))
    (map-insert coordinates (tuple (x 1) (y 2)) ((prev-y 1) (name "Town Hall")))
    (map-insert coordinates (tuple (x 1) (y 3)) ((prev-y 2) (name "Post Office")))
    (map-insert coordinates (tuple (x 2) (y 1)) ((prev-y 0) (name "Barbara")))
    (map-insert coordinates (tuple (x 2) (y 2)) ((prev-y 1) (name "Tony")))
    (map-insert coordinates (tuple (x 2) (y 3)) ((prev-y 2) (name "Sam")))
    ;; something is now at 1,1,1 so return unwrapped tuple
    (ok true)
  )
)
