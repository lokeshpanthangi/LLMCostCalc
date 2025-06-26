
import React, { useState, useEffect } from 'react';
import { Calculator, Clock, MemoryStick, CheckCircle, AlertTriangle } from 'lucide-react';

interface Model {
  name: string;
  parameters: string;
  contextLength: number;
  costPer1MTokens: number;
  memoryGB: number;
  latencyMs: number;
}

interface Company {
  name: string;
  models: Model[];
}

const Index = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [totalTokens, setTotalTokens] = useState(1000000);
  const [totalRequests, setTotalRequests] = useState(1000);
  const [calculations, setCalculations] = useState({
    dailyCost: 0,
    monthlyCost: 0,
    costPerRequest: 0,
    latencyMs: 0,
    ramGB: 0,
    vramGB: 0,
    compatibility: 'good'
  });

  const companies: Company[] = [
    {
      name: 'OpenAI',
      models: [
        {
          name: 'GPT-4',
          parameters: '175B',
          contextLength: 8192,
          costPer1MTokens: 30,
          memoryGB: 350,
          latencyMs: 1500
        },
        {
          name: 'GPT-3.5 Turbo',
          parameters: '175B',
          contextLength: 4096,
          costPer1MTokens: 1.5,
          memoryGB: 175,
          latencyMs: 800
        }
      ]
    },
    {
      name: 'Anthropic',
      models: [
        {
          name: 'Claude 3 Opus',
          parameters: '175B',
          contextLength: 200000,
          costPer1MTokens: 15,
          memoryGB: 300,
          latencyMs: 1200
        },
        {
          name: 'Claude 3 Sonnet',
          parameters: '100B',
          contextLength: 200000,
          costPer1MTokens: 3,
          memoryGB: 200,
          latencyMs: 900
        }
      ]
    },
    {
      name: 'Google',
      models: [
        {
          name: 'Gemini Pro',
          parameters: '137B',
          contextLength: 32768,
          costPer1MTokens: 2.5,
          memoryGB: 250,
          latencyMs: 1000
        },
        {
          name: 'PaLM 2',
          parameters: '340B',
          contextLength: 8192,
          costPer1MTokens: 4,
          memoryGB: 400,
          latencyMs: 1800
        }
      ]
    },
    {
      name: 'Meta',
      models: [
        {
          name: 'Llama 2 70B',
          parameters: '70B',
          contextLength: 4096,
          costPer1MTokens: 0.9,
          memoryGB: 140,
          latencyMs: 700
        },
        {
          name: 'Llama 2 13B',
          parameters: '13B',
          contextLength: 4096,
          costPer1MTokens: 0.2,
          memoryGB: 26,
          latencyMs: 300
        }
      ]
    }
  ];

  const getCurrentModel = (): Model | null => {
    const company = companies.find(c => c.name === selectedCompany);
    if (!company) return null;
    return company.models.find(m => m.name === selectedModel) || null;
  };

  const calculateMetrics = () => {
    const model = getCurrentModel();
    if (!model) return;

    // Cost calculations
    const totalCostUSD = (totalTokens / 1000000) * model.costPer1MTokens;
    const dailyCost = totalCostUSD / 30; // Assuming monthly usage spread over 30 days
    const monthlyCost = totalCostUSD;
    const costPerRequest = totalCostUSD / totalRequests;

    // Latency calculations (base latency + scaling factor for batch size)
    const batchSize = Math.max(1, totalRequests / 100);
    const latencyMs = model.latencyMs * (1 + Math.log(batchSize) * 0.1);

    // Memory calculations
    const ramGB = model.memoryGB;
    const vramGB = model.memoryGB * 0.8; // Estimate VRAM as 80% of total memory

    // Compatibility assessment
    let compatibility = 'good';
    if (ramGB > 64) compatibility = 'warning';
    if (ramGB > 200) compatibility = 'error';

    setCalculations({
      dailyCost,
      monthlyCost,
      costPerRequest,
      latencyMs,
      ramGB,
      vramGB,
      compatibility
    });
  };

  useEffect(() => {
    if (selectedModel && selectedCompany) {
      calculateMetrics();
    }
  }, [selectedModel, selectedCompany, totalTokens, totalRequests]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getCompatibilityColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCompatibilityIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'error': return <AlertTriangle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getCompatibilityMessage = (status: string) => {
    switch (status) {
      case 'good': return 'Compatible with standard hardware';
      case 'warning': return 'Requires high-end hardware';
      case 'error': return 'Requires specialized infrastructure';
      default: return 'Compatibility unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LLM Cost Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estimate cost, latency, and memory requirements for Large Language Model deployment
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  setSelectedModel('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.name} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!selectedCompany}
              >
                <option value="">Select Model</option>
                {selectedCompany && companies
                  .find(c => c.name === selectedCompany)
                  ?.models.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name} ({model.parameters})
                    </option>
                  ))}
              </select>
            </div>

            {/* Total Tokens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Tokens (Monthly)
              </label>
              <input
                type="number"
                value={totalTokens}
                onChange={(e) => setTotalTokens(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1000"
                step="1000"
              />
            </div>

            {/* Total Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Requests (Monthly)
              </label>
              <input
                type="number"
                value={totalRequests}
                onChange={(e) => setTotalRequests(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="100"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Results Cards */}
        {selectedModel && selectedCompany && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cost Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cost</h3>
                <Calculator className="w-6 h-6 text-blue-500" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(calculations.monthlyCost)}
                </div>
                <div className="text-sm text-gray-600">Monthly</div>
                <div className="text-sm text-gray-500">
                  Daily: {formatCurrency(calculations.dailyCost)}
                </div>
                <div className="text-sm text-gray-500">
                  Per Request: {formatCurrency(calculations.costPerRequest)}
                </div>
              </div>
            </div>

            {/* Speed Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Speed</h3>
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {calculations.latencyMs < 1000 
                    ? `${Math.round(calculations.latencyMs)}ms`
                    : `${(calculations.latencyMs / 1000).toFixed(1)}s`
                  }
                </div>
                <div className="text-sm text-gray-600">Response Time</div>
                <div className="text-sm text-gray-500">
                  {calculations.latencyMs < 500 ? 'Excellent' :
                   calculations.latencyMs < 1000 ? 'Good' :
                   calculations.latencyMs < 2000 ? 'Fair' : 'Slow'}
                </div>
              </div>
            </div>

            {/* Memory Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Memory</h3>
                <MemoryStick className="w-6 h-6 text-purple-500" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">
                  {calculations.ramGB}GB
                </div>
                <div className="text-sm text-gray-600">RAM Required</div>
                <div className="text-sm text-gray-500">
                  VRAM: {Math.round(calculations.vramGB)}GB
                </div>
                {calculations.ramGB > 64 && (
                  <div className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                    High memory requirements
                  </div>
                )}
              </div>
            </div>

            {/* Compatibility Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-gray-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Compatibility</h3>
                <div className={`${getCompatibilityColor(calculations.compatibility)}`}>
                  {getCompatibilityIcon(calculations.compatibility)}
                </div>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold capitalize ${calculations.compatibility === 'good' ? 'text-green-600' : calculations.compatibility === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {calculations.compatibility}
                </div>
                <div className="text-sm text-gray-600">Hardware Status</div>
                <div className="text-sm text-gray-500">
                  {getCompatibilityMessage(calculations.compatibility)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        {selectedModel && selectedCompany && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Parameters</div>
                <div className="font-medium">{getCurrentModel()?.parameters}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Context Length</div>
                <div className="font-medium">{formatNumber(getCurrentModel()?.contextLength || 0)} tokens</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Cost per 1M Tokens</div>
                <div className="font-medium">{formatCurrency(getCurrentModel()?.costPer1MTokens || 0)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
