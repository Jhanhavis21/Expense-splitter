import React from 'react';

export const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{expense.title}</h3>
          <p className="text-gray-600 text-sm">{expense.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Category: <span className="font-semibold">{expense.category}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">${expense.amount.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            Paid by: <strong>{expense.paidBy?.name}</strong>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold mb-2">Split with:</p>
        <ul className="text-sm text-gray-700">
          {expense.group?.map((member, idx) => (
            <li key={idx}>
              {member.user?.name}: ${member.share?.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(expense._id)}
          className="mt-4 btn-secondary text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
};
