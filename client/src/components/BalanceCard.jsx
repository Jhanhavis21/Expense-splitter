import React, { useState } from 'react';

export const BalanceCard = ({ friend, owedAmount }) => {
  const [showDetails, setShowDetails] = useState(false);

  const isPositive = owedAmount > 0;
  const statusText = isPositive 
    ? `${friend.name} owes you` 
    : `You owe ${friend.name}`;

  return (
    <div className="card mb-3 border-l-4 border-blue-600">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{friend.name}</p>
          <p className="text-sm text-gray-600">{friend.email}</p>
        </div>
        <div className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <p className="text-2xl font-bold">
            ${Math.abs(owedAmount).toFixed(2)}
          </p>
          <p className="text-xs font-semibold">{statusText}</p>
        </div>
      </div>
    </div>
  );
};
