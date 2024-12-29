package entity

import (
	"time"

	"gorm.io/gorm"
)

type Review struct {
	gorm.Model

	Review_date    time.Time `json:"review_date"`
	Review_text    string    `gorm:"type:TEXT" json:"review_text"`
	Service_rating float32   `json:"service_rating"`
	Price_rating   float32   `json:"price_rating"`
	Taste_rating   float32   `json:"taste_rating"`
	Recommendation bool      `json:"recommendation"`
	Picture        string    `json:"picture" gorm:"type:longtext"`

	ReviewTypeID uint         `json:"review_type_id"`
	ReviewType   *ReviewType `gorm:"foreignKey: review_type_id" json:"review_type"`
}
