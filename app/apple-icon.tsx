import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f59e0b 100%)',
        }}
      >
        {/* Piano keys */}
        <div
          style={{
            display: 'flex',
            width: '130px',
            height: '90px',
            background: '#ffffff',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* White key dividers */}
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ width: '21.6px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '21.6px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '21.6px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '21.6px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '21.6px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '21.6px', height: '100%' }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
