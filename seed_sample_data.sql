-- Seed Data for Menu & Categories
INSERT INTO categories (name, description, image_url, is_active) VALUES 
('Breakfast', 'Morning specials', 'https://example.com/breakfast.jpg', 1),
('Veg Items', 'Pure vegetarian delicacies', 'https://example.com/veg.jpg', 1),
('Non Veg Items', 'Delicious meat and chicken dishes', 'https://example.com/nonveg.jpg', 1);

INSERT INTO menu_items (id, category_id, name, description, price, image_url, type, is_featured) VALUES 
('m1', 1, 'Classic Idli Vada', 'Soft fluffy idlis served with crispy vada', 150.00, 'https://example.com/idli.jpg', 'veg', 1),
('m2', 2, 'Paneer Butter Masala', 'Rich and creamy paneer curry', 250.00, 'https://example.com/paneer.jpg', 'veg', 1),
('m3', 3, 'Chicken Biryani', 'Aromatic basmati rice with tender chicken', 350.00, 'https://example.com/biryani.jpg', 'non-veg', 1);

-- Seed Data for Catering Packages (Services)
INSERT INTO catering_packages (id, name, description, capacity, image_url, path) VALUES 
('wedding', 'Wedding Catering', 'Make your special day unforgettable', '300 - 5000+ Guests', 'https://example.com/wedding.jpg', '/catering/wedding'),
('corporate', 'Corporate Catering', 'Professional catering for your events', '50 - 500 Guests', 'https://example.com/corporate.jpg', '/catering/corporate');

INSERT INTO catering_package_benefits (package_id, benefit) VALUES 
('wedding', 'Customizable Grand Menus'),
('wedding', 'Live Food Counters'),
('corporate', 'Timely Setup & Service');

INSERT INTO catering_package_menu_options (package_id, menu_option) VALUES 
('wedding', 'Traditional Veg Banquet'),
('wedding', 'Royal Non-Veg Feast'),
('corporate', 'Standard Buffet');

-- Seed Data for Settings and Testimonials
INSERT INTO settings (id, name, phone_reservations, phone_catering, email, timings, address, social_media) VALUES 
(1, 'SV Caterers Sri Varsha', '+91 90000 12345', '+91 90000 54321', 'hello@svcaterers.com', '9:00 AM - 10:00 PM', '{"street":"123 Main St","city":"Hyderabad","state":"Telangana","zip":"500001"}', '{"facebook":"https://facebook.com/svcaterers","instagram":"https://instagram.com/svcaterers"}');

INSERT INTO testimonials (author, rating, text, is_approved) VALUES 
('Priya Reddy', 5, 'SV Caterers handled my sister''s wedding beautifully.', 1),
('Rahul Sharma', 4, 'Great corporate catering experience, very professional.', 1),
('Anita Desai', 5, 'The food was absolutely amazing! Everyone loved the paneer tikka.', 0);
