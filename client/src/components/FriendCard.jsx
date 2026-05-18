import React, { useState } from 'react';

export const FriendCard = ({ friend, onRemove }) => {
  return (
    <div className="card mb-3 flex justify-between items-center">
      <div>
        <p className="font-semibold">{friend.name}</p>
        <p className="text-sm text-gray-600">{friend.email}</p>
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove(friend._id)}
          className="btn-secondary text-sm"
        >
          Remove
        </button>
      )}
    </div>
  );
};
