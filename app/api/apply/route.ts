import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.discord || !body.role || !body.yearsExperience || !body.warStory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log application
    console.log('🚀 New Application Received:')
    console.log('─'.repeat(60))
    console.log(`Name: ${body.name}`)
    console.log(`Email: ${body.email}`)
    console.log(`Discord: ${body.discord}`)
    console.log(`Role: ${body.role}`)
    console.log(`Experience: ${body.yearsExperience} years`)
    console.log(`War Story: ${body.warStory.substring(0, 100)}...`)
    console.log(`Timestamp: ${new Date().toISOString()}`)
    console.log('─'.repeat(60))

    return NextResponse.json(
      { success: true, message: 'Application received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    )
  }
}
