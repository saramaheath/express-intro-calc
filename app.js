"use strict";
const { response } = require("express");
/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");
const { findMean, findMedian, findMode } = require("./stats");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());                           // process JSON data
app.use(express.urlencoded({ extended: true }));   // process trad form data

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean', function(req, res) {
  
  const strNums = req.query.nums.split(',');
  const intNums = strNums.map(n => parseInt(n));
  const value = findMean(intNums);
  const response = {
    operation: 'mean',
    value: value
  };
  
  return res.send(response); 
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get('/median', function(req, res) {
  
  const strNums = req.query.nums.split(',');
  const intNums = strNums.map(n => parseInt(n));
  const value = findMedian(intNums);
  const response = {
    operation: 'median',
    value: value
  };
  
  return res.send(response); 
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get('/mode', function(req, res) {
  
  const strNums = req.query.nums.split(',');
  const intNums = strNums.map(n => parseInt(n));
  const value = findMode(intNums);
  const response = {
    operation: 'mode',
    value: value
  };
  
  return res.send(response); 
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;