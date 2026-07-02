import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Create carrier
router.post('/', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zipCode, country, licenseNumber } = req.body;

    const carrier = await prisma.carrier.create({
      data: {
        name,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        country,
        licenseNumber,
        status: 'ACTIVE',
      },
    });

    res.status(201).json(carrier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create carrier' });
  }
});

// Get all carriers
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const skip = ((Number(page) - 1) * Number(limit));

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const carriers = await prisma.carrier.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.carrier.count({ where });

    res.json({
      carriers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carriers' });
  }
});

// Get carrier by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const carrier = await prisma.carrier.findUnique({
      where: { id: req.params.id },
      include: { shipments: true },
    });

    if (!carrier) {
      return res.status(404).json({ error: 'Carrier not found' });
    }

    res.json(carrier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carrier' });
  }
});

// Update carrier
router.put('/:id', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const carrier = await prisma.carrier.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(carrier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update carrier' });
  }
});

// Delete carrier
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.carrier.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Carrier deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete carrier' });
  }
});

export default router;
