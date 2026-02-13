import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f59e0b 100%)',
        }}
      >
        {/* Piano keys */}
        <div
          style={{
            display: 'flex',
            width: '24px',
            height: '18px',
            background: '#ffffff',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* White key dividers */}
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ width: '4px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '4px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '4px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '4px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '4px', height: '100%', borderRight: '1px solid #d1d5db' }} />
            <div style={{ width: '4px', height: '100%' }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
