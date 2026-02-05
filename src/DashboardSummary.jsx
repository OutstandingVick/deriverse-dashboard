import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Percent, Zap } from 'lucide-react';

const DashboardSummary = ({ trades }) => {
  // 1. Calculate Aggregated Metrics
  const stats = useMemo(() => {
    const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
    const wins = trades.filter(t => t.pnl > 0);
    const winRate = (wins.length / trades.length) * 100;
    const totalVolume = trades.reduce((acc, t) => acc + t.size, 0);
    const totalFees = trades.reduce((acc, t) => acc + t.fees, 0);
    
    return { totalPnL, winRate, totalVolume, totalFees, count: trades.length };
  }, [trades]);

  return (
    <div className="p-8 bg-black min-h-screen text-slate-200">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Performance Overview</h2>
          <h1 className="text-4xl font-bold mt-2">Deriverse Analytics</h1>
        </div>
        <div className="flex gap-4">
          <DateRangeSelector />
          <button className="bg-emerald-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-500 transition-all">Export CSV</button>
        </div>
      </header>

      {/* Top Row: Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total PnL" value={`$${stats.totalPnL.toLocaleString()}`} change="+12.5%" isPositive={true} />
        <StatCard title="Win Rate" value={`${stats.winRate.toFixed(1)}%`} icon={<Percent size={20}/>} />
        <StatCard title="Total Volume" value={`$${(stats.totalVolume / 1000).toFixed(1)}k`} icon={<Activity size={20}/>} />
        <StatCard title="Net Fees" value={`$${stats.totalFees.toFixed(2)}`} icon={<Zap size={20}/>} color="text-amber-500" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Equity Curve */}
        <div className="col-span-12 lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Historical PnL & Drawdown</h3>
            <div className="flex gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400"/> Equity</span>
              <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"/> Drawdown</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `$${val}`} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                <Area type="monotone" dataKey="cumulativePnL" stroke="#10b981" fill="url(#pnlGradient)" strokeWidth={3} />
                <defs>
                  <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>