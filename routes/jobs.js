const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort('-createdAt');
        res.render('jobs/index', { jobs });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Show create job form
router.get('/create', (req, res) => {
    res.render('jobs/create');
});

// Create new job
router.post('/', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.redirect('/jobs');
    } catch (err) {
        res.status(400).render('jobs/create', { error: err.message });
    }
});

// Show single job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).send('Job not found');
        res.render('jobs/show', { job });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).send('Job not found');
        res.render('jobs/edit', { job });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update job
router.put('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).send('Job not found');
        res.redirect(`/jobs/${job._id}`);
    } catch (err) {
        res.status(400).render('jobs/edit', { error: err.message });
    }
});

// Delete job
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).send('Job not found');
        res.redirect('/jobs');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;