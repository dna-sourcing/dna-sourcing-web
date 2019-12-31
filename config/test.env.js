"use strict";
const merge = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  API_ROOT: '"http://106.75.237.118:7071/"',
  fileUrl: '"/static/dna-sourcing-template.xlsx"',
  ONTID_SIGININ: '"http://139.219.136.188:10390?params="',
  TOC_API_ROOT: '"http://172.168.3.68:9088/"',
  JWT_API: '"http://172.168.3.68:7091"'
});
