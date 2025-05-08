'use client';

import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Card } from "@/components/ui/card";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
  });
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
  });
  const { data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json()),
  });

  const series = [
    users?.length || 0,
    posts?.length || 0,
    comments?.length || 0,
  ];

  const options: ApexOptions = {
    chart: { type: 'bar', foreColor: '#fff', toolbar: { show: false } },
    xaxis: { categories: ['Users', 'Posts', 'Comments'], labels: { style: { colors: ['#fff', '#fff', '#fff'] } } },
    title: { text: 'App Data Overview', style: { color: '#fff', fontSize: '20px' } },
    grid: { borderColor: '#fff3', strokeDashArray: 4 },
    yaxis: { labels: { style: { colors: ['#fff'] } } },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <Card className="bg-white/10 border-white/20 p-6">
        <Chart
          options={options}
          series={[{ data: series, name: 'Count' }]}
          type="bar"
          width={500}   // <-- Use a number here
          height={350}
        />
      </Card>
    </div>
  );
}