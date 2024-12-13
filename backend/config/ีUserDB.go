package config

import (
	"fmt"
	// "project-se67/config"
	// "project-se67/config"
	"project-se67/entity/customer"
	"time"

	// "gorm.io/gorm"
)

func SetupUserDatabase() {


	db.AutoMigrate(
 
		&customer.Customer{},
 
		&customer.Genders{},
 
	)
 
 
	GenderMale := customer.Genders{Gender: "Male"}
 
	GenderFemale := customer.Genders{Gender: "Female"}
 
 
	db.FirstOrCreate(&GenderMale, &customer.Genders{Gender: "Male"})
 
	db.FirstOrCreate(&GenderFemale, &customer.Genders{Gender: "Female"})
 
 
	hashedPassword, _ := HashPassword("123")
 
	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
 
	User := &customer.Customer{
 
		FirstName: "Software",
 
		LastName:  "Analysis",
 
		Email:     "sa@gmail.com",
 
		Age:       80,
 
		Password:  hashedPassword,
 
		BirthDay:  BirthDay,
 
		GenderID:  1,
 
		PhoneNumber: "0979989859",
 
	}
 
	db.FirstOrCreate(User, &customer.Customer{
 
		Email: "sa@gmail.com",
 
	})
 
	fmt.Println("User data has been added to the database.")
 }