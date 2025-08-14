func SignUp(c * gin.Context){
	
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	emailCount, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
	defer cancel()

	if err != nil {
		log.Panic(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while checking for the email"})
	}

	password := HashPassword(*user.Password)
	user.Password = &password

	if emailCount > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User with this email already exists!"})
		return
	}
	user.ID = primitive.NewObjectID()
	_, insertErr := userCollection.InsertOne(ctx, user)
	if insertErr != nil {
		msg := fmt.Sprintf("user item was not created")
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		return
	}
	defer cancel()
	userId := user.ID.Hex()
	username := *user.Name

	token, err, expirationTime := auth.GenerateJWT(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while generating token"})
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Value:   token,
		Expires: expirationTime,
	})

	http.SetCookie(c.Writer, &http.Cookie{
		Name : "userID",
		Value : userId,
		Expires: expirationTime,
	})
	http.SetCookie(c.Writer, &http.Cookie{
		Name : "username",
		Value : username,
		Expires: expirationTime,
	})

	// Return success response that the frontend can handle
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User created successfully", 
		"redirect": "/signup-success",
	})
}