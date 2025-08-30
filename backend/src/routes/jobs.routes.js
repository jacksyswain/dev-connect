import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import * as Jobs from '../controllers/jobs.controller.js';


const router = Router();
router.get('/', Jobs.getJobs);
router.get('/:id', Jobs.getJobById);
router.post('/', requireAuth, requireRole('EMPLOYER'), Jobs.createJob);
router.patch('/:id', requireAuth, requireRole('EMPLOYER'), Jobs.updateJob);
router.delete('/:id', requireAuth, requireRole('EMPLOYER'), Jobs.deleteJob);
export default router;