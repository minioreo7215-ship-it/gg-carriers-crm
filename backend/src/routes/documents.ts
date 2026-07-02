import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Upload document
router.post('/', authenticate, async (req, res) => {
  try {
    const { shipmentId, fileName, fileType, fileUrl, documentType } = req.body;

    const document = await prisma.document.create({
      data: {
        shipmentId,
        fileName,
        fileType,
        fileUrl,
        documentType: documentType || 'OTHER',
      },
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Get documents by shipment
router.get('/shipment/:shipmentId', authenticate, async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { shipmentId: req.params.shipmentId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Delete document
router.delete('/:id', authenticate, authorize('ADMIN', 'MANAGER'), async (req, res) => {
  try {
    await prisma.document.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;
