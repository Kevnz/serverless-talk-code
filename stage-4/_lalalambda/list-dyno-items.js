'use strict';

const Path = require('path');
const Lalalambda = require('lalalambda');

exports.handler = Lalalambda.handler('list-dyno-items', Path.resolve(__dirname, '..'));
