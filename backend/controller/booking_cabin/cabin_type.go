package booking_cabin

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"team03/se67/config"
	"team03/se67/entity"
)

// GET /cabintypes
func ListCabinTypes(c *gin.Context){
	var cabintypes []entity.CabinType

	db := config.DB()
	results := db.Find(&cabintypes)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, cabintypes)
}
