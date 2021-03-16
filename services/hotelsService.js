const _ = require('lodash');
const hotels = require('../dummy/hotels');

module.exports.hotelsService = {
  list(req, res) {
    const { pagination } = req;
    const { country } = req.query;

    const { sortBy } = req.query;

    let filteredHotels = hotels;

    if (!_.isEmpty(country)) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.country.toLowerCase() === country.toLowerCase()
      );
    }

    if (!_.isEmpty(sortBy)) {
      if (sortBy === 'lower') {
        filteredHotels = _.orderBy(filteredHotels, ['price'], ['asc']);
      } else if (sortBy === 'high') {
        filteredHotels = _.orderBy(filteredHotels, ['price'], ['desc']);
      }
    }

    filteredHotels = filteredHotels.map((object) => {
      object.thumbnail = `https://source.unsplash.com/featured/500x333/?hotels&sig=${object.id}&orientation=landscape&order_by=popular`;

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
