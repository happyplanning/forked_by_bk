import React from 'react';

interface DummyPageProps {
  title: string;
}

export function DummyPage({ title }: DummyPageProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">이 페이지는 현재 개발 중입니다.</p>
      </div>
    </div>
  );
}