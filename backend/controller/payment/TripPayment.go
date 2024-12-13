package payment

import (
	"net/http"
	"project-se67/config"
	"project-se67/entity/payment"
	"github.com/gin-gonic/gin"
)

func GetAllTripPayments(c *gin.Context) {
	var tripPayments []payment.TripPayment
	db := config.DB()

	if err := db.Find(&tripPayments).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, tripPayments)
}

func GetTripPayment(c *gin.Context) {
	ID := c.Param("id")
	var tripPayment payment.TripPayment
	db := config.DB()

	if err := db.First(&tripPayment, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, tripPayment)
}

func CreateTripPayment(c *gin.Context) {
	var tripPayment payment.TripPayment
	if err := c.ShouldBindJSON(&tripPayment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()
	if err := db.Create(&tripPayment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, tripPayment)
}

func UpdateTripPayment(c *gin.Context) {
	var tripPayment payment.TripPayment
	db := config.DB()

	if err := db.First(&tripPayment, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&tripPayment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db.Save(&tripPayment)
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func DeleteTripPayment(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	if tx := db.Delete(&payment.TripPayment{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
