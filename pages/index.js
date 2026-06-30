import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState('')
  const [chartType, setChartType] = useState('bar')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, chartType }),
      })
      
      const result = await response.json()
      setResult(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>ChartMind AI - Natural Language Chart Generator</title>
        <meta name="description" content="Generate charts from natural language" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">ChartMind AI</span>
            <div className="space-x-4">
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Dashboard</a>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ChartMind AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Generate beautiful charts from natural language descriptions
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Try it now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data (JSON format)
                </label>
                <textarea
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder='[{"name": "Jan", "value": 100}, {"name": "Feb", "value": 200}]'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chart Type
                </label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : 'Generate Chart'}
              </button>
            </form>

            {result && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Generated Chart</h3>
                <pre className="whitespace-pre-wrap text-sm text-green-800">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Multiple Chart Types</h3>
              <p className="text-gray-600">Bar, Line, Pie, Scatter, and more</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Natural language to charts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-600">Charts in seconds</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8" id="pricing">
            <h2 className="text-2xl font-bold mb-8 text-center">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">$0<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>✅ 10 charts/month</li>
                  <li>✅ Basic chart types</li>
                </ul>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300">
                  Get Started
                </button>
              </div>
              <div className="border-2 border-blue-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">$15<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>✅ Unlimited charts</li>
                  <li>✅ All chart types</li>
                  <li>✅ Export to PNG/SVG</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Subscribe Now
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Team</h3>
                <p className="text-3xl font-bold mb-4">$39<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>✅ Everything in Pro</li>
                  <li>✅ Team collaboration</li>
                  <li>✅ API access</li>
                </ul>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-800 text-white mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2026 ChartMind AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
