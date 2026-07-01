import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all contacts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { skip = '0', take = '20', companyId } = req.query;

    const where: any = {};
    if (companyId) where.companyId = companyId;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip: parseInt(skip as string),
        take: parseInt(take as string),
        include: { company: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({ contacts, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error });
  }
});

// Create contact
router.post('/', async (req: Request, res: Response) => {
  try {
    const contact = await prisma.contact.create({
      data: req.body,
      include: { company: true },
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create contact', error });
  }
});

export default router;
