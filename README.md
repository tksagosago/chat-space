## users_table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
###Association
- has_many :massages
- has_many :proups, through: :users_proups
- has_many :users_groups

## massages_table
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
###Assosiation
- belongs_to :user
- belongs_to :gpoup

## groups_table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Assosiation
- has_many :massages
- has_many :users, through: :users_proups
- has_many :users_groups

## users_groups
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
###Assosiation
- belongs_to :user
- belongs_to :group