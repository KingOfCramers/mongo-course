const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortBy The property to sort the results by
 * @param {integer} skip How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, skip, and limit
 */



// Get data from front-end
module.exports = (criteria, sortBy, skip = 0, limit = 20) => {

  /*  criteria ===
  { name: "barbara",
    age: { min: 10, max: 45 },
    yearsActive: { min: 15, max: 20 }
   }
  */

  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortBy]: 1}) // This is not an array, it's ES6 to add a key value pair vased on a variable.
    .skip(skip)
    .limit(limit);

    // Must return object like  -->
    // { all: [allmodel objects], count: 13(for ex.), skip: 0, limit: 20}
    // Return promise that resolves with expected object
    return Promise.all([query, Artist.count()])
      .then((results) => { // An array of resolved promises
        return {
          all: results[0],
          count: results[1],
          skip: skip,
          limit: limit
        }
      });
};


// Build the query down here... and return an object back to the .find method.
const buildQuery = (criteria) => {
  const query = {};

  if(criteria.age){ // criteria.age is only returned if someone has moved the age slider
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }
  if(criteria.yearsActive){
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    }
  }
  return query;
};