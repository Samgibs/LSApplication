const express = require('express');
const { createProject, getAllProjects, updateProject, deleteProject } = require('../controllers/projectController');

const router = express.Router();

router.post('/', createProject);

router.get('/', getAllProjects);

router.put('/:id', updateProject);

router.delete('/:id', deleteProject);

module.exports = router;
