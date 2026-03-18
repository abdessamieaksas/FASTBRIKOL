import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "open" },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    })
    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const job = await prisma.job.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        location: data.location,
        address: data.address || null,
        budgetMin: data.budget[0],
        budgetMax: data.budget[1],
        date: data.date ? new Date(data.date) : null,
        timePreference: data.timePreference,
        urgency: data.urgency,
        contactPreference: data.contactPreference,
        additionalDetails: data.additionalDetails || null,
        userId: (session.user as any).id,
      },
    })

    return NextResponse.json({ job }, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
