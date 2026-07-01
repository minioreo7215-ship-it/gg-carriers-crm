import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all companies
router.get('/', async (req: Request, res: Response) => {
  try {
    const { skip = '0', take = '20', search } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { city: { contains: search as string, mode: 'insensitive' } },
        { state: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip: parseInt(skip as string),
        take: parseInt(take as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.company.count({ where }),
    ]);

    res.json({ companies, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch companies', error });
  }
});

// Create company
router.post('/', async (req: Request, res: Response) => {
  try {
    const company = await prisma.company.create({
      data: req.body,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create company', error });
  }
});

// Get company
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.params.id },
      include: {
        contacts: true,
        leads: true,
      },
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch company', error });
  }
});

export default router;
