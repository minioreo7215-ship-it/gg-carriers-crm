import { PrismaClient, UserRole, VerificationStatus, LeadStatus, Temperature, ActivityType, Priority, TaskStatus, DocumentType, ReminderType, ReminderChannel, MeetingType, MeetingStatus, QuotationStatus, ImportStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.auditLog.deleteMany({});
  await prisma.fieldSalesVisit.deleteMany({});
  await prisma.fieldSalesGPS.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.reminder.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.quotationItem.deleteMany({});
  await prisma.quotation.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.meeting.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.contact.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Users
  const hashedPassword = await bcrypt.hash('Password123', 12);

  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@ggcarriers.com',
      name: 'Super Admin',
      password: hashedPassword,
      phone: '+919876543210',
      role: UserRole.SUPER_ADMIN,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const salesManager = await prisma.user.create({
    data: {
      email: 'manager@ggcarriers.com',
      name: 'Rajesh Kumar',
      password: hashedPassword,
      phone: '+919876543211',
      role: UserRole.SALES_MANAGER,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const salesExecutive1 = await prisma.user.create({
    data: {
      email: 'executive1@ggcarriers.com',
      name: 'Priya Singh',
      password: hashedPassword,
      phone: '+919876543212',
      role: UserRole.SALES_EXECUTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const salesExecutive2 = await prisma.user.create({
    data: {
      email: 'executive2@ggcarriers.com',
      name: 'Amit Patel',
      password: hashedPassword,
      phone: '+919876543213',
      role: UserRole.SALES_EXECUTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const telecaller = await prisma.user.create({
    data: {
      email: 'telecaller@ggcarriers.com',
      name: 'Neha Sharma',
      password: hashedPassword,
      phone: '+919876543214',
      role: UserRole.TELECALLER,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const dataEntry = await prisma.user.create({
    data: {
      email: 'dataentry@ggcarriers.com',
      name: 'Vikram Desai',
      password: hashedPassword,
      phone: '+919876543215',
      role: UserRole.DATA_ENTRY_OPERATOR,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  console.log('✅ Users created');

  // Create Companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'TCS Limited',
        gst: '27AABCT0055K1Z0',
        industry: 'Technology & IT Services',
        subIndustry: 'IT Consulting',
        industrialArea: 'Bengaluru Tech Park',
        address: '123 Tech Street, Bengaluru',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        website: 'https://www.tcs.com',
        products: 'IT Services, Consulting',
        employeeSize: 5000,
        annualTurnover: '₹5000 Cr',
        verificationStatus: VerificationStatus.VERIFIED,
        aiValidated: true,
        aiScore: 95,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Infosys Limited',
        gst: '29AABCU0066R1Z0',
        industry: 'Technology & IT Services',
        subIndustry: 'Software Development',
        industrialArea: 'Pune IT Park',
        address: '456 IT Avenue, Pune',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        website: 'https://www.infosys.com',
        products: 'Software Solutions',
        employeeSize: 3000,
        annualTurnover: '₹3000 Cr',
        verificationStatus: VerificationStatus.VERIFIED,
        aiValidated: true,
        aiScore: 92,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Wipro Technologies',
        industry: 'Technology & IT Services',
        subIndustry: 'Digital Services',
        industrialArea: 'Chennai Tech Zone',
        address: '789 Digital Lane, Chennai',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        website: 'https://www.wipro.com',
        products: 'IT & Digital Services',
        employeeSize: 2500,
        verificationStatus: VerificationStatus.PENDING,
        aiValidated: false,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Hindustan Motors',
        gst: '27AABCH0033K2Z0',
        industry: 'Automobile Manufacturing',
        subIndustry: 'Commercial Vehicles',
        industrialArea: 'Kolkata Industrial Hub',
        address: '321 Auto Lane, Kolkata',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700001',
        website: 'https://www.hindustanmotors.com',
        products: 'Commercial Vehicles',
        employeeSize: 1500,
        verificationStatus: VerificationStatus.VERIFIED,
        aiValidated: true,
        aiScore: 88,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Apollo Tyres',
        industry: 'Rubber & Tyres',
        subIndustry: 'Tyre Manufacturing',
        industrialArea: 'Gurgaon Industrial Area',
        address: '654 Rubber Lane, Gurgaon',
        city: 'Gurgaon',
        state: 'Haryana',
        pincode: '122001',
        website: 'https://www.apollotyres.com',
        products: 'Commercial & Passenger Tyres',
        employeeSize: 2000,
        verificationStatus: VerificationStatus.VERIFIED,
        aiValidated: true,
        aiScore: 90,
      },
    }),
  ]);

  console.log('✅ Companies created');

  // Create Contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        companyId: companies[0].id,
        name: 'Rajesh Kumar',
        designation: 'Logistics Head',
        mobileNumber: '+919876543220',
        whatsappNumber: '+919876543220',
        email: 'rajesh.kumar@tcs.com',
        decisionMaker: true,
        isPrimaryContact: true,
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[0].id,
        name: 'Priya Sharma',
        designation: 'Supply Chain Manager',
        mobileNumber: '+919876543221',
        email: 'priya.sharma@tcs.com',
        decisionMaker: true,
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[1].id,
        name: 'Amit Desai',
        designation: 'Procurement Head',
        mobileNumber: '+919876543222',
        email: 'amit.desai@infosys.com',
        decisionMaker: true,
        isPrimaryContact: true,
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[2].id,
        name: 'Neha Verma',
        designation: 'Operations Manager',
        mobileNumber: '+919876543223',
        email: 'neha.verma@wipro.com',
        decisionMaker: true,
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[3].id,
        name: 'Vikram Singh',
        designation: 'Dispatch Manager',
        mobileNumber: '+919876543224',
        email: 'vikram.singh@hmobiles.com',
        decisionMaker: true,
        isPrimaryContact: true,
      },
    }),
  ]);

  console.log('✅ Contacts created');

  // Create Leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        companyId: companies[0].id,
        contactId: contacts[0].id,
        assignedToId: salesExecutive1.id,
        status: LeadStatus.MEETING_1_DONE,
        source: 'LINKEDIN',
        temperature: Temperature.HOT,
        aiScore: 92,
        predictedConversion: 0.85,
        requirements: 'Need logistics partner for pan-India distribution',
        budget: '₹50-100 Lakhs',
        expectedTimeline: 'Q3 2024',
        lastContactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        nextFollowUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.lead.create({
      data: {
        companyId: companies[1].id,
        contactId: contacts[2].id,
        assignedToId: salesExecutive1.id,
        status: LeadStatus.FOLLOW_UP,
        source: 'JUSTDIAL',
        temperature: Temperature.WARM,
        aiScore: 78,
        predictedConversion: 0.65,
        requirements: 'Looking for reliable transport vendor',
        budget: '₹30-50 Lakhs',
        expectedTimeline: 'Q4 2024',
        lastContactedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        nextFollowUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.lead.create({
      data: {
        companyId: companies[2].id,
        contactId: contacts[3].id,
        assignedToId: salesExecutive2.id,
        status: LeadStatus.NEW_LEAD,
        source: 'COLD_CALL',
        temperature: Temperature.COLD,
        aiScore: 45,
        predictedConversion: 0.25,
        requirements: 'Exploring logistics options',
        nextFollowUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.lead.create({
      data: {
        companyId: companies[3].id,
        contactId: contacts[4].id,
        assignedToId: salesExecutive2.id,
        status: LeadStatus.QUOTATION_SENT,
        source: 'REFERRAL',
        temperature: Temperature.WARM,
        aiScore: 82,
        predictedConversion: 0.72,
        requirements: 'End-to-end logistics solution',
        budget: '₹75 Lakhs',
        expectedTimeline: 'Q2 2024',
        lastContactedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextFollowUpDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.lead.create({
      data: {
        companyId: companies[4].id,
        assignedToId: salesExecutive1.id,
        status: LeadStatus.CONVERTED,
        source: 'WEBSITE',
        temperature: Temperature.HOT,
        aiScore: 98,
        predictedConversion: 0.98,
        requirements: 'National distribution network',
        budget: '₹100+ Lakhs',
      },
    }),
  ]);

  console.log('✅ Leads created');

  // Create Meetings
  const meetings = await Promise.all([
    prisma.meeting.create({
      data: {
        leadId: leads[0].id,
        companyId: companies[0].id,
        contactId: contacts[0].id,
        createdById: salesExecutive1.id,
        title: 'Initial Meeting - TCS Logistics Requirements',
        type: MeetingType.IN_PERSON,
        location: 'TCS Mumbai Office',
        notes: 'Discussed pan-India logistics requirements. Company interested in 5-year contract.',
        status: MeetingStatus.COMPLETED,
        outcome: 'Positive - Ready for quotation',
        scheduledAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        nextMeetingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.meeting.create({
      data: {
        leadId: leads[3].id,
        companyId: companies[3].id,
        contactId: contacts[4].id,
        createdById: salesExecutive2.id,
        title: 'Quotation Walkthrough - Hindustan Motors',
        type: MeetingType.VIDEO_CALL,
        notes: 'Presented quotation with competitive rates',
        status: MeetingStatus.SCHEDULED,
        scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        reminderEnabled: true,
      },
    }),
  ]);

  console.log('✅ Meetings created');

  // Create Tasks
  await Promise.all([
    prisma.task.create({
      data: {
        leadId: leads[0].id,
        assignedToId: salesExecutive1.id,
        title: 'Prepare detailed quotation for TCS',
        description: 'Create comprehensive quotation with service details',
        priority: Priority.HIGH,
        status: TaskStatus.IN_PROGRESS,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.task.create({
      data: {
        leadId: leads[1].id,
        assignedToId: salesExecutive1.id,
        title: 'Follow-up call with Infosys',
        description: 'Discuss their requirements in detail',
        priority: Priority.MEDIUM,
        status: TaskStatus.PENDING,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log('✅ Tasks created');

  // Create Quotations
  const quotations = await Promise.all([
    prisma.quotation.create({
      data: {
        quotationNumber: 'QT-2024-001',
        companyId: companies[0].id,
        leadId: leads[0].id,
        createdById: salesExecutive1.id,
        title: 'Pan-India Logistics Solution',
        description: 'Complete logistics solution including transportation, warehousing, and distribution',
        status: QuotationStatus.SENT,
        subtotal: 50000000,
        tax: 9000000,
        discount: 2000000,
        total: 57000000,
        validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        emailSent: true,
        items: {
          create: [
            {
              description: 'Transportation Services',
              quantity: 12,
              unitPrice: 2000000,
              total: 24000000,
            },
            {
              description: 'Warehousing Services',
              quantity: 1,
              unitPrice: 15000000,
              total: 15000000,
            },
            {
              description: 'Distribution Network',
              quantity: 1,
              unitPrice: 13000000,
              total: 13000000,
            },
          ],
        },
      },
    }),
  ]);

  console.log('✅ Quotations created');

  // Create Activities
  await Promise.all([
    prisma.activity.create({
      data: {
        leadId: leads[0].id,
        companyId: companies[0].id,
        contactId: contacts[0].id,
        createdById: salesExecutive1.id,
        type: ActivityType.CALL,
        duration: 1200,
        outcome: 'Positive - Interested in quotation',
        notes: 'Discussed volumes and routes',
      },
    }),
    prisma.activity.create({
      data: {
        leadId: leads[1].id,
        companyId: companies[1].id,
        contactId: contacts[2].id,
        createdById: salesExecutive1.id,
        type: ActivityType.EMAIL,
        notes: 'Sent proposal document',
      },
    }),
  ]);

  console.log('✅ Activities created');

  // Create Reminders
  await Promise.all([
    prisma.reminder.create({
      data: {
        leadId: leads[0].id,
        type: ReminderType.FOLLOW_UP,
        title: 'Follow-up: TCS Quotation',
        description: 'Check if TCS has reviewed the quotation',
        reminderTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        channels: [ReminderChannel.EMAIL, ReminderChannel.BROWSER],
      },
    }),
  ]);

  console.log('✅ Reminders created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
