import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Create shipment
router.post('/', authenticate, authorize('ADMIN', 'MANAGER', 'SALES'), async (req, res) => {
  try {
    const {
      trackingNumber,
      origin,
      destination,
      cargoType,
      weight,
      value,
      carrierId,
      status,
      pickupDate,
      deliveryDate,
    } = req.body;

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        origin,
        destination,
        cargoType,
        weight,
        value,
        carrierId,
        status: status || 'PENDING',
        pickupDate: new Date(pickupDate),
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      },
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shipment' });
  }
});

// Get all shipments
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', carrierId = '' } = req.query;
    const skip = ((Number(page) - 1) * Number(limit));

    const where: any = {};
    if (search) {
      where.OR = [
        { trackingNumber: { contains: search as string, mode: 'insensitive' } },
        { origin: { contains: search as string, mode: 'insensitive' } },
        { destination: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }
    if (carrierId) {
      where.carrierId = carrierId;
    }

    const shipments = await prisma.shipment.findMany({
      where,
      skip,
      take: Number(limit),
      include: { carrier: true },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.shipment.count({ where });

    res.json({
      shipments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipments' });
  }
});

// Get shipment by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: req.params.id },
      include: { carrier: true, documents: true },
    });

    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipment' });
  }
});

// Update shipment
router.put('/:id', authenticate, authorize('ADMIN', 'MANAGER', 'SALES'), async (req, res) => {
  try {
    const shipment = await prisma.shipment.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shipment' });
  }
});

// Delete shipment
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.shipment.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Shipment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shipment' });
  }
});

export default router;
