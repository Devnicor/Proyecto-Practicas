/* eslint-disable prettier/prettier */
global._ = require('lodash');
global.moment = require('moment-timezone');
global.async = require('async');

const vars = {
  _min_time_minutes_for_disconnected: 10,
};

module.exports = vars;
