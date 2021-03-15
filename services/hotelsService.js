const _ = require('lodash');
const hotels = require('../dummy/hotels');

module.exports.hotelsService = {
  list(req, res) {
    const { pagination } = req;
    const { country } = req.query;

    let filteredHotels = hotels;

    if (!_.isEmpty(country)) {
      filteredHotels = hotels.filter(
        (hotel) => hotel.country.toLowerCase() === country
      );
    }

    filteredHotels = filteredHotels.map((object) => {
      object.thumbnail = `https://source.unsplash.com/featured/1920x400/?${country},travel`;

      return object;
    });

    const from = (pagination.page - 1) * pagination.limit;
    const to = pagination.page * pagination.limit;

    res.send({
      docs: filteredHotels.slice(from, to),
      page: pagination.page,
      pages: Math.ceil(hotels.length / pagination.limit),
      total: hotels.length,
      limit: pagination.limit,
    });
  },
};
