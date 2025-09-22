
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
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT REFERENCES users(id),
    category_id INT REFERENCES categories(id),  
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'available', 
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




 CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    permission VARCHAR(255) NOT NULL
    
);
CREATE TABLE role_permission (
     
    role_id INT REFERENCES roles(id),
    permission_id INT REFERENCES permissions(id)
);
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    item_id INT REFERENCES items(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_id)
);
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
  
);