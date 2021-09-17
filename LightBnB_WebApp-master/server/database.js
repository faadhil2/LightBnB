const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * 
    FROM users 
    WHERE email = $1`, [email])
    .then((result) => {
       return(result.rows[0])   
    })
    .catch((err) => {
      return null;
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * 
    FROM users 
    WHERE users.id = $1`, [id])
    .then((result) => {
       return(result.rows[0])   
    })
    .catch((err) => {
      return null;
    });
  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
    .query(`INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3)
    RETURNING *`, [user.name, user.email, user.password])
    .then((result) => {
       return(result.rows[0])   
    })
    .catch((err) => {
      return null;
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`SELECT *
    FROM reservations
    WHERE guest_id = $1
    LIMIT $2`, [guest_id, limit])
    .then((result) => {
       return(result.rows)   
    })
    .catch((err) => {
      return null;
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


 const getAllProperties = (options, limit = 10) => {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;


  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (queryParams.length > 0){
      queryString += `AND owner_id = $${queryParams.length} `;
    }else{
    queryString += `WHERE owner_id = $${queryParams.length} `;
    }
  }

   if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night*100);
    if (queryParams.length > 0){
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    }else{
    queryString += `WHERE cost_per_night >= $${queryParams.length} `;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night*100);
    if (queryParams.length > 0){
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    }else{
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
    }
  }

 
  queryString += `
  GROUP BY properties.id`
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString+= `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = [property.owner_id, property.title, property.description, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.province, property.city, property.country, property.street, property.post_code];
  const queryString = `INSERT INTO properties (owner_id, title, description, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
  RETURNING *`;

  return pool
  .query(queryString, queryParams)
  .then((result) => {
     return(result.rows[0])   
  })
  .catch((err) => {
    return null;
  });
}
exports.addProperty = addProperty;
