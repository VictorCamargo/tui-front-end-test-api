const express = require('express');
const router = express.Router();
const pagination = require('../middleware/pagination');

const { asyncWrapper } = require('../utils/asyncWrapper');
const { countryService } = require('../services/countryService');
const { hotelsService } = require('../services/hotelsService');

/**
 * List all countries
 */
router.get('/countries', asyncWrapper(countryService.list));

/**
 * Get country by name
 */
router.get('/countries/:slug', asyncWrapper(countryService.getCountryByName));

/**
 * List hotels
 */
router.get('/hotels', [pagination], asyncWrapper(hotelsService.list));

module.exports = router;
