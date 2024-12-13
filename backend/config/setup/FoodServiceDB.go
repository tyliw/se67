package setup

import (
	"fmt"
	"project-se67/entity/food_service"
	"time"

	"gorm.io/gorm"
)

// SetupFoodServiceDatabase ตั้งค่าฐานข้อมูล Food Service
func SetupFoodServiceDatabase(db *gorm.DB) {
	// Auto-migrate tables
	db.AutoMigrate(
		&food_service.FoodCategory{},
		&food_service.Menu{},
		&food_service.MenuOption{},
		&food_service.MenuItemOption{},
		&food_service.Order{},
		&food_service.OrderDetail{},
		&food_service.OrderDetailMenuOption{},
	)

	foodCategories := []food_service.FoodCategory{
		{Name: "Beverages", FoodCategoryImage: "https://sodasense.com/cdn/shop/articles/kaizen-nguy-n-jcLcWL8D7AQ-unsplash.jpg?v=1689613635width=584"},
		{Name: "Main Dishes", FoodCategoryImage: "https://www.recipetineats.com/tachyon/2024/10/Massaman-lamb-shoulder_9a.jpg?resize=747%2C747"},
		{Name: "Appetizers", FoodCategoryImage: "https://www.healthylifetrainer.com/wp-content/uploads/2021/01/Shrimp-Appetizers-Easy-Party-Appetizers-19.jpg"},
		{Name: "Desserts", FoodCategoryImage: "https://richanddelish.com/wp-content/uploads/2023/05/mini-fruit-tarts-10-of-17.jpg"},
		{Name: "Salads", FoodCategoryImage: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F718cdc61ace1aaf778fea1e0e82548cac12bc237_32aa25_cropped"},
		{Name: "Soups", FoodCategoryImage: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-main.jpg"},
		{Name: "Seafood", FoodCategoryImage: "https://images.immediate.co.uk/production/volatile/sites/30/2021/07/Roast-seafood-dish-b585388.jpg"},
		{Name: "Vegetarian", FoodCategoryImage: "https://images.theconversation.com/files/431688/original/file-20211112-15043-xoxxmg.jpg?ixlib=rb-4.1.0&rect=25%2C8%2C5725%2C3819&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"},
		{Name: "Pasta", FoodCategoryImage: "https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg"},
		{Name: "Snacks", FoodCategoryImage: "https://www.cratejoy.com/cdn/shop/files/wNOhbIsQM2WP3M2DRvfY.jpg?v=1726062746"},
	}
	for i := range foodCategories {
		db.FirstOrCreate(&foodCategories[i], food_service.FoodCategory{Name: foodCategories[i].Name})
	}
	
	menus := []food_service.Menu{
		{MenuName: "Orange Juice", Price: 40.00, Description: "Fresh orange juice", ImageMenu: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-03/orange-juice-1-jp-240311-1e99ea.jpg", FoodCategoryID: foodCategories[0].ID},
		{MenuName: "Steak", Price: 250.00, Description: "Grilled steak", ImageMenu: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4-728x1092.jpg", FoodCategoryID: foodCategories[1].ID},
		{MenuName: "Fried Chicken Wings", Price: 120.00, Description: "Crispy fried chicken wings", ImageMenu: "https://easychickenrecipes.com/wp-content/uploads/2023/08/featured-buffalo-wings-recipe-500x500.jpg", FoodCategoryID: foodCategories[2].ID},
		{MenuName: "Caesar Salad", Price: 90.00, Description: "Classic Caesar salad with croutons", ImageMenu: "https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg", FoodCategoryID: foodCategories[2].ID},
		{MenuName: "Margherita Pizza", Price: 180.00, Description: "Classic Margherita with fresh mozzarella", ImageMenu: "https://kristineskitchenblog.com/wp-content/uploads/2024/07/margherita-pizza-22-2.jpg", FoodCategoryID: foodCategories[1].ID},
		{MenuName: "Spaghetti Carbonara", Price: 150.00, Description: "Creamy pasta with bacon and parmesan", ImageMenu: "https://www.foodnetwork.com/content/dam/images/food/fullset/2009/6/12/2/FO1D41_23785_s4x3.jpg", FoodCategoryID: foodCategories[1].ID},
		{MenuName: "Tom Yum Soup", Price: 120.00, Description: "Spicy and sour Thai soup", ImageMenu: "https://evergreenkitchen.ca/wp-content/uploads/2021/10/Vegan-Tom-Yum-Soup-0-4X5.jpg", FoodCategoryID: foodCategories[1].ID},
		{MenuName: "Mango Sticky Rice", Price: 80.00, Description: "Sweet sticky rice with fresh mango", ImageMenu: "https://www.vibrantplate.com/wp-content/uploads/2024/03/Thai-Mango-Sticky-Rice-05-735x1103.jpg", FoodCategoryID: foodCategories[2].ID},
		{MenuName: "Green Tea Latte", Price: 70.00, Description: "Smooth green tea with milk", ImageMenu: "https://munchingwithmariyah.com/wp-content/uploads/2020/06/IMG_0748.jpg", FoodCategoryID: foodCategories[0].ID},
		{MenuName: "Chocolate Cake", Price: 100.00, Description: "Rich chocolate layer cake", ImageMenu: "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg", FoodCategoryID: foodCategories[2].ID},
		{MenuName: "Sushi Set", Price: 220.00, Description: "Assorted sushi with wasabi and soy sauce", ImageMenu: "https://img.freepik.com/premium-photo/sushi-set-served-with-traditional-soy-sauce-wasabi-ginger-japanese-cuisine-ai-generated_871188-1000.jpg", FoodCategoryID: foodCategories[1].ID},
		{MenuName: "French Fries", Price: 50.00, Description: "Crispy golden fries", ImageMenu: "https://sausagemaker.com/wp-content/uploads/Homemade-French-Fries_8.jpg", FoodCategoryID: foodCategories[2].ID},
		{MenuName: "Latte", Price: 65.00, Description: "Hot espresso with steamed milk", ImageMenu: "https://img.freepik.com/photos-premium/creer-cafe-latte-art_908985-22032.jpg", FoodCategoryID: foodCategories[0].ID},
		{MenuName: "Grilled Salmon", Price: 300.00, Description: "Fresh grilled salmon", ImageMenu: "https://hips.hearstapps.com/hmg-prod/images/how-to-grill-salmon-recipe1-1655870645.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*", FoodCategoryID: foodCategories[6].ID}, // Seafood
		{MenuName: "Vegetable Stir Fry", Price: 150.00, Description: "Mixed vegetables stir fried with sauce", ImageMenu: "https://www.thesmalltownfoodie.com/wp-content/uploads/2018/05/Vegetable-Stir-Fry2.png", FoodCategoryID: foodCategories[7].ID}, // Vegetarian
		{MenuName: "Iced Coffee", Price: 50.00, Description: "Chilled coffee with milk", ImageMenu: "https://mns.sidechef.com/recipe/34d9bf7f-6bfb-4e60-8301-726e5ac6509c.jpg?d=1408x1120", FoodCategoryID: foodCategories[0].ID},
		{MenuName: "BBQ Ribs", Price: 280.00, Description: "Barbecued pork ribs", ImageMenu: "https://www.grillseeker.com/wp-content/uploads/2022/06/sauced-pork-ribs-on-a-baoking-sheet.jpg", FoodCategoryID: foodCategories[1].ID},
		{MenuName: "Spring Rolls", Price: 70.00, Description: "Crispy vegetable rolls", ImageMenu: "https://redhousespice.com/wp-content/uploads/2021/12/whole-spring-rolls-and-halved-ones-scaled.jpg", FoodCategoryID: foodCategories[2].ID},
		{MenuName: "Chocolate Mousse", Price: 90.00, Description: "Creamy chocolate dessert", ImageMenu: "https://bakerbynature.com/wp-content/uploads/2023/08/Easy-Chocolate-Mousse-Baker-by-Nature-12617-1.jpg", FoodCategoryID: foodCategories[3].ID},
		{MenuName: "Lobster Tail", Price: 400.00, Description: "Grilled lobster tail", ImageMenu: "https://www.wholesomeyum.com/wp-content/uploads/2023/12/wholesomeyum-Grilled-Lobster-Tail.jpg", FoodCategoryID: foodCategories[6].ID},
		{MenuName: "Vegan Burger", Price: 120.00, Description: "Plant-based burger with vegetables", ImageMenu: "https://biancazapatka.com/wp-content/uploads/2021/10/rote-bete-burger.jpg", FoodCategoryID: foodCategories[7].ID},
		{MenuName: "Nachos", Price: 100.00, Description: "Corn chips with cheese and salsa", ImageMenu: "https://www.babaganosh.org/wp-content/uploads/2021/01/skillet-beef-nachos-22.jpg", FoodCategoryID: foodCategories[9].ID},
	}
	for i := range menus {
		db.FirstOrCreate(&menus[i], food_service.Menu{MenuName: menus[i].MenuName})
	}
	

	menuOptions := []food_service.MenuOption{
		{OptionName: "Size", OptionValue: "Small", ExtraPrice: 0},
		{OptionName: "Size", OptionValue: "Medium", ExtraPrice: 10},
		{OptionName: "Size", OptionValue: "Large", ExtraPrice: 20},
		{OptionName: "Protein", OptionValue: "Pork", ExtraPrice: 0},
		{OptionName: "Protein", OptionValue: "Chicken", ExtraPrice: 0},
		{OptionName: "Protein", OptionValue: "Beef", ExtraPrice: 20},
		{OptionName: "Protein", OptionValue: "Tofu", ExtraPrice: 0},
		{OptionName: "Spice Level", OptionValue: "Mild", ExtraPrice: 0},
		{OptionName: "Spice Level", OptionValue: "Medium", ExtraPrice: 5},
		{OptionName: "Spice Level", OptionValue: "Hot", ExtraPrice: 10},
		{OptionName: "Toppings", OptionValue: "Cheese", ExtraPrice: 15},
		{OptionName: "Toppings", OptionValue: "Bacon", ExtraPrice: 20},
		{OptionName: "Toppings", OptionValue: "Vegetables", ExtraPrice: 10},
		{OptionName: "Cooking Level", OptionValue: "Rare", ExtraPrice: 0},
		{OptionName: "Cooking Level", OptionValue: "Medium Rare", ExtraPrice: 0},
		{OptionName: "Cooking Level", OptionValue: "Medium", ExtraPrice: 0},
		{OptionName: "Cooking Level", OptionValue: "Medium Well", ExtraPrice: 0},
		{OptionName: "Cooking Level", OptionValue: "Well Done", ExtraPrice: 0},
	}
	for i := range menuOptions {
		db.FirstOrCreate(&menuOptions[i], food_service.MenuOption{OptionName: menuOptions[i].OptionName, OptionValue: menuOptions[i].OptionValue})
	}

	menuItemOptions := []food_service.MenuItemOption{
		{MenuID: menus[0].ID, MenuOptionID: menuOptions[0].ID},  // Orange Juice - Small
		{MenuID: menus[0].ID, MenuOptionID: menuOptions[1].ID},  // Orange Juice - Medium
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[4].ID},  // Steak - Chicken
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[5].ID},  // Steak - Beef
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[13].ID},  // Steak - Rare
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[14].ID},  // Steak - Medium Rare
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[15].ID},  // Steak - Medium
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[16].ID},  // Steak - Medium Well
		{MenuID: menus[1].ID, MenuOptionID: menuOptions[17].ID}, // Steak - Well Done
		{MenuID: menus[3].ID, MenuOptionID: menuOptions[2].ID},  // Tom Yum Soup - Mild
		{MenuID: menus[3].ID, MenuOptionID: menuOptions[4].ID},  // Tom Yum Soup - Hot
		{MenuID: menus[4].ID, MenuOptionID: menuOptions[5].ID},  // Margherita Pizza - Cheese Topping
		{MenuID: menus[7].ID, MenuOptionID: menuOptions[6].ID},  // Sushi Set - Bacon Topping
		{MenuID: menus[15].ID, MenuOptionID: menuOptions[0].ID},  // Iced Coffee - Small
		{MenuID: menus[15].ID, MenuOptionID: menuOptions[1].ID},  // Iced Coffee - Medium
		{MenuID: menus[16].ID, MenuOptionID: menuOptions[3].ID},  // BBQ Ribs - Pork
		{MenuID: menus[16].ID, MenuOptionID: menuOptions[4].ID},  // BBQ Ribs - Chicken
		{MenuID: menus[20].ID, MenuOptionID: menuOptions[6].ID},  // Vegan Burger - Tofu
		{MenuID: menus[17].ID, MenuOptionID: menuOptions[8].ID},  // Spring Rolls - Medium Spice
	}
	for i := range menuItemOptions {
		db.FirstOrCreate(&menuItemOptions[i], food_service.MenuItemOption{MenuID: menuItemOptions[i].MenuID, MenuOptionID: menuItemOptions[i].MenuOptionID})
	}

	// สร้างตัวอย่าง Order
	order := food_service.Order{
		OrderDate:   time.Now(),
		TotalAmount: 290.00, // ตัวอย่างจำนวนเงินรวม
		Status: "Pending",
		CustomerID:  1,      // ตัวอย่าง Customer ID
	}
	db.FirstOrCreate(&order, food_service.Order{OrderDate: order.OrderDate, CustomerID: order.CustomerID})
	
	// สร้างตัวอย่าง OrderDetail
	orderDetails := []food_service.OrderDetail{
		{OrderID: order.ID, MenuID: menus[0].ID, Quantity: 1, Amount: 40.00},  // Orange Juice
		{OrderID: order.ID, MenuID: menus[1].ID, Quantity: 2, Amount: 500.00}, // Steak
	}
	for i := range orderDetails {
		db.FirstOrCreate(&orderDetails[i], food_service.OrderDetail{OrderID: orderDetails[i].OrderID, MenuID: orderDetails[i].MenuID})
	}
	
	orderDetailsMenuOption := []food_service.OrderDetailMenuOption{
		{OrderDetailID: orderDetails[0].ID, MenuItemOptionID: menuItemOptions[0].ID}, 
		{OrderDetailID: orderDetails[1].ID, MenuItemOptionID: menuItemOptions[1].ID}, // Steak - Beef
		{OrderDetailID: orderDetails[1].ID, MenuItemOptionID: menuItemOptions[2].ID}, // Steak - Beef
	}
	for i := range orderDetailsMenuOption {
		db.FirstOrCreate(&orderDetailsMenuOption[i], food_service.OrderDetailMenuOption{
			OrderDetailID:   orderDetailsMenuOption[i].OrderDetailID,
			MenuItemOptionID: orderDetailsMenuOption[i].MenuItemOptionID,
		})
	}
	

	fmt.Println("FoodService data has been added to the database.")
}