
CREATE TABLE roles (
    id SERIAL NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)
CREATE TABLE users(
    id SERIAL NOT NULL,
    userName VARCHAR(255) NOT NULL UNIQUE,
    age INT,
    Governorate VARCHAR(255),
    District VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255)  NOT NULL UNIQUE,
    role_id INT REFERENCES roles(id),
    is_deleted SMALLINT DEFAULT 0,
    PRIMARY KEY (id)
)
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    user_id INT REFERENCES users(id),
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'available', 
    is_deleted BOOLEAN DEFAULT false, /* //////////////////////////////////// int */
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




 CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    permission VARCHAR(255) NOT NULL
    
);
CREATE TABLE role_permission (
    id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(id),
    permission_id INT REFERENCES permissions(id)
);