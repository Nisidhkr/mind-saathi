import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CommunityPosts() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  useEffect(() => {
    // Load the community posts app in an iframe
    const iframe = document.getElementById('community-posts-iframe');
    if (iframe && email) {
      iframe.src = `http://localhost:3003/posts?email=${encodeURIComponent(email)}`;
    }
  }, [email]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        id="community-posts-iframe"
        src={`http://localhost:3003/posts?email=${encodeURIComponent(email || '')}`}
        className="w-full h-full border-0"
        title="Community Posts"
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
}
