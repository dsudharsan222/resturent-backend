# Restaurant and Catering API Documentation

This document outlines the REST APIs required to make the React application dynamic. Currently, **no authentication is required** for any of these endpoints.

## Table of Contents
1. [Menu Management](#1-menu-management)
2. [Catering Packages](#2-catering-packages)
3. [Quotes & Reservations](#3-quotes--reservations)
4. [General Settings & Testimonials](#4-general-settings--testimonials)
5. [File Uploads](#5-file-uploads)

---

## 1. Menu Management

### Get All Categories
- **Endpoint:** `/api/categories`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Breakfast",
      "description": "Thatte idli, neer dosa & more",
      "image_url": "https://..."
    }
  ]
  ```

### Get All Menu Items
- **Endpoint:** `/api/menu`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:** `?category_id=1&type=veg&page=1&limit=10`
- **Response:**
  ```json
  {
    "data": [
      {
        "id": "m1",
        "category_id": 1,
        "category_name": "Breakfast",
        "name": "Classic Idli Vada",
        "description": "Soft fluffy idlis served with crispy vada, sambar...",
        "price": 150,
        "image_url": "https://...",
        "type": "veg",
        "is_featured": true
      }
    ],
    "meta": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
  ```

### Create Menu Item
- **Endpoint:** `/api/menu`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "category_id": 1,
    "name": "New Dosa",
    "description": "Delicious crispy dosa",
    "price": 120,
    "image_url": "https://...",
    "type": "veg",
    "is_featured": false
  }
  ```
- **Response:**
  ```json
  {
    "id": "m7",
    "message": "Menu item created successfully."
  }
  ```

---

## 2. Catering Packages

### Get Catering Packages
- **Endpoint:** `/api/catering-packages`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
  ```json
  [
    {
      "id": "wedding",
      "name": "Wedding Catering",
      "description": "Make your special day unforgettable...",
      "capacity": "300 - 5000+ Guests",
      "benefits": [
        "Customizable Grand Menus",
        "Live Food Counters"
      ],
      "menu_options": [
        "Traditional Veg Banquet",
        "Royal Non-Veg Feast"
      ],
      "image_url": "https://...",
      "path": "/catering/wedding"
    }
  ]
  ```

---

## 3. Quotes & Reservations

### Get Quote Form Configuration
- **Endpoint:** `/api/quotes/config`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
  ```json
  {
    "eventTypes": [
      { "id": "wedding", "name": "Wedding" },
      { "id": "birthday", "name": "Birthday" }
    ],
    "guestCounts": [
      { "id": "50-100", "name": "50 - 100" }
    ],
    "foodPreferences": [
      { "id": "veg", "name": "Pure Veg" }
    ]
  }
  ```

### Submit New Quote Request
- **Endpoint:** `/api/quotes`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "event_type_id": "wedding",
    "guest_count_id": "300-500",
    "food_preference_id": "veg",
    "customer_name": "John Doe",
    "customer_phone": "+91 90000 00000",
    "customer_email": "john@example.com",
    "event_date": "2026-10-15T00:00:00Z"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Quote request submitted successfully. Our team will contact you shortly.",
    "quote_id": 1024
  }
  ```

### Update Quote Status (Admin)
- **Endpoint:** `/api/quotes/:id/status`
- **Method:** `PUT`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "status": "Contacted"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Status updated successfully."
  }
  ```

---

## 4. General Settings & Testimonials

### Get General Information
- **Endpoint:** `/api/settings/info`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
  ```json
  {
    "name": "SV Caterers Sri Varsha",
    "phone": {
      "reservations": "+91 90000 12345",
      "catering": "+91 90000 54321"
    },
    "email": "hello@svcaterers.com",
    "timings": "9:00 AM - 10:00 PM"
  }
  ```

### Get Testimonials
- **Endpoint:** `/api/testimonials`
- **Method:** `GET`
- **Auth Required:** No
- **Response:**
  ```json
  [
    {
      "id": 1,
      "author": "Priya Reddy",
      "rating": 5,
      "date": "2026-05-01T00:00:00Z",
      "text": "SV Caterers handled my sister's wedding beautifully."
    }
  ]
  ```

### Submit a Testimonial
- **Endpoint:** `/api/testimonials`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "author": "Rahul Sharma",
    "rating": 5,
    "text": "The food was absolutely amazing! Everyone loved the paneer tikka."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Thank you for your review. It will be published once approved by our team."
  }
  ```

---

## 5. File Uploads

### Upload Image
- **Endpoint:** `/api/upload`
- **Method:** `POST`
- **Auth Required:** No
- **Content-Type:** `multipart/form-data`
- **Body:** `file` (Binary Image File)
- **Response:**
  ```json
  {
    "success": true,
    "url": "https://your-s3-bucket.s3.amazonaws.com/images/menu-item-123.jpg",
    "key": "images/menu-item-123.jpg"
  }
  ```
