CREATE SCHEMA `onjek_db`;

use onjek_db;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birthdate DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    account_code VARCHAR(20) NOT NULL UNIQUE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE onride_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_point VARCHAR(255) NOT NULL,
    end_point VARCHAR(255) NOT NULL,
    arrived_indicator BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE oncar_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_point VARCHAR(255) NOT NULL,
    end_point VARCHAR(255) NOT NULL,
    arrived_indicator BOOLEAN DEFAULT FALSE,
    capacity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE shop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    rating DECIMAL(2, 1) DEFAULT 0.0
);

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shop(id) ON DELETE CASCADE
);

INSERT INTO shop (name, address, rating) VALUES 
('Gourmet Kitchen', '123 Main St', 4.5),
('Fast Bites', '456 Oak Ave', 4.2),
('Green Leaf Cafe', '789 Maple Rd', 4.8),
('Sunshine Deli', '101 Pine St', 4.3),
('Urban Eats', '202 Elm St', 4.1),
('Seafood Delight', '303 Ocean Dr', 4.7),
('Pizza Paradise', '404 Willow St', 4.6),
('Burger Bonanza', '505 Cedar Ave', 4.4),
('Sushi Central', '606 Birch Ln', 4.9),
('Taco Town', '707 Spruce Blvd', 4.0);

INSERT INTO product (shop_id, name, description, price) VALUES
(1, 'Pasta Carbonara', 'Classic pasta with creamy sauce', 25000),
(1, 'Caesar Salad', 'Fresh salad with homemade dressing', 30000),
(2, 'Cheeseburger', 'Grilled burger with cheddar cheese', 45000),
(1, 'Margherita Pizza', 'Classic pizza with tomatoes and mozzarella', 35000),
(1, 'Tiramisu', 'Layered dessert with coffee flavor', 45000),
(1, 'Garlic Bread', 'Toasted bread with garlic and herbs', 15000),
(2, 'Fries', 'Crispy golden fries', 15000),
(2, 'Chicken Nuggets', 'Crispy breaded chicken nuggets', 20000),
(2, 'Milkshake', 'Creamy milkshake in various flavors', 25000),
(2, 'Onion Rings', 'Golden-fried onion rings', 15000),
(3, 'Chia Pudding', 'Pudding with chia seeds and fruit', 40000),
(3, 'Kale Smoothie', 'Healthy green smoothie', 30000),
(3, 'Fruit Bowl', 'Freshly cut seasonal fruits', 35000),
(3, 'Avocado Toast', 'Toasted bread with mashed avocado', 30000),
(3, 'Smoothie Bowl', 'Mixed berry smoothie with toppings', 50000),
(4, 'Turkey Sandwich', 'Turkey breast with lettuce and tomato', 20000),
(4, 'Chicken Wrap', 'Grilled chicken wrap with veggies', 25000),
(4, 'Club Sandwich', 'Sandwich with layers of meat and veggies', 25000),
(4, 'Bagel with Cream Cheese', 'Toasted bagel with cream cheese', 20000),
(4, 'Fruit Smoothie', 'Mixed fruit smoothie', 30000),
(5, 'Quinoa Salad', 'Healthy salad with quinoa and veggies', 70000),
(5, 'Vegan Burger', 'Plant-based burger with lettuce', 60000),
(5, 'Falafel Wrap', 'Wrap with falafel and veggies', 40000),
(5, 'Stuffed Peppers', 'Peppers stuffed with quinoa and veggies', 50000),
(5, 'Lentil Soup', 'Warm soup with lentils and herbs', 30000),
(6, 'Grilled Salmon', 'Salmon grilled with herbs', 80000),
(6, 'Shrimp Cocktail', 'Shrimp with cocktail sauce', 60000),
(6, 'Seafood Chowder', 'Rich seafood chowder', 70000),
(7, 'Pepperoni Pizza', 'Pizza with pepperoni and cheese', 45000),
(7, 'Garlic Knots', 'Knotted dough with garlic and butter', 15000),
(7, 'Minestrone Soup', 'Classic Italian vegetable soup', 25000),
(8, 'BBQ Burger', 'Burger with BBQ sauce and cheese', 50000),
(8, 'Mozzarella Sticks', 'Fried cheese sticks', 20000),
(8, 'Chocolate Milkshake', 'Rich chocolate shake', 25000),
(9, 'Dragon Roll', 'Sushi roll with eel and avocado', 80000),
(9, 'Miso Soup', 'Traditional Japanese soup', 15000),
(9, 'Sashimi Platter', 'Assorted sashimi', 100000),
(10, 'Burrito', 'Filled with beans, rice, and meat', 40000),
(10, 'Quesadilla', 'Tortilla with cheese and fillings', 35000),
(10, 'Nachos', 'Tortilla chips with cheese and toppings', 30000);