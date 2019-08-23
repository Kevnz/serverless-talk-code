'use strict';

const Path = require('path');
const Lalalambda = require('lalalambda');

exports.handler = Lalalambda.handler('post-dyno-create', Path.resolve(__dirname, '..'));
