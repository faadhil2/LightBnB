-- Populate users table
INSERT INTO users (name, email, password) 
VALUES ('Billy', 'billy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Bobby', 'bobby@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Benjamin', 'benjamin@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

-- Populate properties table
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Sunshine Springs', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 100, 2, 3, 4, 'USA', 'Hollywood Blvd', 'Los Angeles', 'California', '2B11T2'),
(1, 'Palm Garden', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 200, 3, 4, 4, 'Japan', 'Tokyo St.', 'Tokyo', 'Tokyo', '1L34Y6'),
(1, 'Restful Paradise', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', ' https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 300, 3, 4, 5, 'Canada', 'Yonge St.', 'Toronto', 'Ontario', 'M4B2T1');

-- Populate reservations table
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1 ),
('2019-01-04', '2019-02-01', 2, 2 ),
('2021-10-01', '2021-10-14' , 3, 3 );

-- Populate property_reviews table
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 1, 5, 'message'),
(2, 2, 2, 2, 'message'),
(1, 3, 3, 4, 'message');