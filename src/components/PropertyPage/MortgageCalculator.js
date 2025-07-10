import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaPercentage, FaInfoCircle } from 'react-icons/fa';

const EMICalculator = () => {
  const [inputs, setInputs] = useState({
    loanAmount: 1000000, // ₹10,00,000
    interestRate: 8,
    loanTenure: 5, // Default in years
    tenureUnit: 'years', // 'years' or 'months'
  });
  const [expandedSections, setExpandedSections] = useState({
    inputs: true,
  });
  const [error, setError] = useState(null);

  // Calculate EMI details
  const calculateEMI = useMemo(() => {
    const { loanAmount, interestRate, loanTenure, tenureUnit } = inputs;

    // Validation
    if (loanAmount < 50000 || loanAmount > 50000000) {
      setError('Loan amount must be between ₹50,000 and ₹5,00,00,000');
      return null;
    }
    if (interestRate < 1 || interestRate > 20) {
      setError('Interest rate must be between 1% and 20%');
      return null;
    }
    const maxTenure = tenureUnit === 'years' ? 30 : 360;
    const minTenure = tenureUnit === 'years' ? 1 : 12;
    if (loanTenure < minTenure || loanTenure > maxTenure) {
      setError(`Loan tenure must be between ${minTenure} and ${maxTenure} ${tenureUnit}`);
      return null;
    }
    setError(null);

    // Convert tenure to months
    const numberOfPayments = tenureUnit === 'years' ? loanTenure * 12 : loanTenure;
    const monthlyRate = interestRate / 100 / 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPaid = emi * numberOfPayments;
    const totalInterest = totalPaid - loanAmount;

    return {
      emi: Math.round(emi),
      yearlyPayment: Math.round(emi * 12),
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest),
      interestPercentage: ((totalInterest / totalPaid) * 100).toFixed(1),
      principalPercentage: ((loanAmount / totalPaid) * 100).toFixed(1),
    };
  }, [inputs]);

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({
      ...prev,
      [key]: key === 'tenureUnit' ? value : Number(value),
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const resetInputs = () => {
    setInputs({
      loanAmount: 1000000,
      interestRate: 8,
      loanTenure: 5,
      tenureUnit: 'years',
    });
    setError(null);
  };

  return (
    <section className="w-[800px] px-4 py-10">
      {/* Embedded CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .calculator-container {
            border: 1px solid #d1d5db;
            border-radius: 16px;
            background: white;
            padding: 2rem;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            min-width: 320px;
            max-width: 100%;
          }
          .calculator-container:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          .sticky-emi-bar {
            position: sticky;
            top: 0;
            background: #2d2d2d;
            color: white;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 10;
            margin-bottom: 1.5rem;
          }
          .emi-amount {
            font-size: clamp(1.75rem, 4vw, 2.25rem);
            font-weight: bold;
            line-height: 1.2;
            animation: pulse 3s infinite;
          }
          .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }
          .result-card {
            background: #f9fafb;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          .result-card:hover .tooltip {
            visibility: visible;
            opacity: 1;
          }
          .tooltip {
            visibility: hidden;
            opacity: 0;
            background: #2d2d2d;
            color: white;
            border-radius: 6px;
            padding: 0.5rem;
            position: absolute;
            top: -2.5rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            white-space: nowrap;
            transition: opacity 0.2s ease;
            z-index: 20;
          }
          .progress-bar {
            height: 12px;
            background: #d1d5db;
            border-radius: 6px;
            overflow: hidden;
            margin: 0.5rem 0;
          }
          .progress-bar .principal {
            height: 100%;
            background: #2d2d2d;
            width: ${calculateEMI?.principalPercentage || 0}%;
            transition: width 0.5s ease;
          }
          .progress-bar .interest {
            height: 100%;
            background: #dc2626;
            width: ${calculateEMI?.interestPercentage || 0}%;
            transition: width 0.5s ease;
          }
          .btn-primary {
            background: #2d2d2d;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
          }
          .btn-primary:hover {
            background: #3d3d3d;
            transform: translateY(-1px);
            box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
          }
          .btn-reset {
            background: #e5e7eb;
            color: #2d2d2d;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
          }
          .btn-reset:hover {
            background: #d1d5db;
            color: #1a1a1a;
            transform: translateY(-1px);
            box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3);
          }
          .section-header {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 0.75rem;
            transition: background 0.3s ease;
            cursor: pointer;
          }
          .section-header:hover {
            background: #e5e7eb;
          }
          .input-range::-webkit-slider-thumb {
            background: #2d2d2d;
            border-radius: 9999px;
            height: 16px;
            width: 16px;
            cursor: pointer;
            -webkit-appearance: none;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
          }
          .input-range::-moz-range-thumb {
            background: #2d2d2d;
            border-radius: 9999px;
            height: 16px;
            width: 16px;
            cursor: pointer;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
          }
          .input-range {
            -webkit-appearance: none;
            height: 6px;
            background: #d1d5db;
            border-radius: 9999px;
            outline: none;
            width: 100%;
            transition: background 0.3s ease;
          }
          .input-range.loan-amount::-webkit-slider-thumb {
            background: #2d2d2d;
          }
          .input-range.interest-rate::-webkit-slider-thumb {
            background: #dc2626;
          }
          .input-range.loan-tenure::-webkit-slider-thumb {
            background: #4b4b4b;
          }
          .input-range:hover {
            background: #b0b0b0;
          }
          .input-range:focus {
            box-shadow: 0 0 0 3px rgba(45, 45, 45, 0.2);
          }
          .error-message {
            color: #dc2626;
            font-size: 12px;
            margin-top: 4px;
          }
          .icon-pulse {
            animation: pulse 2s infinite;
          }
          @media (max-width: 640px) {
            .sticky-emi-bar {
              position: static;
              margin-bottom: 1rem;
            }
            .calculator-container {
              padding: 1.5rem;
            }
            .results-grid {
              grid-template-columns: 1fr;
            }
            .emi-amount {
              font-size: clamp(1.5rem, 3.5vw, 1.75rem);
            }
          }
        `}
      </style>

      {/* Calculator Container */}
      <motion.div
        className="calculator-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            EMI Calculator
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Plan your loan repayments with ease
          </p>
        </div>

        {/* Sticky EMI Bar */}
        <AnimatePresence>
          {calculateEMI && (
            <motion.div
              className="sticky-emi-bar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm uppercase tracking-wider text-gray-300">
                Monthly EMI
              </p>
              <p className="emi-amount">
                ₹{Number(calculateEMI.emi).toLocaleString('en-IN')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section (Non-Collapsible) */}
        {calculateEMI && (
          <div className="mb-6">
            <div className="results-grid">
              <div className="result-card">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  Yearly Payment
                  <FaInfoCircle className="text-gray-400" />
                  <span className="tooltip">Total amount paid annually</span>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{Number(calculateEMI.yearlyPayment).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="result-card">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  Total Interest
                  <FaInfoCircle className="text-gray-400" />
                  <span className="tooltip">Interest paid over the loan term</span>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{Number(calculateEMI.totalInterest).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="result-card">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  Total Paid
                  <FaInfoCircle className="text-gray-400" />
                  <span className="tooltip">Loan amount plus interest</span>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  ₹{Number(calculateEMI.totalPaid).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="result-card">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  Loan Breakdown
                  <FaInfoCircle className="text-gray-400" />
                  <span className="tooltip">Principal vs. Interest split</span>
                </p>
                <div className="progress-bar">
                  <div className="principal"></div>
                  <div className="interest"></div>
                </div>
                <p className="text-sm text-gray-600">
                  {calculateEMI.interestPercentage}% Interest
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="mb-6">
          <motion.div
            className="section-header flex items-center justify-between"
            onClick={() => toggleSection('inputs')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <FaRupeeSign className="text-gray-900 text-lg icon-pulse" />
              <h3 className="text-lg font-semibold text-gray-900">Input Details</h3>
            </div>
            <span className="text-sm text-gray-600">
              {expandedSections.inputs ? '−' : '+'}
            </span>
          </motion.div>
          {expandedSections.inputs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-4"
            >
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <FaRupeeSign className="text-gray-600 icon-pulse" /> Loan Amount
                </label>
                <input
                  type="range"
                  min={50000}
                  max={50000000}
                  step={10000}
                  value={inputs.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="input-range loan-amount"
                  aria-label="Loan amount in rupees"
                />
                <p className="text-sm text-gray-600 mt-1">
                  ₹{Number(inputs.loanAmount).toLocaleString('en-IN')}
                </p>
                {error && error.includes('Loan amount') && (
                  <p className="error-message">{error}</p>
                )}
              </div>
              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <FaPercentage className="text-gray-600 icon-pulse" /> Interest Rate
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="input-range interest-rate"
                  aria-label="Interest rate"
                />
                <p className="text-sm text-gray-600 mt-1">{inputs.interestRate}%</p>
                {error && error.includes('Interest rate') && (
                  <p className="error-message">{error}</p>
                )}
              </div>
              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <FaRupeeSign className="text-gray-600 icon-pulse" /> Loan Tenure
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={inputs.tenureUnit === 'years' ? 1 : 12}
                    max={inputs.tenureUnit === 'years' ? 30 : 360}
                    step={1}
                    value={inputs.loanTenure}
                    onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                    className="input-range loan-tenure"
                    aria-label="Loan tenure"
                  />
                  <select
                    value={inputs.tenureUnit}
                    onChange={(e) => handleInputChange('tenureUnit', e.target.value)}
                    className="border rounded-lg p-2 text-sm"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {inputs.loanTenure} {inputs.tenureUnit}
                </p>
                {error && error.includes('Loan tenure') && (
                  <p className="error-message">{error}</p>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <motion.button
            onClick={resetInputs}
            className="btn-reset"
            whileHover={{ scale: 1.05 }}
            aria-label="Reset inputs"
          >
            Reset
          </motion.button>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            aria-label="Calculate EMI"
          >
            Calculate
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default EMICalculator;