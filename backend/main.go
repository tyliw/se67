package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"project-se67/config"
	"project-se67/controller/customer"
	"project-se67/controller/food_service"
	"project-se67/controller/genders"
	"project-se67/controller/payment"
	"project-se67/middlewares"
	"project-se67/servers"
	// "bytes"
	// "encoding/json"
	// "io"
	// "log"
	// "net/http"
	// "github.com/stripe/stripe-go/v81"
	// "github.com/stripe/stripe-go/v81/checkout/session"
)

const PORT = "8000"

func main() {
	// เปิดการเชื่อมต่อฐานข้อมูล
	config.ConnectionDB()
	// สร้างฐานข้อมูล
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware()) // ใช้งาน CORS middleware

	// Auth Route
	r.POST("/signup", customer.SignUp)
	r.POST("/signin", customer.SignIn)

	// เส้นทางสำหรับการสมัครและลงชื่อเข้าใช้

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())

		// User Route
		router.PUT("/user/:id", customer.Update)
		router.GET("/users", customer.GetAll)
		router.GET("/user/:id", customer.Get)
		router.DELETE("/user/:id", customer.Delete)

		// เส้นทางการจัดการ payment
		router.GET("/foodservicepayments", payment.GetAllFoodServicePayments)
		router.GET("/foodservicepayment/:id", payment.GetFoodServicePayment)
		router.POST("/foodservicepayment", payment.CreateFoodServicePayment)
		router.PUT("/foodservicepayment/:id", payment.UpdateFoodServicePayment)
		router.DELETE("/foodservicepayment/:id", payment.DeleteFoodServicePayment)

		router.GET("/trippayments", payment.GetAllTripPayments)
		router.GET("/trippayment/:id", payment.GetTripPayment)
		router.POST("/trippayment", payment.CreateTripPayment)
		router.PUT("/trippayment/:id", payment.UpdateTripPayment)
		router.DELETE("/trippayment/:id", payment.DeleteTripPayment)

		// เส้นทางการจัดการ food_service
		router.GET("/foodcategories", food_service.GetAllFoodCategories)
		router.GET("/foodcategory/:id", food_service.GetFoodCategory)
		router.POST("/foodcategory", food_service.CreateFoodCategory)
		router.PUT("/foodcategory/:id", food_service.UpdateFoodCategory)
		router.DELETE("/foodcategory/:id", food_service.DeleteFoodCategory)

		router.GET("/menus", food_service.GetAllMenus)
		router.GET("/menu/:id", food_service.GetMenu)
		router.POST("/menu", food_service.CreateMenu)
		router.PUT("/menu/:id", food_service.UpdateMenu)
		router.DELETE("/menu/:id", food_service.DeleteMenu)

		router.GET("/order-detail-menu-options", food_service.GetAllOrderDetailMenuOptions)
		router.GET("/order-detail-menu-options/:id", food_service.GetOrderDetailMenuOption)
		router.POST("/order-detail-menu-options", food_service.CreateOrderDetailMenuOption)
		router.PUT("/order-detail-menu-options/:id", food_service.UpdateOrderDetailMenuOption)
		router.DELETE("/order-detail-menu-options/:id", food_service.DeleteOrderDetailMenuOption)

		router.GET("/order-details", food_service.GetAllOrderDetails)
		router.GET("/order-detail/:id", food_service.GetOrderDetail)
		router.POST("/order-detail", food_service.CreateOrderDetail)
		router.PUT("/order-detail/:id", food_service.UpdateOrderDetail)
		router.DELETE("/order-detail/:id", food_service.DeleteOrderDetail)

		router.GET("/orders", food_service.GetAllOrders)
		router.GET("/order/:id", food_service.GetOrder)
		router.POST("/order", food_service.CreateOrder)
		router.PUT("/order/:id", food_service.UpdateOrder)
		router.DELETE("/order/:id", food_service.DeleteOrder)

		// เส้นทางการจัดการ MenuItemOption
		router.GET("/menu-item-options", food_service.GetAllMenuItemOptions)
		router.GET("/menu-item-option/:id", food_service.GetMenuItemOption)
		router.POST("/menu-item-option", food_service.CreateMenuItemOption)
		router.DELETE("/menu-item-option/:id", food_service.DeleteMenuItemOption)

		// เส้นทางการจัดการ MenuOption
		router.GET("/menu-options", food_service.GetAllMenuOptions)
		router.POST("/menu-options", food_service.CreateMenuOption)
		router.PUT("/menu-options/:id", food_service.UpdateMenuOption)

		//
		router.GET("/menudetail/:id", food_service.GetMenuDetails)
	}

	r.GET("/genders", genders.GetAll)

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	go servers.Server()

	// เริ่มต้น server
	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
