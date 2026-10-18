export default function ProgressDashboard({ progress, onReset }) {
  const { level, correctStreak, totalCorrect, totalAnswered } = progress;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="dashboard-card">
      <h3>📊 Learning Progress</h3>
      <div className="metrics-grid">
        <div className="metric-box">
          <span>Level</span>
          <h2>{level} / 3</h2>
        </div>
        <div className="metric-box">
          <span>Correct Streak</span>
          <h2>🔥 {correctStreak}</h2>
        </div>
        <div className="metric-box">
          <span>Total Correct</span>
          <h2>⭐ {totalCorrect}</h2>
        </div>
        <div className="metric-box">
          <span>Accuracy</span>
          <h2>🎯 {accuracy}%</h2>
        </div>
      </div>
      <button className="reset-btn" onClick={onReset}>
        🔄 Reset Progress
      </button>
    </div>
  );
}