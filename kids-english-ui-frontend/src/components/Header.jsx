export default function Header({ childId, mode, level, correctStreak }) {
  const getModeBadgeColor = (currentMode) => {
    switch (currentMode) {
      case 'support': return '#ff6b6b';
      case 'engagement': return '#ffa94d';
      case 'conversation': return '#4dabf7';
      default: return '#51cf66';
    }
  };

  return (
    <header className="app-header">
      <div className="header-title">
        <h1>🌟 English Star Kids 🌟</h1>
        <p>Your friendly AI learning companion!</p>
      </div>
      <div className="header-stats">
        <div className="stat-pill">Profile: <strong>{childId}</strong></div>
        <div className="stat-pill">Level: <strong>{level}</strong></div>
        <div className="stat-pill">Streak: <strong>🔥 {correctStreak}</strong></div>
        <div className="mode-pill" style={{ backgroundColor: getModeBadgeColor(mode) }}>
          Mode: {mode.toUpperCase()}
        </div>
      </div>
    </header>
  );
}