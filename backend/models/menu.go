package models

type Menu struct {
	Id              uint
	Name            string
	Price           int64
	DurationMinutes int64
	Description     string
}

var InitialMenus = []Menu{
	{Id: 1, Name: "ワンカラー", Price: 5000, DurationMinutes: 90, Description: "シンプルで上品なワンカラーネイル"},
	{Id: 2, Name: "マグネットカラー", Price: 5000, DurationMinutes: 90, Description: "マグネットを使ったネイル"},
	{Id: 3, Name: "フレンチネイル", Price: 7000, DurationMinutes: 120, Description: "上品なフレンチネイル"},
	{Id: 4, Name: "グラデーションネイル", Price: 7000, DurationMinutes: 120, Description: "グラデーションを使ったネイル"},
	{Id: 5, Name: "オフのみ", Price: 3000, DurationMinutes: 60, Description: "オフのみのサービス"},
}
