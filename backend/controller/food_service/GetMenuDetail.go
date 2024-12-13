package food_service

import (
	"net/http"
	"project-se67/config"
	"project-se67/entity/food_service"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Controller function to get the details of a menu by ID
func GetMenuDetails(c *gin.Context) {
	// Get the Menu ID from URL params
	db := config.DB()
	
	menuID := c.Param("id")
	var menu food_service.Menu

	// Fetch the menu from the database using the MenuID
	if err := db.Preload("FoodCategory").Preload("MenuItemOptions.MenuOption").Where("id = ?", menuID).First(&menu).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "Menu not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// Return the menu details along with associated data
	c.JSON(http.StatusOK, gin.H{
		"MenuID":       menu.ID,
		"MenuName":     menu.MenuName,
		"Price":        menu.Price,
		"Description":  menu.Description,
		"ImageMenu":    menu.ImageMenu,
		"FoodCategory": menu.FoodCategory.Name,
	})
}
