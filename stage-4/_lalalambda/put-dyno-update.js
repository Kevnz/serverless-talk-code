'use strict';

const Path = require('path');
const Lalalambda = require('lalalambda');

exports.handler = Lalalambda.handler('put-dyno-update', Path.resolve(__dirname, '..'));
