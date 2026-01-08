import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Activity, AlertTriangle, CheckCircle, Download, 
  Search, ArrowRight, ShieldAlert, FileCheck, ClipboardList,
  Maximize2, ArrowUpRight, Copy, AlertCircle, RefreshCw,
  HelpCircle, ChevronDown, Check, Edit3, Flag, File,
  Database, Clock, ChevronRight, Table, ArrowRightCircle,
  History, ShieldCheck, XCircle, Save, BrainCircuit,
  Briefcase, Lock, Signal
} from 'lucide-react';
import { useApp, Obligation } from '../App';

// --- Utility: Banker Label Mapping ---
const getBankerLabel = (changeType: string) => {
    switch (changeType) {
        case 'ThresholdChanged': return 'Covenant Tightened';
        case 'FrequencyChanged': return 'Reporting Cadence Increased';
        case 'DefinitionChanged': return 'Definition Expanded';
        case 'DeadlineChanged': return 'Deadline Accelerated';
        case 'ConsequentialUpdate': return 'Consequential Update';
        case 'PartyChanged': return 'Restriction Added';
        case 'TransferRestriction': return 'Transfer Restriction Added';
        case 'OperationalMandate': return 'Ops Mandate: Digital Delivery';
        case 'Added': return 'New Provision';
        case 'Removed': return 'Deleted Provision';
        default: return changeType.replace(/([A-Z])/g, ' $1').trim();
    }
};

// --- Utility: Generate Evidence HTML ---
const generateEvidenceHtml = (data: any, baseText: string, amendmentText: string) => {
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    // Filter Critical/High changes for the "Radar" section
    const materialChanges = data.changeEvents.filter((c: any) => c.materialityScore >= 40);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Amendment Radar - Evidence Pack</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
            
            body { font-family: 'Inter', sans-serif; color: #1e293b; line-height: 1.5; margin: 0; padding: 40px; background: #fff; }
            .container { max-width: 900px; margin: 0 auto; }
            
            /* Typography */
            h1, h2, h3 { font-family: 'Playfair Display', serif; color: #0f172a; margin-bottom: 0.5em; }
            h1 { font-size: 32px; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 20px; }
            h2 { font-size: 20px; margin-top: 30px; background: #f1f5f9; padding: 8px 12px; border-left: 4px solid #5c5f94; }
            h3 { font-size: 16px; font-weight: 700; color: #475569; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
            p { font-size: 14px; margin-bottom: 12px; }
            
            /* Header Stats */
            .header-meta { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
            .risk-badge { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 12px; }
            
            /* Tables */
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
            th { text-align: left; background: #f8fafc; padding: 10px; border-bottom: 2px solid #e2e8f0; font-weight: 600; color: #475569; }
            td { padding: 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            .col-score { width: 80px; text-align: right; }
            
            /* Visual Diff */
            .diff-old { background: #fef2f2; color: #b91c1c; text-decoration: line-through; padding: 2px 4px; border-radius: 2px; }
            .diff-new { background: #f0fdf4; color: #15803d; font-weight: 600; padding: 2px 4px; border-radius: 2px; }
            
            /* Checklist */
            .checklist-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; page-break-inside: avoid; }
            .checkbox { width: 16px; height: 16px; border: 1px solid #cbd5e1; border-radius: 3px; margin-top: 3px; }
            
            /* Provenance */
            .citation { font-family: 'Times New Roman', serif; font-style: italic; color: #334155; background: #fffbeb; padding: 8px; border-left: 2px solid #fcd34d; margin-bottom: 8px; font-size: 13px; page-break-inside: avoid; }
            
            /* Print Specifics */
            @media print {
                body { padding: 0; }
                .no-print { display: none; }
                h2 { page-break-after: avoid; }
                tr { page-break-inside: avoid; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header-meta">
                <div>
                    <strong>LMA AMENDMENT RADAR</strong><br>
                    Generated: ${date} at ${time}<br>
                    Analyst: J. Doe (Operations)
                </div>
                <div style="text-align: right;">
                    <strong>Document:</strong> Amendment No. 3<br>
                    <strong>Base Ref:</strong> Credit Facilities Agreement<br>
                    <strong>Audit ID:</strong> #${Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
            </div>

            <h1>Trade-Ready Evidence Pack</h1>

            <!-- 1. EXECUTIVE SUMMARY -->
            <div class="section">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Executive Summary</h2>
                    <span class="risk-badge">Material Risk Detected</span>
                </div>
                <p style="font-size: 16px; font-weight: 500; line-height: 1.6;">
                    ${data.evidencePack.executiveSummary}
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 20px; background: #f8fafc; padding: 15px; border-radius: 6px;">
                    <div>
                        <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">Material Changes</div>
                        <div style="font-size: 24px; font-weight: 700; color: #0f172a;">${materialChanges.length}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">New Obligations</div>
                        <div style="font-size: 24px; font-weight: 700; color: #0f172a;">${data.obligations.length}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">Transferability</div>
                        <div style="font-size: 24px; font-weight: 700; color: #059669;">Unrestricted</div>
                    </div>
                </div>
            </div>

            <!-- 2. MATERIAL CHANGES RADAR -->
            <div class="section">
                <h2>I. Material Changes "Radar"</h2>
                <p style="color: #64748b; font-style: italic;">Comparison of economic and operational terms against Base Agreement.</p>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 15%;">Category</th>
                            <th style="width: 25%;">Pre-Amendment</th>
                            <th style="width: 25%;">Amended Position</th>
                            <th style="width: 25%;">Impact / Rationale</th>
                            <th class="col-score">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${materialChanges.map((change: any) => `
                        <tr>
                            <td><strong>${getBankerLabel(change.changeType)}</strong></td>
                            <td><span class="diff-old">${change.beforeText}</span></td>
                            <td><span class="diff-new">${change.afterText}</span></td>
                            <td>${change.rationale}</td>
                            <td class="col-score"><strong>${change.materialityScore}</strong></td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- 3. BOOKING INSTRUCTIONS -->
            <div class="section">
                <h2>II. Booking Instructions (Obligations)</h2>
                <p style="color: #64748b; font-style: italic;">Required updates for Covenant Compliance Module (WSO/LoanIQ).</p>
                <table>
                    <thead>
                        <tr>
                            <th>Verify</th>
                            <th>Obligation</th>
                            <th>Owner</th>
                            <th>Target / Ratio</th>
                            <th>Frequency</th>
                            <th>Next Due Date Logic</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.obligations.map((obl: any) => `
                        <tr>
                            <td style="width: 30px;"><div class="checkbox"></div></td>
                            <td>
                                <strong>${obl.obligationType}</strong><br>
                                <span style="font-size: 11px; color: #64748b;">${obl.category}</span>
                            </td>
                            <td>${obl.owner || 'Borrower'}</td>
                            <td style="font-family: monospace;">${obl.target}</td>
                            <td>${obl.frequency}</td>
                            <td>${obl.dueDate}</td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- 4. TRADE READINESS -->
            <div class="section">
                <h2>III. Trade Readiness (Secondary)</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h3>Transferability</h3>
                        <div class="checklist-item">
                            <div class="checkbox"></div>
                            <div><strong>Consent Required:</strong> ${data.derivativeAnalysis?.consentMapSummary?.required || 'Standard'}</div>
                        </div>
                        <div class="checklist-item">
                            <div class="checkbox"></div>
                            <div><strong>Min Hold Amount:</strong> $1,000,000 (Unchanged)</div>
                        </div>
                    </div>
                     <div>
                        <h3>Economics</h3>
                         <div class="checklist-item">
                            <div class="checkbox"></div>
                            <div><strong>Transfer Fee:</strong> £3,500 (Standard)</div>
                        </div>
                        <div class="checklist-item">
                            <div class="checkbox"></div>
                            <div><strong>Margin Ratchet:</strong> Linked to ESG KPI (Scope 3 added).</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 5. ANNEX -->
            <div class="section">
                <h2>Annex: Legal Provenance</h2>
                <p style="color: #64748b; font-style: italic;">Source text citations for audit defensibility.</p>
                ${data.obligations.map((obl: any) => `
                <div class="citation">
                    <strong>[${obl.provenance.doc} - ${obl.provenance.sectionRef}]</strong><br>
                    "${obl.provenance.clauseText}"
                </div>
                `).join('')}
            </div>

        </div>
        <script>
            window.print();
        </script>
    </body>
    </html>
    `;
};


// --- 1. Home Screen ---
export const HomeScreen = () => {
    const navigate = useNavigate();
    const { baseText, amendmentText, setBaseText, setAmendmentText, loadDemoDocs, runAnalysis } = useApp();

    const handleAnalyze = () => {
        if (!baseText || !amendmentText) {
            alert("Please provide both Base Agreement and Amendment text.");
            return;
        }
        runAnalysis();
        navigate('/analyzing');
    };

    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                    Amendment Radar
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-lg">
                    Automated change detection for syndicated loan agreements.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 flex-grow">
                {/* Base Agreement */}
                <div className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:shadow-lg ring-1 ring-transparent focus-within:ring-primary focus-within:ring-2">
                    <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FileText className="text-slate-400 w-4 h-4" />
                            <h2 className="font-display font-semibold text-slate-700 dark:text-slate-200">Base Agreement</h2>
                        </div>
                        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 transition-colors">
                           <Copy className="w-3 h-3" /> Paste
                        </button>
                    </div>
                    <div className="flex-grow relative">
                        <textarea 
                            value={baseText}
                            onChange={(e) => setBaseText(e.target.value)}
                            className="w-full h-full min-h-[400px] p-6 bg-transparent border-0 focus:ring-0 text-sm font-mono text-slate-600 dark:text-slate-300 resize-none placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none" 
                            placeholder="Paste the original credit agreement text here..."
                        ></textarea>
                    </div>
                </div>
                {/* Amendment */}
                <div className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:shadow-lg ring-1 ring-transparent focus-within:ring-primary focus-within:ring-2">
                    <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Edit3 className="text-slate-400 w-4 h-4" />
                            <h2 className="font-display font-semibold text-slate-700 dark:text-slate-200">Amendment Draft</h2>
                        </div>
                        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 transition-colors">
                           <Copy className="w-3 h-3" /> Paste
                        </button>
                    </div>
                    <div className="flex-grow relative">
                        <textarea 
                            value={amendmentText}
                            onChange={(e) => setAmendmentText(e.target.value)}
                            className="w-full h-full min-h-[400px] p-6 bg-transparent border-0 focus:ring-0 text-sm font-mono text-slate-600 dark:text-slate-300 resize-none placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none" 
                            placeholder="Paste the proposed amendment text here..."
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6 mt-auto pb-10">
                {(!baseText || !amendmentText) && (
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 animate-pulse">
                        <Maximize2 className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-widest">Awaiting Input</span>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button 
                        onClick={loadDemoDocs}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border-light dark:border-border-dark text-slate-600 dark:text-slate-300 font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all shadow-sm">
                        <FileText className="w-4 h-4" />
                        Load Demo Docs
                    </button>
                    <button 
                        onClick={handleAnalyze}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold bg-primary hover:bg-indigo-700 dark:bg-primary dark:hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5">
                        <Activity className="w-4 h-4" />
                        Analyze Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

// --- 2. Analyzing Screen ---
export const AnalyzingScreen = () => {
    const navigate = useNavigate();
    const { analysisData, error, isAnalyzing } = useApp();

    useEffect(() => {
        if (error) {
            navigate('/error');
        } else if (analysisData) {
            navigate('/analysis');
        }
    }, [analysisData, error, navigate]);

    // Safety fallback: if user navigates here directly without analysis running or data
    useEffect(() => {
        if (!isAnalyzing && !analysisData && !error) {
            const timer = setTimeout(() => navigate('/'), 200);
            return () => clearTimeout(timer);
        }
    }, [isAnalyzing, analysisData, error, navigate]);

    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex-grow flex flex-col items-center justify-center py-24">
                 {/* Radar Animation */}
                <div className="relative w-64 h-64 mb-8">
                    <div className="absolute inset-0 border border-slate-200 dark:border-slate-700 rounded-full"></div>
                    <div className="absolute inset-8 border border-slate-200 dark:border-slate-700 rounded-full"></div>
                    <div className="absolute inset-16 border border-slate-200 dark:border-slate-700 rounded-full"></div>
                    
                    {/* Spinning Gradient */}
                    <div className="absolute inset-0 rounded-full overflow-hidden animate-spin-slow origin-center">
                        <div className="w-1/2 h-1/2 absolute top-0 right-0 bg-gradient-to-t from-primary/0 to-primary/30 backdrop-blur-sm"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="h-20 w-20 bg-surface-light dark:bg-surface-dark rounded-full shadow-xl flex items-center justify-center border border-border-light dark:border-border-dark">
                            <Search className="text-primary w-10 h-10 animate-pulse" />
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-3">Analyzing Documents</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md text-center text-lg mb-10">
                    Comparing Base Agreement vs. Amendment using Gemini 3...
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-md space-y-4">
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 rounded-full animate-shimmer"></div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Extracting Clauses...</span>
                        <span className="font-mono">Processing</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

// --- 3. Analysis Dashboard ---
export const AnalysisScreen = () => {
    const navigate = useNavigate();
    const { analysisData } = useApp();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showConsequential, setShowConsequential] = useState(false);

    // If accessed directly without data
    if (!analysisData) return <div className="p-10 text-center">No analysis data found. Go to Home.</div>;

    const changes = analysisData.changeEvents.filter((c:any) => c.changeType !== 'ConsequentialUpdate');
    const consequentialChanges = analysisData.changeEvents.filter((c:any) => c.changeType === 'ConsequentialUpdate');

    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Analysis Complete</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                        Amendment Analysis
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/ledger')}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all">
                        <Table className="w-5 h-5" /> View Obligation Ledger
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* List View */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden flex-grow flex flex-col">
                <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-white dark:bg-slate-800">
                    <h2 className="text-lg font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <ClipboardList className="text-primary w-5 h-5" />
                        Material Changes Detected ({changes.length})
                    </h2>
                </div>
                <div className="divide-y divide-border-light dark:divide-border-dark">
                    {changes.map((change: any) => (
                        <div key={change.id} className="group bg-slate-50/50 dark:bg-slate-800/30">
                            <div 
                                onClick={() => setExpandedId(expandedId === change.id ? null : change.id)}
                                className="p-5 flex items-center gap-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    <div className={`p-2 rounded-lg ${change.materialityScore > 80 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex-grow grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-12 md:col-span-5">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{getBankerLabel(change.changeType)}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{change.provenance.sectionRef}</p>
                                    </div>
                                    <div className="col-span-12 md:col-span-7 flex items-center justify-end gap-3">
                                         <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md shadow-sm">
                                            <Activity className="w-3.5 h-3.5 text-primary" />
                                            Impact: {change.materialityScore}/100
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md shadow-sm">
                                            <BrainCircuit className="w-3.5 h-3.5 text-emerald-500" />
                                            Confidence: {Math.round(change.confidence * 100)}%
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedId === change.id ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {/* Expanded Details */}
                            {expandedId === change.id && (
                                <div className="px-5 pb-6 border-t border-border-light dark:border-border-dark bg-white dark:bg-slate-900/50">
                                    <div className="mt-4 mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-blue-900/30">
                                        <strong className="block mb-1 text-xs uppercase tracking-wider text-blue-700 dark:text-blue-300">Why It Matters</strong>
                                        {change.rationale}
                                    </div>
                                    <div className="grid grid-cols-2 gap-0 border border-border-light dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
                                        <div className="bg-red-50/50 dark:bg-red-900/10 p-4 border-r border-border-light dark:border-border-dark">
                                            <div className="text-[10px] uppercase font-bold text-red-600/70 mb-2 tracking-wider">Before</div>
                                            <p className="font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                                                {change.beforeText}
                                            </p>
                                        </div>
                                        <div className="bg-green-50/50 dark:bg-green-900/10 p-4">
                                            <div className="text-[10px] uppercase font-bold text-green-600/70 mb-2 tracking-wider">After</div>
                                            <p className="font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                                                {change.afterText}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {/* Consequential Updates Group */}
                    {consequentialChanges.length > 0 && (
                        <div className="bg-slate-50/50 dark:bg-slate-800/30">
                             <div 
                                onClick={() => setShowConsequential(!showConsequential)}
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-t border-dashed border-slate-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500">
                                        <RefreshCw className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        Consequential Updates ({consequentialChanges.length})
                                    </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showConsequential ? 'rotate-180' : ''}`} />
                            </div>
                             {showConsequential && (
                                <div className="divide-y divide-border-light dark:divide-border-dark border-t border-border-light">
                                    {consequentialChanges.map((change: any) => (
                                         <div key={change.id} className="p-4 pl-12 bg-slate-50 dark:bg-slate-900/20 text-xs text-slate-500">
                                             <div className="flex justify-between">
                                                <strong>{change.provenance.sectionRef}</strong>
                                                <span>{change.rationale}</span>
                                             </div>
                                         </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

// --- 4. Ledger Screen ---
export const LedgerScreen = () => {
    const navigate = useNavigate();
    const { analysisData, updateObligation } = useApp();
    const [selectedObligationId, setSelectedObligationId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<Obligation>>({});

    // Safe access
    const obligations = analysisData?.obligations || [];

    // Filter logic
    const filteredObligations = obligations.filter((o: any) => 
        o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedObligation = obligations.find((o: any) => o.id === selectedObligationId) || obligations[0];

    useEffect(() => {
        if (obligations.length > 0 && !selectedObligationId) {
            setSelectedObligationId(obligations[0].id);
        }
    }, [obligations, selectedObligationId]);

    // Reset edit mode when selection changes
    useEffect(() => {
        setIsEditing(false);
        if (selectedObligation) {
            setEditForm(selectedObligation);
        }
    }, [selectedObligationId, selectedObligation]);

    const handleVerify = () => {
        if (!selectedObligationId) return;
        updateObligation(selectedObligationId, { status: 'VERIFIED' }, "Verified accuracy against source");
    };

    const handleFlag = () => {
        if (!selectedObligationId) return;
        updateObligation(selectedObligationId, { status: 'FLAGGED' }, "Flagged for Legal Counsel review");
    };

    const handleSaveEdit = () => {
        if (!selectedObligationId) return;
        updateObligation(selectedObligationId, editForm, `Updated parameters manually`);
        setIsEditing(false);
    };

    if (!analysisData) return <div className="p-10 text-center">No analysis data found. Go to Home.</div>;

    const StatusBadge = ({ status }: { status: string }) => {
        if (status === 'VERIFIED') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-100 text-green-700 border border-green-200"><ShieldCheck className="w-3 h-3" /> Verified</span>;
        if (status === 'FLAGGED') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-700 border border-orange-200"><Flag className="w-3 h-3" /> Under Review</span>;
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-500 border border-slate-200">Pending Review</span>;
    };

    return (
        <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
            <div className="flex justify-between items-end mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                        Obligation Ledger
                    </h1>
                    <p className="text-sm text-slate-500">Live view of operational requirements extracted from the amended agreement.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate('/evidence')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all">
                        <CheckCircle className="w-4 h-4" /> Finalize & Evidence
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0 pb-6">
                {/* Table Area */}
                <div className="flex-grow bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-col overflow-hidden">
                    <div className="px-5 py-3 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50/50">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-1.5 text-slate-400 w-4 h-4" />
                            <input 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-3 py-1.5 text-sm border border-border-light rounded-lg focus:ring-primary focus:border-primary bg-white w-full shadow-sm placeholder-slate-400" 
                                placeholder="Search obligations..." 
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="overflow-auto custom-scroll flex-grow bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="w-8 py-3 px-4 border-b border-border-light"></th>
                                    {['Category', 'Obligation', 'Owner', 'Target', 'Freq', 'Due'].map(h => (
                                        <th key={h} className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-border-light">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light">
                                {filteredObligations.map((obl: any) => (
                                    <tr 
                                        key={obl.id}
                                        onClick={() => setSelectedObligationId(obl.id)}
                                        className={`group cursor-pointer transition-colors border-l-4 ${selectedObligationId === obl.id ? 'bg-indigo-50/60 border-l-primary' : 'hover:bg-slate-50 border-l-transparent'}`}
                                    >
                                        <td className="py-3 px-4">
                                            {obl.status === 'VERIFIED' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                                            {obl.status === 'FLAGGED' && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
                                            {obl.status === 'PENDING' && <div className="w-2 h-2 rounded-full bg-slate-300"></div>}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-slate-700">{obl.category}</td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm font-medium text-slate-900">{obl.obligationType}</div>
                                            <div className="text-xs text-slate-500 truncate max-w-[180px]">{obl.description}</div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-600">{obl.owner || 'Borrower'}</td>
                                        <td className="py-3 px-4 text-sm text-slate-700 font-mono">{obl.target}</td>
                                        <td className="py-3 px-4 text-sm text-slate-600">{obl.frequency}</td>
                                        <td className="py-3 px-4 text-sm text-slate-600">{obl.dueDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Panel */}
                {selectedObligation && (
                    <div className="w-full lg:w-[450px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-border-light flex justify-between items-start bg-slate-50/50">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="text-xs font-bold text-primary uppercase tracking-wide">Obligation Details</div>
                                    <StatusBadge status={selectedObligation.status} />
                                </div>
                                <h2 className="font-display font-semibold text-xl text-slate-900">{selectedObligation.obligationType}</h2>
                            </div>
                        </div>

                        <div className="flex-grow overflow-auto custom-scroll p-6 space-y-6 bg-white">
                            
                            {/* Provenance Box (Always Visible) */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                    <FileText className="text-primary w-4 h-4" /> Legal Provenance
                                </h3>
                                <div className="text-sm font-serif text-slate-700 leading-relaxed italic bg-amber-50/50 p-4 rounded-lg border border-amber-100/50 shadow-sm relative">
                                    <div className="absolute top-2 right-2 text-amber-200/50"><FileCheck className="w-12 h-12" /></div>
                                    "{selectedObligation.provenance.clauseText}"
                                    <div className="mt-3 pt-2 border-t border-amber-200/30 flex flex-col gap-1">
                                        <div className="flex justify-between text-xs font-sans not-italic font-bold text-slate-400">
                                            <span>Source: {selectedObligation.provenance.doc}</span>
                                            <span>Ref: {selectedObligation.provenance.sectionRef}</span>
                                        </div>
                                        {selectedObligation.evidenceStrength && (
                                            <div className="text-[10px] font-bold text-amber-600 uppercase text-right">
                                                Evidence Strength: {selectedObligation.evidenceStrength}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Editable Form Area */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                     <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                        <Database className="text-primary w-4 h-4" /> Operational Data
                                    </h3>
                                    {!isEditing && selectedObligation.status !== 'VERIFIED' && (
                                        <button onClick={() => setIsEditing(true)} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                                            <Edit3 className="w-3 h-3" /> Edit Parameters
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-slate-500 uppercase">Description</label>
                                        {isEditing ? (
                                            <textarea 
                                                value={editForm.description} 
                                                onChange={e => setEditForm({...editForm, description: e.target.value})}
                                                className="w-full text-sm p-2 border border-slate-300 rounded-md focus:ring-primary focus:border-primary"
                                                rows={2}
                                            />
                                        ) : (
                                            <div className="text-sm font-medium text-slate-800">{selectedObligation.description}</div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500 uppercase">Category</label>
                                            {isEditing ? (
                                                 <select 
                                                    value={editForm.category}
                                                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                                                    className="w-full text-sm p-2 border border-slate-300 rounded-md"
                                                >
                                                    {['Financial', 'Reporting', 'Definitions', 'ESG', 'Transfer', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            ) : (
                                                <div className="text-sm font-medium text-slate-800">{selectedObligation.category}</div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500 uppercase">Owner</label>
                                            {isEditing ? (
                                                <input 
                                                    value={editForm.owner || "Borrower"} 
                                                    onChange={e => setEditForm({...editForm, owner: e.target.value as any})}
                                                    className="w-full text-sm p-2 border border-slate-300 rounded-md"
                                                />
                                            ) : (
                                                <div className="text-sm font-medium text-slate-800">{selectedObligation.owner || "Borrower"}</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500 uppercase">Frequency</label>
                                            {isEditing ? (
                                                <input 
                                                    value={editForm.frequency} 
                                                    onChange={e => setEditForm({...editForm, frequency: e.target.value})}
                                                    className="w-full text-sm p-2 border border-slate-300 rounded-md"
                                                />
                                            ) : (
                                                <div className="text-sm font-medium text-slate-800">{selectedObligation.frequency}</div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-slate-500 uppercase">Due Date Logic</label>
                                            {isEditing ? (
                                                <input 
                                                    value={editForm.dueDate} 
                                                    onChange={e => setEditForm({...editForm, dueDate: e.target.value})}
                                                    className="w-full text-sm p-2 border border-slate-300 rounded-md"
                                                />
                                            ) : (
                                                <div className="text-sm font-medium text-slate-800">{selectedObligation.dueDate}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                             {/* Audit Trail */}
                            <div className="pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1">
                                    <History className="w-3 h-3" /> Audit History
                                </h3>
                                <div className="space-y-3 pl-1">
                                    {selectedObligation.auditTrail && selectedObligation.auditTrail.length > 0 ? (
                                        selectedObligation.auditTrail.map((log, i) => (
                                            <div key={i} className="flex gap-3 text-xs group">
                                                <div className="font-mono text-slate-400 border-r border-slate-200 pr-3">{log.timestamp}</div>
                                                <div>
                                                    <span className="font-semibold text-slate-700">{log.user}</span> <span className="text-slate-500">{log.action}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs text-slate-400 italic">No manual actions recorded yet.</div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Action Bar */}
                        <div className="p-5 border-t border-border-light bg-slate-50 space-y-3">
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-600 font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSaveEdit}
                                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-all flex justify-center items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={handleFlag}
                                            disabled={selectedObligation.status === 'FLAGGED'}
                                            className="w-full bg-white hover:bg-orange-50 border border-border-light text-slate-600 hover:text-orange-700 hover:border-orange-200 font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Flag className="w-4 h-4" /> Flag for Counsel
                                        </button>
                                        <button 
                                            onClick={handleVerify}
                                            disabled={selectedObligation.status === 'VERIFIED'}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-all flex justify-center items-center gap-2 disabled:bg-emerald-800 disabled:opacity-80"
                                        >
                                            <ShieldCheck className="w-4 h-4" /> 
                                            {selectedObligation.status === 'VERIFIED' ? 'Verified' : 'Verify & Lock'}
                                        </button>
                                    </div>
                                    <div className="text-[10px] text-center text-slate-400">
                                        Click "Verify & Lock" to confirm this data for WSO/LoanIQ entry.
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

// --- 5. Evidence Pack Screen ---
export const EvidencePackScreen = () => {
    const navigate = useNavigate();
    const { analysisData, baseText, amendmentText } = useApp();

    if (!analysisData) return <div className="p-10 text-center">No analysis data found. Go to Home.</div>;

    const { evidencePack, derivativeAnalysis } = analysisData;

    const handleExportHtml = () => {
        const html = generateEvidenceHtml(analysisData, baseText, amendmentText);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
        } else {
            alert('Please allow popups to download the Evidence Pack.');
        }
    };

    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col">
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide uppercase border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Analysis Complete
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Evidence Pack</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/analysis')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-light border border-border-light text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                        <Edit3 className="w-4 h-4" /> Edit Analysis
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
                <div className="lg:col-span-8 space-y-6">
                     {/* Banker Insights Panel */}
                     {derivativeAnalysis && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light p-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Operational Delta
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-medium text-slate-700">Net New Deliverables</span>
                                        <span className="text-xl font-bold text-slate-900">+{derivativeAnalysis.operationalDeltaSummary.newDeliverablesPerYear}/yr</span>
                                    </div>
                                    <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="font-semibold mb-1">Impact Sources:</div>
                                        <ul className="list-disc pl-4 space-y-1">
                                            {derivativeAnalysis.operationalDeltaSummary.netNewBurden.map((item:string, i:number) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light p-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                                    <Signal className="w-4 h-4" /> Risk Signals
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-2 rounded bg-red-50/50">
                                        <span className="text-sm font-medium text-slate-700">Control Risk</span>
                                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700">{derivativeAnalysis.riskSignals.controlRisk}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded bg-orange-50/50">
                                        <div>
                                            <span className="block text-sm font-medium text-slate-700">Data Feasibility</span>
                                            {derivativeAnalysis.riskSignals.dataFeasibility === 'Low' && (
                                                <span className="text-[10px] text-orange-600 font-medium italic">Low = Hard to evidence</span>
                                            )}
                                        </div>
                                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-700">{derivativeAnalysis.riskSignals.dataFeasibility}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                     )}

                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-light">
                            <div className="p-2 rounded-lg bg-indigo-50 text-primary"><FileText className="w-5 h-5"/></div>
                            <h2 className="text-lg font-display font-bold text-slate-800 dark:text-white">Executive Summary</h2>
                        </div>
                        <div className="prose prose-sm text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {evidencePack.executiveSummary}
                        </div>
                    </div>
                    
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6">
                         <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-light">
                            <div className="p-2 rounded-lg bg-red-50 text-red-600"><ShieldAlert className="w-5 h-5"/></div>
                            <h2 className="text-lg font-display font-bold text-slate-800 dark:text-white">Key Risks Detected</h2>
                        </div>
                        <ul className="space-y-3">
                            {evidencePack.keyRisks.map((risk: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">{risk}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light p-6 sticky top-24">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 font-display">Export Options</h3>
                        <div className="space-y-3">
                            <button onClick={handleExportHtml} className="w-full group flex items-center justify-between p-4 rounded-xl border border-border-light bg-white hover:border-secondary transition-all shadow-sm cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-secondary flex items-center justify-center"><Download className="w-5 h-5"/></div>
                                    <div className="text-left">
                                        <div className="font-bold text-slate-800 text-sm">Export HTML</div>
                                        <div className="text-xs text-slate-500">Interactive Web Archive</div>
                                    </div>
                                </div>
                            </button>
                            <button className="w-full group flex items-center justify-between p-4 rounded-xl border border-border-light bg-white hover:border-primary transition-all shadow-sm cursor-not-allowed opacity-60">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-primary flex items-center justify-center"><File className="w-5 h-5"/></div>
                                    <div className="text-left">
                                        <div className="font-bold text-slate-800 text-sm">Export PDF</div>
                                        <div className="text-xs text-slate-500">Print-ready Report</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

// --- 6. Error Screen ---
export const ErrorScreen = () => {
    const navigate = useNavigate();
    const { error } = useApp();
    
    return (
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
             <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
                <ShieldAlert className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Analysis Failed</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                {error || "We encountered an error while analyzing your documents. Please try again or check your API key configuration."}
            </p>
            <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
            >
                Return Home
            </button>
        </main>
    );
};