import React from 'react';

interface AppProps {
  version?: string;
}

export const App: React.FC<AppProps> = ({ version = '0.0.1' }) => {
  return (
    <div
      style={{
        padding: '16px',
        minWidth: '300px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <header style={{ marginBottom: '16px' }}>
        <h1
          style={{
            fontSize: '18px',
            margin: '0 0 8px 0',
            color: '#333',
          }}
        >
          Kingdom Pilot
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#666',
          }}
        >
          v{version} - MyLands Assistant
        </p>
      </header>

      <main>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '12px',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px' }}>
            Extension is active and intercepting game responses.
          </p>
        </div>

        <div style={{ fontSize: '12px', color: '#666' }}>
          <p style={{ margin: '0 0 4px 0' }}>
            Open browser console to view logs
          </p>
          <p style={{ margin: 0 }}>
            Visit MyLands website to start monitoring
          </p>
        </div>
      </main>
    </div>
  );
};
