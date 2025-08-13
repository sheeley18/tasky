package main

import (
	"net/http"
	controller "github.com/jeffthorne/tasky/controllers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)


func index(c *gin.Context) {
	// Add version info that's visible
	data := gin.H{
		"AppVersion": "v2.0-rolling-update",
		"DeployTime": time.Now().Format("2006-01-02 15:04:05 MST"),
		"Environment": "Production EKS",
	}
	c.HTML(http.StatusOK, "login.html", data)
}

func index(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", nil)
}

func main() {
	godotenv.Overload()
	
	router := gin.Default()
	router.LoadHTMLGlob("assets/*.html")
	router.Static("/assets", "./assets")

	router.GET("/", index)
	router.GET("/todos/:userid", controller.GetTodos)
	router.GET("/todo/:id", controller.GetTodo)
	router.POST("/todo/:userid", controller.AddTodo)
	router.DELETE("/todo/:userid/:id", controller.DeleteTodo)
	router.DELETE("/todos/:userid", controller.ClearAll)
	router.PUT("/todo", controller.UpdateTodo)


	router.POST("/signup", controller.SignUp)
	router.POST("/login", controller.Login)
	router.GET("/todo", controller.Todo)

	router.Run(":8080" )

}
