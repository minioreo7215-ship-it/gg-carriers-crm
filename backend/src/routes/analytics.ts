import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Dashboard stats
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const [totalLeads, convertedLeads, hotLeads, warmLeads, coldLeads, totalCompanies, todaysMeetings, pendingFollowUps, totalQuotations] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'CONVERTED' } }),
      prisma.lead.count({ where: { temperature: 'HOT' } }),
      prisma.lead.count({ where: { temperature: 'WARM' } }),
      prisma.lead.count({ where: { temperature: 'COLD' } }),
      prisma.company.count(),
      prisma.meeting.count({ where: { status: 'SCHEDULED' } }),
      prisma.lead.count({ where: { status: 'FOLLOW_UP' } }),
      prisma.quotation.count(),
    ]);

    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    res.json({
      stats: {
        totalLeads,
        convertedLeads,
        conversionRate,
        hotLeads,
        warmLeads,
        coldLeads,
        totalCompanies,
        todaysMeetings,
        pendingFollowUps,
        totalQuotations,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error });
  }
});

export default router;
