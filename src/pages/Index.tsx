import React, { useState, useEffect } from 'react';
import { Calculator, Clock, MemoryStick, CheckCircle, AlertTriangle } from 'lucide-react';

interface Model {
  name: string;
  parameters?: string;
  contextLength: number;
  inputCostPer1MTokens: number;
  outputCostPer1MTokens: number;
  memoryGB?: number;
  latencyMs: number;
  hardware: string;
  isFree?: boolean;
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
  const [inputOutputRatio, setInputOutputRatio] = useState(0.5); // 50% input, 50% output
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
          name: 'GPT-4.1',
          parameters: '175B+',
          contextLength: 128000,
          inputCostPer1MTokens: 5,
          outputCostPer1MTokens: 20,
          latencyMs: 1200,
          hardware: 'Cloud API'
        },
        {
          name: 'GPT-4o',
          parameters: '175B+',
          contextLength: 128000,
          inputCostPer1MTokens: 3,
          outputCostPer1MTokens: 10,
          latencyMs: 800,
          hardware: 'Cloud API'
        },
        {
          name: 'GPT-4o Mini',
          parameters: '8B',
          contextLength: 128000,
          inputCostPer1MTokens: 0.15,
          outputCostPer1MTokens: 0.60,
          latencyMs: 400,
          hardware: 'Cloud API'
        },
        {
          name: 'GPT-4 Turbo',
          parameters: '175B+',
          contextLength: 128000,
          inputCostPer1MTokens: 10,
          outputCostPer1MTokens: 30,
          latencyMs: 1500,
          hardware: 'Cloud API'
        },
        {
          name: 'o1-preview',
          parameters: '175B+',
          contextLength: 128000,
          inputCostPer1MTokens: 15,
          outputCostPer1MTokens: 60,
          latencyMs: 3000,
          hardware: 'Cloud API'
        },
        {
          name: 'o1-mini',
          parameters: '20B',
          contextLength: 128000,
          inputCostPer1MTokens: 3,
          outputCostPer1MTokens: 12,
          latencyMs: 2000,
          hardware: 'Cloud API'
        },
        {
          name: 'GPT-3.5 Turbo',
          parameters: '20B',
          contextLength: 16000,
          inputCostPer1MTokens: 0.50,
          outputCostPer1MTokens: 1.50,
          latencyMs: 300,
          hardware: 'Cloud API'
        }
      ]
    },
    {
      name: 'Anthropic',
      models: [
        {
          name: 'Claude 4 Opus',
          parameters: '200B+',
          contextLength: 200000,
          inputCostPer1MTokens: 15,
          outputCostPer1MTokens: 75,
          latencyMs: 2000,
          hardware: 'Cloud API'
        },
        {
          name: 'Claude 4 Sonnet',
          parameters: '100B',
          contextLength: 200000,
          inputCostPer1MTokens: 3,
          outputCostPer1MTokens: 15,
          latencyMs: 1000,
          hardware: 'Cloud API'
        },
        {
          name: 'Claude 3.5 Sonnet',
          parameters: '100B',
          contextLength: 200000,
          inputCostPer1MTokens: 3,
          outputCostPer1MTokens: 15,
          latencyMs: 1200,
          hardware: 'Cloud API'
        },
        {
          name: 'Claude 3.5 Haiku',
          parameters: '20B',
          contextLength: 200000,
          inputCostPer1MTokens: 1,
          outputCostPer1MTokens: 5,
          latencyMs: 500,
          hardware: 'Cloud API'
        },
        {
          name: 'Claude 3 Opus',
          parameters: '175B',
          contextLength: 200000,
          inputCostPer1MTokens: 15,
          outputCostPer1MTokens: 75,
          latencyMs: 2500,
          hardware: 'Cloud API'
        },
        {
          name: 'Claude 3 Haiku',
          parameters: '20B',
          contextLength: 200000,
          inputCostPer1MTokens: 0.25,
          outputCostPer1MTokens: 1.25,
          latencyMs: 400,
          hardware: 'Cloud API'
        }
      ]
    },
    {
      name: 'Google',
      models: [
        {
          name: 'Gemini 2.5 Pro',
          parameters: '175B+',
          contextLength: 2000000,
          inputCostPer1MTokens: 7,
          outputCostPer1MTokens: 21,
          latencyMs: 1800,
          hardware: 'Cloud API'
        },
        {
          name: 'Gemini 1.5 Pro',
          parameters: '175B',
          contextLength: 2000000,
          inputCostPer1MTokens: 7,
          outputCostPer1MTokens: 21,
          latencyMs: 1500,
          hardware: 'Cloud API'
        },
        {
          name: 'Gemini 1.5 Flash',
          parameters: '20B',
          contextLength: 1000000,
          inputCostPer1MTokens: 0.075,
          outputCostPer1MTokens: 0.30,
          latencyMs: 300,
          hardware: 'Cloud API'
        },
        {
          name: 'Gemini Pro',
          parameters: '137B',
          contextLength: 32000,
          inputCostPer1MTokens: 0.50,
          outputCostPer1MTokens: 1.50,
          latencyMs: 800,
          hardware: 'Cloud API'
        },
        {
          name: 'Gemma 2 27B',
          parameters: '27B',
          contextLength: 8000,
          inputCostPer1MTokens: 0,
          outputCostPer1MTokens: 0,
          memoryGB: 54,
          latencyMs: 1000,
          hardware: 'Self-hosted',
          isFree: true
        },
        {
          name: 'Gemma 2 9B',
          parameters: '9B',
          contextLength: 8000,
          inputCostPer1MTokens: 0,
          outputCostPer1MTokens: 0,
          memoryGB: 18,
          latencyMs: 500,
          hardware: 'Self-hosted',
          isFree: true
        }
      ]
    },
    {
      name: 'Meta',
      models: [
        {
          name: 'Llama 3 405B',
          parameters: '405B',
          contextLength: 128000,
          inputCostPer1MTokens: 0,
          outputCostPer1MTokens: 0,
          memoryGB: 810,
          latencyMs: 5000,
          hardware: 'Self-hosted',
          isFree: true
        },
        {
          name: 'Llama 3 70B',
          parameters: '70B',
          contextLength: 128000,
          inputCostPer1MTokens: 0,
          outputCostPer1MTokens: 0,
          memoryGB: 140,
          latencyMs: 1500,
          hardware: 'Self-hosted',
          isFree: true
        },
        {
          name: 'Llama 3 8B',
          parameters: '8B',
          contextLength: 128000,
          inputCostPer1MTokens: 0,
          outputCostPer1MTokens: 0,
          memoryGB: 16,
          latencyMs: 400,
          hardware: 'Self-hosted',
          isFree: true
        }
      ]
    },
    {
      name: 'Mistral AI',
      models: [
        {
          name: 'Mistral Large 2',
          parameters: '123B',
          contextLength: 128000,
          inputCostPer1MTokens: 3,
          outputCostPer1MTokens: 9,
          latencyMs: 1200,
          hardware: 'Cloud API'
        },
        {
          name: 'Mistral Small',
          parameters: '22B',
          contextLength: 32000,
          inputCostPer1MTokens: 0.20,
          outputCostPer1MTokens: 0.60,
          latencyMs: 600,
          hardware: 'Cloud API'
        },
        {
          name: 'Mixtral 8x7B',
          parameters: '8x7B',
          contextLength: 32000,
          inputCostPer1MTokens: 0,
          outputCostPer1MTokens: 0,
          memoryGB: 90,
          latencyMs: 800,
          hardware: 'Self-hosted',
          isFree: true
        }
      ]
    },
    {
      name: 'Cohere',
      models: [
        {
          name: 'Command R+',
          parameters: '104B',
          contextLength: 128000,
          inputCostPer1MTokens: 3,
          outputCostPer1MTokens: 15,
          latencyMs: 1500,
          hardware: 'Cloud API'
        },
        {
          name: 'Command R',
          parameters: '35B',
          contextLength: 128000,
          inputCostPer1MTokens: 0.50,
          outputCostPer1MTokens: 1.50,
          latencyMs: 800,
          hardware: 'Cloud API'
        }
      ]
    },
    {
      name: 'xAI',
      models: [
        {
          name: 'Grok-2',
          parameters: '314B',
          contextLength: 128000,
          inputCostPer1MTokens: 2,
          outputCostPer1MTokens: 10,
          latencyMs: 1800,
          hardware: 'Cloud API'
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

    // Calculate input and output tokens
    const inputTokens = totalTokens * inputOutputRatio;
    const outputTokens = totalTokens * (1 - inputOutputRatio);

    // Cost calculations with separate input/output pricing
    const inputCost = (inputTokens / 1000000) * model.inputCostPer1MTokens;
    const outputCost = (outputTokens / 1000000) * model.outputCostPer1MTokens;
    const totalCostUSD = inputCost + outputCost;
    
    const dailyCost = totalCostUSD / 30;
    const monthlyCost = totalCostUSD;
    const costPerRequest = totalCostUSD / totalRequests;

    // Latency calculations
    const batchSize = Math.max(1, totalRequests / 100);
    const latencyMs = model.latencyMs * (1 + Math.log(batchSize) * 0.1);

    // Memory calculations
    let ramGB = 0;
    let vramGB = 0;

    if (model.isFree && model.memoryGB) {
      // Self-hosted models
      ramGB = model.memoryGB;
      vramGB = model.memoryGB * 0.6; // Estimate VRAM as 60% of total memory for self-hosted
    } else {
      // API models - estimate based on parameter count
      const paramSize = model.parameters ? 
        parseFloat(model.parameters.replace(/[^0-9.]/g, '')) : 100;
      ramGB = paramSize * 2; // Rough estimate: 2GB per billion parameters
      vramGB = paramSize * 1.5; // VRAM estimate
    }

    // Compatibility assessment
    let compatibility = 'good';
    if (model.isFree) {
      if (ramGB > 100) compatibility = 'error';
      else if (ramGB > 50) compatibility = 'warning';
    } else {
      compatibility = 'good'; // API models are always compatible
    }

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
  }, [selectedModel, selectedCompany, totalTokens, totalRequests, inputOutputRatio]);

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
            LLM Cost Calculator 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estimate cost, latency, and memory requirements for Large Language Model deployment with latest 2025 pricing
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                      {model.name} ({model.parameters || 'API'}) {model.isFree ? '- FREE' : ''}
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

            {/* Input/Output Ratio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Ratio ({Math.round(inputOutputRatio * 100)}%)
              </label>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.1"
                value={inputOutputRatio}
                onChange={(e) => setInputOutputRatio(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">
                Output: {Math.round((1 - inputOutputRatio) * 100)}%
              </div>
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
                  {getCurrentModel()?.isFree ? 'FREE' : formatCurrency(calculations.monthlyCost)}
                </div>
                <div className="text-sm text-gray-600">Monthly</div>
                {!getCurrentModel()?.isFree && (
                  <>
                    <div className="text-sm text-gray-500">
                      Daily: {formatCurrency(calculations.dailyCost)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Per Request: {formatCurrency(calculations.costPerRequest)}
                    </div>
                  </>
                )}
                {getCurrentModel()?.isFree && (
                  <div className="text-sm text-green-600">
                    Self-hosted only
                  </div>
                )}
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
                  {Math.round(calculations.ramGB)}GB
                </div>
                <div className="text-sm text-gray-600">
                  {getCurrentModel()?.isFree ? 'RAM Required' : 'Est. RAM'}
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Parameters</div>
                <div className="font-medium">{getCurrentModel()?.parameters || 'API Model'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Context Length</div>
                <div className="font-medium">{formatNumber(getCurrentModel()?.contextLength || 0)} tokens</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Input Cost</div>
                <div className="font-medium">
                  {getCurrentModel()?.isFree ? 'FREE' : formatCurrency(getCurrentModel()?.inputCostPer1MTokens || 0)}/1M
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Output Cost</div>
                <div className="font-medium">
                  {getCurrentModel()?.isFree ? 'FREE' : formatCurrency(getCurrentModel()?.outputCostPer1MTokens || 0)}/1M
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">Hardware Type</div>
              <div className="font-medium">{getCurrentModel()?.hardware}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
