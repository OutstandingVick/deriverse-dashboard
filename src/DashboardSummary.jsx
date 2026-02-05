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

  