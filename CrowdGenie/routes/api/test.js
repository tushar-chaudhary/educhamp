const express = require('express');
const router = express.Router();

// Loading models
const Test = require('../../models/Test');

// Route for submitting the test result once done
router.post('/test_report_submit', (req, res) => {
  const testDetails = new Test({
    testName: req.body.testName,
    childId: String(req.body.user),
    score: req.body.score,
    class: req.body.class,
    report: req.body.report
  });

  testDetails
    .save()
    .then(testReport => {
      Test.find({
        childId: testReport.user
      })
        .then(testReport => {
          return res.status(200).json({ report: testReport });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// Route for getting test reports
router.post('/test_report', (req, res) => {
  Test.find({
    childId: req.body.user
  })
    .then(testReport => {
      return res.status(200).json({ report: testReport });
    })
    .catch(err => {
      console.log(err);
    });
});

// Route for getting test reports by title
router.post('/test_report_by_title', (req, res) => {
  Test.find({
    class: req.body.class
  })
    .then(testReport => {
      return res.status(200).json({ report: testReport });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
