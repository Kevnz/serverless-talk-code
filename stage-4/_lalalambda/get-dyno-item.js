'use strict';

const Path = require('path');
const Lalalambda = require('lalalambda');

exports.handler = Lalalambda.handler('get-dyno-item', Path.resolve(__dirname, '..'));
