The error i get: 

Error retrieving the scores. TypeError: User.getUserByHighestScore is not a function
    at getHighestScore (C:\Users\chenj\BedAssignmentCheckpoint2\BEDAssignment\controllers\userController.js:7:49)
    at Layer.handle [as handle_request] (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\layer.js:95:5)
    at C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\index.js:346:12)
    at next (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\express\lib\router\index.js:280:10)
    at SendStream.error (C:\Users\chenj\BedAssignmentCheckpoint2\node_modules\serve-static\index.js:121:7)
    at SendStream.emit (node:events:519:28)
(node:29396) Warning: Accessing non-existent property 'getUserByHighestScore' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
