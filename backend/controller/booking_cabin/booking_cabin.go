package booking_cabin

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"team03/se67/config"
	"team03/se67/entity"
)

// GET /bookingcabins
func ListBookingCabins(c *gin.Context){
	var bookingcabins []entity.BookingCabin

	db := config.DB()
	results := db.Preload("Cabin").Preload("BookingTrip").Find(&bookingcabins)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, bookingcabins)
}

// GET /bookingcabin/:id
func GetBookingCabinByID(c *gin.Context){
	ID := c.Param("id")
	var bookingcabin entity.BookingCabin

	db := config.DB()
	results := db.Preload("Cabin").Preload("BookingTrip").First(&bookingcabin, ID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if bookingcabin.ID == 0{
		c.JSON(http.StatusNoContent, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, bookingcabin)
}

// POST /bookingcabin
func CreateBookingCabin(c *gin.Context){
	var bookingcabin entity.BookingCabin

	//bind เข้าตัวแปร bookingcabin
	if err := c.ShouldBindJSON(&bookingcabin); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	//ค้นหา bookingtrip ด้วย id
	var bookingtrip entity.BookingTrip
	db.First(&bookingtrip, bookingcabin.BookingTripID)
	if bookingtrip.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "bookingtrip not found"})
		return
	} 

	//ค้นหา cabin ด้วย id
	var cabin entity.Cabin
	db.First(&cabin, bookingcabin.CabinID)
	if cabin.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "cabin not found"})
		return
	}

	bc := entity.BookingCabin{
		CheckIn: bookingcabin.CheckIn,
		CheckOut: bookingcabin.CheckOut,
		BookingStatus: bookingcabin.BookingStatus,
		Note: bookingcabin.Note,
		TotalPrice: bookingcabin.TotalPrice,
		BookingTripID: bookingcabin.BookingTripID,
		// BookingTrip: bookingtrip,
		CabinID: bookingcabin.CabinID,
		// Cabin: cabin,
	}

	//บันทึก
	if err := db.Create(&bc).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": bc})
}

// PATCH /bookingcabin/:id
func UpdateBookingCabinByID(c *gin.Context){
	var bookingcabin entity.BookingCabin

	BookingCabinID := c.Param("id")

	db := config.DB()
	result := db.First(&bookingcabin, BookingCabinID)
	if result.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&bookingcabin); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&bookingcabin)
	if result.Error != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Update successful"})
}