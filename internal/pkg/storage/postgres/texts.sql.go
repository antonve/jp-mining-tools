// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: texts.sql

package postgres

import (
	"context"
	"time"
)

const createText = `-- name: CreateText :one
insert into texts (
  language_code,
  title,
  content
) values (
  $1,
  $2,
  $3
)
returning id
`

type CreateTextParams struct {
	LanguageCode string
	Title        string
	Content      string
}

func (q *Queries) CreateText(ctx context.Context, arg CreateTextParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, createText, arg.LanguageCode, arg.Title, arg.Content)
	var id int64
	err := row.Scan(&id)
	return id, err
}

const getText = `-- name: GetText :one
select
  id,
  language_code,
  title,
  content,
  last_position,
  created_at,
  updated_at
from texts
where
  id = $1
`

type GetTextRow struct {
	ID           int64
	LanguageCode string
	Title        string
	Content      string
	LastPosition int32
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func (q *Queries) GetText(ctx context.Context, id int64) (GetTextRow, error) {
	row := q.db.QueryRowContext(ctx, getText, id)
	var i GetTextRow
	err := row.Scan(
		&i.ID,
		&i.LanguageCode,
		&i.Title,
		&i.Content,
		&i.LastPosition,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getTextsForLanguage = `-- name: GetTextsForLanguage :many
select
  id,
  language_code,
  title,
  created_at,
  updated_at
from texts
where
  language_code = $1
order by created_at desc
`

type GetTextsForLanguageRow struct {
	ID           int64
	LanguageCode string
	Title        string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func (q *Queries) GetTextsForLanguage(ctx context.Context, languageCode string) ([]GetTextsForLanguageRow, error) {
	rows, err := q.db.QueryContext(ctx, getTextsForLanguage, languageCode)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetTextsForLanguageRow
	for rows.Next() {
		var i GetTextsForLanguageRow
		if err := rows.Scan(
			&i.ID,
			&i.LanguageCode,
			&i.Title,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateReadingPositionOfText = `-- name: UpdateReadingPositionOfText :exec
update texts
set last_position = $1
where
  id = $2
  and last_position < $1
`

type UpdateReadingPositionOfTextParams struct {
	LastPosition int32
	ID           int64
}

func (q *Queries) UpdateReadingPositionOfText(ctx context.Context, arg UpdateReadingPositionOfTextParams) error {
	_, err := q.db.ExecContext(ctx, updateReadingPositionOfText, arg.LastPosition, arg.ID)
	return err
}
