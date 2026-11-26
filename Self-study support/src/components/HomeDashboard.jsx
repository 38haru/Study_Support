import FlipTimer from "./FlipTimer";
import "./HomeDashboard.css";

function HomeDashboard({ timerMode = "clock", timerSeconds = 25 * 60, currentTime }) {
  return (
    <div className="home-dashboard" aria-label="ホーム">
      <div className="home-dashboard-main">
        <section className="dashboard-panel dashboard-planning" aria-label="予定、タイマー、目標">
          <div className="dashboard-planning-item"><h2>予定</h2></div>
          <div className="dashboard-planning-item dashboard-timer-item">
            <FlipTimer remainingSeconds={timerSeconds} mode={timerMode} currentTime={currentTime} />
          </div>
          <div className="dashboard-planning-item"><h2>目標</h2></div>
        </section>

        <section className="dashboard-panel dashboard-records" aria-labelledby="dashboard-records-title">
          <h2 id="dashboard-records-title">学習記録</h2>
        </section>
      </div>

      <section className="dashboard-panel dashboard-recommendations" aria-labelledby="dashboard-recommendations-title">
        <h2 id="dashboard-recommendations-title">おすすめ学習</h2>
      </section>
    </div>
  );
}

export default HomeDashboard;



