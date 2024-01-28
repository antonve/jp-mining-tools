// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package postgres

import (
	"database/sql"
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type PendingCard struct {
	ID           int64
	LanguageCode string
	Token        string
	SourceImage  []byte
	Meta         json.RawMessage
	CreatedAt    time.Time
	UpdatedAt    time.Time
	ExportedAt   sql.NullTime
}

type Text struct {
	ID           int64
	LanguageCode string
	Title        string
	Content      string
	CreatedAt    time.Time
	UpdatedAt    time.Time
	LastPosition int32
}

type Translation struct {
	ID                 uuid.UUID
	SourceLanguageCode string
	TargetLanguageCode string
	Input              string
	Translation        string
	TranslatedAt       time.Time
}

type WordToken struct {
	ID           uuid.UUID
	LanguageCode string
	Token        string
	Notes        sql.NullString
	Meta         json.RawMessage
	Rating       sql.NullInt16
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
