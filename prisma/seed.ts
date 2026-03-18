import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with dummy data...')

  // Create a dummy user to own the jobs
  const hashedPassword = await bcrypt.hash('password123', 10)
  const dummyUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test Setup User',
      password: hashedPassword,
      role: 'find-worker',
    },
  })

  // Dummy jobs
  const jobsData = [
    {
      title: "House Cleaning - 3 Bedroom Home",
      category: "cleaning",
      location: "Paris, France",
      budgetMin: 80,
      budgetMax: 150,
      description: "Looking for a thorough house cleaning for a 3-bedroom home. Tasks include dusting, vacuuming, mopping, bathroom cleaning, and kitchen cleaning.",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // in 2 days
      timePreference: "morning",
      urgency: "standard",
      contactPreference: "either",
      userId: dummyUser.id,
      status: "open"
    },
    {
      title: "Garden Maintenance - Weekly Service",
      category: "landscaping",
      location: "Lyon, France",
      budgetMin: 40,
      budgetMax: 60,
      description: "Need someone for weekly garden maintenance. Lawnmowing, weeding, and trimming small hedges for a medium-sized backyard.",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // in 3 days
      timePreference: "afternoon",
      urgency: "flexible",
      contactPreference: "message",
      userId: dummyUser.id,
      status: "open"
    },
    {
      title: "Fix Leaking Bathroom Pipe",
      category: "plumbing",
      location: "Marseille, France",
      budgetMin: 100,
      budgetMax: 250,
      description: "Emergency! The pipe under the bathroom sink is leaking continuously. Need a plumber ASAP to fix or replace the faulty pipe.",
      date: new Date(), 
      timePreference: "anytime",
      urgency: "emergency",
      contactPreference: "phone",
      userId: dummyUser.id,
      status: "open"
    },
    {
      title: "Install New Light Fixtures",
      category: "electrical",
      location: "Toulouse, France",
      budgetMin: 60,
      budgetMax: 120,
      description: "Looking for an electrician to install 3 new ceiling light fixtures in my living room and dining area. I already have the fixtures.",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // in 5 days
      timePreference: "evening",
      urgency: "standard",
      contactPreference: "either",
      userId: dummyUser.id,
      status: "open"
    },
    {
      title: "Assemble IKEA Wardrobe",
      category: "carpentry",
      location: "Nice, France",
      budgetMin: 50,
      budgetMax: 100,
      description: "Need help assembling a large PAX wardrobe from IKEA. It's quite big and heavy, so experience with IKEA furniture is a huge plus.",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
      timePreference: "anytime",
      urgency: "urgent",
      contactPreference: "either",
      userId: dummyUser.id,
      status: "open"
    }
  ]

  for (const job of jobsData) {
    await prisma.job.create({
      data: job
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
