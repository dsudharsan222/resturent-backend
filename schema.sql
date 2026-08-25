-- ==========================================
-- 1. Administrators / Moderators
-- ==========================================
CREATE TABLE mod_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'moderator') DEFAULT 'moderator',
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. Menu Management
-- ==========================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
    id VARCHAR(50) PRIMARY KEY, 
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(512),
    type ENUM('veg', 'non-veg') NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- ==========================================
-- 3. Catering Packages
-- ==========================================
CREATE TABLE catering_packages (
    id VARCHAR(50) PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT,
    capacity VARCHAR(100),
    image_url VARCHAR(512),
    path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE catering_package_benefits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id VARCHAR(50) NOT NULL,
    benefit VARCHAR(255) NOT NULL,
    FOREIGN KEY (package_id) REFERENCES catering_packages(id) ON DELETE CASCADE
);

CREATE TABLE catering_package_menu_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id VARCHAR(50) NOT NULL,
    menu_option VARCHAR(255) NOT NULL,
    FOREIGN KEY (package_id) REFERENCES catering_packages(id) ON DELETE CASCADE
);

-- ==========================================
-- 4. Quotes & Reservations Master Tables
-- ==========================================
-- Master table for Event Types (e.g. Wedding, Birthday)
CREATE TABLE master_event_types (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Master table for Guest Counts (e.g. 50-100, 300-500)
CREATE TABLE master_guest_counts (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Master table for Food Preferences (e.g. Pure Veg, Non-Veg)
CREATE TABLE master_food_preferences (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- 5. Quotes Table
-- ==========================================
CREATE TABLE quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type_id VARCHAR(50),
    guest_count_id VARCHAR(50),
    food_preference_id VARCHAR(50),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    event_date DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_type_id) REFERENCES master_event_types(id) ON DELETE SET NULL,
    FOREIGN KEY (guest_count_id) REFERENCES master_guest_counts(id) ON DELETE SET NULL,
    FOREIGN KEY (food_preference_id) REFERENCES master_food_preferences(id) ON DELETE SET NULL
);

-- ==========================================
-- 6. General Settings & Testimonials
-- ==========================================
-- Stores the restaurant's global contact details
CREATE TABLE settings (
    id INT PRIMARY KEY DEFAULT 1,
    name VARCHAR(255) NOT NULL,
    phone_reservations VARCHAR(50),
    phone_catering VARCHAR(50),
    email VARCHAR(255),
    timings VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
