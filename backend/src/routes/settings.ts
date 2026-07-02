import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get settings
router.get('/', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsObj = settings.reduce((acc, s) => ({
      ...acc,
      [s.key]: s.value,
    }), {});

    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update setting
router.put('/:key', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    const { value } = req.body;

    const setting = await prisma.setting.upsert({
      where: { key: req.params.key },
      update: { value },
      create: { key: req.params.key, value },
    });

    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

export default router;
