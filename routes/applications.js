const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');

// Get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find().populate('job').sort('-appliedAt');
        res.render('applications/index', { applications });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Show application form
router.get('/create/:jobId', async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).send('Job not found');
        res.render('applications/create', { job });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create new application
router.post('/', async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.redirect('/applications');
    } catch (err) {
        res.status(400).render('applications/create', { error: err.message });
    }
});

// Update application status
router.put('/:id/status', async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!application) return res.status(404).send('Application not found');
        res.redirect('/applications');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;