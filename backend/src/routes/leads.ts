import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const leadSchema = z.object({
  companyId: z.string(),
  contactId: z.string().optional(),
  status: z.string().optional(),
  temperature: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  assignedToId: z.string().optional(),
});

// Get all leads with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { skip = '0', take = '20', status, temperature, assignedToId, search } = req.query;

    const where: any = {};

    if (status) where.status = status;
    if (temperature) where.temperature = temperature;
    if (assignedToId) where.assignedToId = assignedToId;

    if (search) {
      where.OR = [
        { company: { name: { contains: search as string, mode: 'insensitive' } } },
        { contact: { email: { contains: search as string, mode: 'insensitive' } } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip: parseInt(skip as string),
        take: parseInt(take as string),
        include: {
          company: true,
          contact: true,
          assignedTo: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lead.count({ where }),
    ]);

    res.json({ leads, total, page: Math.ceil(parseInt(skip as string) / parseInt(take as string)) + 1 });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leads', error });
  }
});

// Get single lead
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
      include: {
        company: true,
        contact: true,
        assignedTo: true,
        meetings: true,
        tasks: true,
        activities: true,
        quotations: true,
      },
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lead', error });
  }
});

// Create lead
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = leadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        ...data,
        status: data.status as any || 'NEW_LEAD',
        temperature: data.temperature as any || 'COLD',
      },
      include: {
        company: true,
        contact: true,
        assignedTo: true,
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create lead', error });
  }
});

// Update lead
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        company: true,
        contact: true,
        assignedTo: true,
      },
    });

    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update lead', error });
  }
});

// Delete lead
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead', error });
  }
});

export default router;
