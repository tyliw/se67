package booking_trip

import (
	"net/http"
	"time"

	"team03/se67/config"
	"team03/se67/entity"

	"github.com/gin-gonic/gin"
)

// GET /bookingtrips
func ListBookingTrips(c *gin.Context) {
	var bookingtrips []entity.BookingTrip

	db := config.DB()
	results := db.Preload("Customer").Preload("CruiseTrip").Find(&bookingtrips)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, bookingtrips)
}

// GET /bookingtrip/:id
func GetBookingTripByID(c *gin.Context) {
	ID := c.Param("id")
	var bookingtrip entity.BookingTrip

	db := config.DB()
	results := db.Preload("Customer").Preload("CruiseTrip").First(&bookingtrip, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if bookingtrip.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, bookingtrip)
}

// POST /bookingtrip
func CreateBookingTrip(c *gin.Context) {
	var bookingtrip entity.BookingTrip

	// Bind ข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&bookingtrip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหาข้อมูลลูกค้าโดยใช้ CustomerID
	var customer entity.Customers
	db.First(&customer, bookingtrip.CustomerID)
	if customer.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	// ค้นหาข้อมูล CruiseTrip โดยใช้ CruiseTripID
	var cruisetrip entity.CruiseTrip
	db.First(&cruisetrip, bookingtrip.CruiseTripID)
	if cruisetrip.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "CruiseTrip not found"})
		return
	}

	// ตั้งค่า BookingDate เป็นเวลาปัจจุบัน
	bookingtrip.BookingDate = time.Now()

	// สร้าง BookingTrip ใหม่
	bt := entity.BookingTrip{
		BookingDate:   bookingtrip.BookingDate,
		BookingStatus: bookingtrip.BookingStatus, // ค่าสถานะจาก JSON
		CustomerID:    bookingtrip.CustomerID,
		// Customer:      customer,
		CruiseTripID:  bookingtrip.CruiseTripID,
		// CruiseTrip:    cruisetrip,
	}

	// บันทึกข้อมูล BookingTrip
	if err := db.Create(&bt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": bt})
}

// PATCH /bookingtrip/:id
func UpdateBookingTripByID(c *gin.Context) {
	var bookingtrip entity.BookingTrip

	BookingTripID := c.Param("id")

	db := config.DB()
	result := db.First(&bookingtrip, BookingTripID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	// Bind ข้อมูลจาก JSON เพื่ออัปเดต BookingTrip
	if err := c.ShouldBindJSON(&bookingtrip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// บันทึกข้อมูลการอัปเดต
	result = db.Save(&bookingtrip)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}