const Artist = require('../models/artist');

/**
 * Edits a single artist in the Artists collection
 * @param {string} _id - The ID of the artist to edit.
 * @param {object} artistProps - An object with a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves when the record is edited
 */
module.exports = (_id, artistProps) => {
  // return Artist.update({_id: _id}, { $set: { }});
  console.log(artistProps);
  /*return Artist.update({ _id: _id }, { $set: {
    age: artistProps.age,
    yearsActive: artistProps.yearsActive,
    name: artistProps.name,
    genre: artistProps.genre
  }})*/

  return Artist.update({ _id }, artistProps);

};
