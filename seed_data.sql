-- ==========================================
-- 1. Administrators / Moderators
-- ==========================================
-- Note: 'password123' hashed using standard bcrypt for demonstration purposes. 
-- In a real app, generate the hash using your backend framework.
INSERT INTO mod_admin (name, email, password_hash, role, is_active) 
VALUES 
('Demo', 'demo@yopmail.com', '$2b$10$EP03vE1IIN6rZpIigQf3z.mH1kZ72l3H9wQk.sE2101h.630.957K', 'super_admin', TRUE);

-- ==========================================
-- 2. Quotes & Reservations Master Tables
-- ==========================================
INSERT INTO master_event_types (id, name, is_active) VALUES 
('wedding', 'Wedding Ceremony', TRUE),
('birthday', 'Birthday Party', TRUE),
('corporate', 'Corporate Event', TRUE),
('housewarming', 'House Warming', TRUE);

INSERT INTO master_guest_counts (id, name, is_active) VALUES 
('50-100', '50 - 100 Guests', TRUE),
('100-300', '100 - 300 Guests', TRUE),
('300-500', '300 - 500 Guests', TRUE),
('500-plus', '500+ Guests', TRUE);

INSERT INTO master_food_preferences (id, name, is_active) VALUES 
('veg', 'Pure Vegetarian', TRUE),
('non-veg', 'Non-Vegetarian', TRUE),
('both', 'Both (Veg & Non-Veg)', TRUE);

-- ==========================================
-- 3. Menu Management
-- ==========================================
INSERT INTO categories (id, name, description, image_url) VALUES 
(1, 'Breakfast', 'Authentic South Indian morning tiffins.', 'https://example.com/images/breakfast.jpg'),
(2, 'Main Course', 'Rich and flavorful curries and biryanis.', 'https://example.com/images/main_course.jpg'),
(3, 'Desserts', 'Traditional sweets to complete your meal.', 'https://example.com/images/desserts.jpg');

INSERT INTO menu_items (id, category_id, name, description, price, image_url, type, is_featured) VALUES 
('m1', 1, 'Classic Idli Vada', 'Soft fluffy idlis served with crispy vada, sambar and coconut chutney.', 150.00, 'https://example.com/images/idli.jpg', 'veg', TRUE),
('m2', 1, 'Neer Dosa', 'Thin, soft, lacy crepes made from rice batter.', 120.00, 'https://example.com/images/neer_dosa.jpg', 'veg', FALSE),
('m3', 2, 'Hyderabadi Chicken Biryani', 'Aromatic basmati rice cooked with tender chicken and authentic spices.', 350.00, 'https://example.com/images/biryani.jpg', 'non-veg', TRUE),
('m4', 2, 'Paneer Butter Masala', 'Soft paneer cubes simmered in a rich tomato and cashew gravy.', 280.00, 'https://example.com/images/paneer.jpg', 'veg', TRUE),
('m5', 3, 'Gulab Jamun', 'Deep-fried milk dough balls soaked in sugar syrup.', 90.00, 'https://example.com/images/jamun.jpg', 'veg', FALSE);

-- ==========================================
-- 4. Catering Packages
-- ==========================================
INSERT INTO catering_packages (id, name, description, capacity, image_url, path) VALUES 
('wedding', 'Grand Wedding Catering', 'Make your special day unforgettable with our premium traditional and modern menus.', '300 - 5000+ Guests', 'https://example.com/images/wedding.jpg', '/catering/wedding'),
('corporate', 'Corporate Buffet', 'Professional catering services tailored for office parties and corporate events.', '50 - 500 Guests', 'https://example.com/images/corporate.jpg', '/catering/corporate');

INSERT INTO catering_package_benefits (package_id, benefit) VALUES 
('wedding', 'Customizable Grand Menus'),
('wedding', 'Live Food Counters'),
('wedding', 'Premium Cutlery & Serving Staff'),
('corporate', 'Timely Setup & Delivery'),
('corporate', 'Dietary Specific Options');

INSERT INTO catering_package_menu_options (package_id, menu_option) VALUES 
('wedding', 'Traditional Pure Veg Banquet'),
('wedding', 'Royal Non-Veg Feast'),
('corporate', 'Standard Executive Buffet'),
('corporate', 'High-Tea & Snacks');

-- ==========================================
-- 5. Quotes Table
-- ==========================================
INSERT INTO quotes (event_type_id, guest_count_id, food_preference_id, customer_name, customer_phone, customer_email, event_date, status) VALUES 
('wedding', '300-500', 'veg', 'John Doe', '+91 98765 43210', 'john.doe@example.com', '2026-11-20 18:00:00', 'Pending'),
('corporate', '50-100', 'both', 'Jane Smith', '+91 87654 32109', 'jane.smith@company.com', '2026-08-15 12:00:00', 'Contacted');

-- ==========================================
-- 6. General Settings & Testimonials
-- ==========================================
INSERT INTO settings (id, name, phone_reservations, phone_catering, email, timings) VALUES 
(1, 'SV Caterers Sri Varsha', '+91 90000 12345', '+91 90000 54321', 'hello@svcaterers.com', '9:00 AM - 10:00 PM');

INSERT INTO testimonials (author, rating, text, is_approved) VALUES 
('Priya Reddy', 5, 'SV Caterers handled my sister''s wedding beautifully. The food was warm, on time, and absolutely delicious!', TRUE),
('Rahul Sharma', 4, 'Great corporate buffet setup. Everyone loved the paneer dishes.', TRUE),
('Anonymous Troll', 1, 'Spam message test.', FALSE); -- Example of an unapproved review
