import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get dashboard stats
router.get('/stats', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const totalShipments = await prisma.shipment.count();
    const totalCarriers = await prisma.carrier.count();
    const pendingShipments = await prisma.shipment.count({ where: { status: 'PENDING' } });
    const activeShipments = await prisma.shipment.count({ where: { status: { in: ['IN_TRANSIT', 'OUT_FOR_DELIVERY'] } } });
    const completedShipments = await prisma.shipment.count({ where: { status: 'DELIVERED' } });

    const totalValue = await prisma.shipment.aggregate({
      _sum: { value: true },
    });

    res.json({
      totalShipments,
      totalCarriers,
      pendingShipments,
      activeShipments,
      completedShipments,
      totalValue: totalValue._sum.value || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get shipments by status
router.get('/shipments-by-status', authenticate, async (req, res) => {
  try {
    const statuses = ['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    const data = await Promise.all(
      statuses.map(async (status) => ({
        status,
        count: await prisma.shipment.count({ where: { status } }),
      }))
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

// Export shipments to Excel
router.get('/export/shipments', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      include: { carrier: true },
    });

    const csv = [
      ['Tracking #', 'Origin', 'Destination', 'Cargo Type', 'Weight', 'Value', 'Carrier', 'Status', 'Pickup Date', 'Delivery Date'],
      ...shipments.map(s => [
        s.trackingNumber,
        s.origin,
        s.destination,
        s.cargoType,
        s.weight,
        s.value,
        s.carrier?.name,
        s.status,
        s.pickupDate?.toISOString().split('T')[0],
        s.deliveryDate?.toISOString().split('T')[0],
      ]),
    ];

    const csvContent = csv.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="shipments.csv"');
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export shipments' });
  }
});

export default router;
