package config

import (
	"fmt"
	// "project-se67/config"
	// "project-se67/config"
	"project-se67/entity"
	"time"

	// "gorm.io/gorm"
)

func SetupUserDatabase() {


	db.AutoMigrate(
 
		&entity.Customers{},
 
		&entity.Genders{},
 
	)
 
 
	GenderMale := entity.Genders{Gender: "Male"}
 
	GenderFemale := entity.Genders{Gender: "Female"}
 
 
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
 
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})
 
 
	hashedPassword, _ := HashPassword("123")
 
	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
 
	User := &entity.Customers{
 
		FirstName: "Software",
 
		LastName:  "Analysis",
 
		Email:     "sa@gmail.com",
 
		Age:       80,
 
		Password:  hashedPassword,
 
		BirthDay:  BirthDay,
 
		GenderID:  1,
 
		PhoneNumber: "0979989859",
 
	}
 
	db.FirstOrCreate(User, &entity.Customers{
 
		Email: "sa@gmail.com",
 
	})
 
	fmt.Println("User data has been added to the database.")
 }