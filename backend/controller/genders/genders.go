package genders


import (

   "net/http"


   "project-se67/config"

   "project-se67/entity/customer"

   "github.com/gin-gonic/gin"

)


func GetAll(c *gin.Context) {


   db := config.DB()


   var genders []customer.Genders

   db.Find(&genders)


   c.JSON(http.StatusOK, &genders)


}