-post/signup/login/logout

profileRouter
-get /profile/view
-patch /profile/edit
-patch /profile/password

connectionRequestRouter
-post /request/send/interested/:userId  //swipe right
-post /request/send/ignored/:userId //swipe left
-post /request/review/accepted/:requestId
-post /request/review/rejected/:requestId

userRouter
-get user/connections
-get /user/requests/
-get user/feeds - get you the profiles or other users on platform
 