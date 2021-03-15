const countries = require('../dummy/countries');

module.exports.countryService = {
  list(req, res) {
    res.send(countries);
  },

  getCountryByName(req, res) {
    const { slug } = req.params;

    const country = countries.find((country) => country.id === slug);

    res.send(country);
  },
};
