export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { data, chartType } = req.body

  if (!data || !chartType) {
    return res.status(400).json({ error: 'Data and chart type are required' })
  }

  try {
    // Parse data
    const parsedData = JSON.parse(data)

    // Generate chart configuration
    const chartConfig = {
      type: chartType,
      data: parsedData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Generated Chart',
          },
        },
      },
    }

    // In production, you would use a charting library to generate the actual chart
    // For now, return the configuration
    res.status(200).json({
      success: true,
      chartType,
      data: parsedData,
      config: chartConfig,
      downloadUrl: `/api/download/chart-${Date.now()}.png`,
    })
  } catch (error) {
    console.error('Chart generation error:', error)
    res.status(500).json({ error: error.message })
  }
}
