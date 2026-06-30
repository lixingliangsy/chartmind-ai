'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [chartConfig, setChartConfig] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      if (data.success) {
        setChartConfig(data.chartConfig)
      }
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">ChartMind AI</h1>
        <p className="text-gray-600 mb-8">Turn data into stunning charts with AI</p>

        {/* Input */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <label className="block text-sm font-medium mb-2">
            Describe your chart
          </label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={3}
            placeholder="Show monthly sales trend for 2024, compare with 2023..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : '🤖 Generate Chart'}
          </button>
        </div>

        {/* Chart Preview */}
        {chartConfig && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">{chartConfig.title}</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartConfig.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartConfig.xAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={chartConfig.yAxis} fill={chartConfig.colors?.[0] || '#3b82f6'} />
              </BarChart>
            </ResponsiveContainer>

            {chartConfig.insights && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Insights</h3>
                <ul className="list-disc list-inside">
                  {chartConfig.insights.map((insight: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700">{insight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
