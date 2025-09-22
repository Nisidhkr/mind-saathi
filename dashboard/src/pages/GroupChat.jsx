import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function GroupChat() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  useEffect(() => {
    // Load the group chat app in an iframe
    const iframe = document.getElementById('group-chat-iframe');
    if (iframe && email) {
      iframe.src = `http://localhost:3003/home?email=${encodeURIComponent(email)}`;
    }
  }, [email]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        id="group-chat-iframe"
        src={`http://localhost:3003/home?email=${encodeURIComponent(email || '')}`}
        className="w-full h-full border-0"
        title="Group Chat"
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
}
