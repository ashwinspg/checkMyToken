CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users(
	id TEXT PRIMARY KEY,
	credits INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS hospitals(
	id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id TEXT NOT NULL REFERENCES users(id),
	name TEXT,
	location TEXT,
	contact_number TEXT
);

CREATE TABLE IF NOT EXISTS doctors(
	id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
	hospital_id TEXT NOT NULL REFERENCES hospitals(id),
	name TEXT,
	status BOOL,
	token TEXT DEFAULT '-'
);