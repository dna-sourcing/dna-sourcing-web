"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.1.129:7071/"',
  fileUrl: '"/static/dna-sourcing-template.xlsx"',
  ONTID_SIGININ: '"http://139.219.136.188:10390?params="',
  APP_ONTID: '"did:ont:ANqiHycikgyzkfz36faP5ymXLVg1uovhXh"',
  TOC_API_ROOT: '"http://42.159.142.241:9088/"',
  JWT_API: '"http://192.168.1.129:7091"'
});

// process.env.API_ROOT
