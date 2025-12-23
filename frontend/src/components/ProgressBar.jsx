const ProgressBar = ({ used, total }) => {
  const percent =
    total > 0 ? Math.min((used / total) * 100, 100) : 0;

  let color = '#4CAF50'; // green
  if (percent > 80) color = '#FF9800'; // orange
  if (percent >= 100) color = '#F44336'; // red

  return (
    <div style={{ width: 150 }}>
      <div
        style={{
          height: 10,
          background: '#eee',
          borderRadius: 5,
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: color,
            borderRadius: 5,
          }}
        />
      </div>
      <small>{percent.toFixed(0)}%</small>
    </div>
  );
};

export default ProgressBar;
