import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
})

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, data, chartType } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // 构建AI提示词
    const systemPrompt = `You are a data visualization expert. Generate chart configuration based on user description.

Return JSON with:
- chartType: "bar" | "line" | "pie" | "scatter" | "area"
- title: chart title
- data: array of objects (the data to visualize)
- xAxis: x-axis label
- yAxis: y-axis label
- colors: array of hex colors
- insights: array of 2-3 key insights from the data

If data is not provided, generate sample data that matches the description.`

    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Description: ${prompt}\n\n${data ? `Data: ${JSON.stringify(data)}` : ''}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const chartConfig = JSON.parse(response.choices[0].message.content || '{}')

    return NextResponse.json({
      success: true,
      chartConfig,
      timestamp: new Date().toISOString(),
    })

  } catch (error: any) {
    console.error('Chart generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate chart', details: error.message },
      { status: 500 }
    )
  }
}
