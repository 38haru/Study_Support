import { useState } from "react";
import "./TimerSettings.css";

const modes = [
  { value: "clock", label: "時計", description: "現在の時刻を表示" },
  { value: "elapsed", label: "時間の計測", description: "学習した時間をはかる" },
  { value: "countdown", label: "制限時間の計測", description: "設定した時間を数える" },
];

function TimerSettings({
  open,
  mode,
  durationSeconds,
  running,
  onClose,
  onModeChange,
  onDurationChange,
  onToggleRunning,
  onReset,
}) {
  const [maximized, setMaximized] = useState(false);

  if (!open) return null;

  const closeWindow = () => {
    setMaximized(false);
    onClose();
  };

  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = durationSeconds % 60;

  const updateTime = (nextHours, nextMinutes, nextSeconds) => {
    onDurationChange(
      Math.max(0, Math.min(99, nextHours)) * 3600 +
        Math.max(0, Math.min(59, nextMinutes)) * 60 +
        Math.max(0, Math.min(59, nextSeconds)),
    );
  };

  return (
    <section
      className={`timer-settings ${maximized ? "is-maximized" : ""}`}
      role="dialog"
      aria-labelledby="timer-settings-title"
      onKeyDown={(event) => { if (event.key === "Escape") closeWindow(); }}
    >
      <div className="timer-settings-header">
        <div className="timer-settings-title">
          <span className="timer-settings-window-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l3 2M9 2h6" />
            </svg>
          </span>
          <h2 id="timer-settings-title">タイマー設定</h2>
        </div>
        <div className="timer-settings-window-controls">
          <button type="button" className="timer-settings-maximize" onClick={() => setMaximized((value) => !value)} aria-label={maximized ? "元のサイズに戻す" : "最大化"} title={maximized ? "元のサイズに戻す" : "最大化"}><span aria-hidden="true">{maximized ? "❐" : "□"}</span></button>
          <button type="button" className="timer-settings-close" onClick={closeWindow} aria-label="閉じる" title="閉じる">×</button>
        </div>
      </div>

      <div className="timer-settings-body">
        <fieldset className="timer-settings-modes">
          <legend>計測方法を選ぶ</legend>
          <div className="timer-settings-mode-list">
            {modes.map((item) => (
              <label key={item.value} className={`timer-settings-mode ${mode === item.value ? "is-selected" : ""}`}>
                <input
                  type="radio"
                  name="timer-mode"
                  value={item.value}
                  checked={mode === item.value}
                  onChange={() => onModeChange(item.value)}
                />
                <span className="timer-settings-mode-text">
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="timer-settings-time">
            <p className="timer-settings-section-title">時間を設定</p>
            <div className="timer-settings-time-inputs">
              <label><span>時間</span><input type="number" min="0" max="99" inputMode="numeric" value={hours} disabled={mode !== "countdown" || running} onFocus={(event) => event.target.select()} onChange={(event) => updateTime(Number(event.target.value), minutes, seconds)} /></label>
              <span className="timer-settings-time-separator" aria-hidden="true">:</span>
              <label><span>分</span><input type="number" min="0" max="59" inputMode="numeric" value={minutes} disabled={mode !== "countdown" || running} onFocus={(event) => event.target.select()} onChange={(event) => updateTime(hours, Number(event.target.value), seconds)} /></label>
              <span className="timer-settings-time-separator" aria-hidden="true">:</span>
              <label><span>秒</span><input type="number" min="0" max="59" inputMode="numeric" value={seconds} disabled={mode !== "countdown" || running} onFocus={(event) => event.target.select()} onChange={(event) => updateTime(hours, minutes, Number(event.target.value))} /></label>
            </div>
            {mode !== "countdown" && <p className="timer-settings-hint">時間を設定するには「制限時間の計測」を選んでください。</p>}
            {mode === "countdown" && running && <p className="timer-settings-hint">時間を変更するには、一時停止してください。</p>}
        </div>

        {mode !== "clock" && (
          <div className="timer-settings-actions">
            <button type="button" className="timer-settings-start" onClick={onToggleRunning} disabled={!running && mode === "countdown" && durationSeconds === 0}>
              {running ? "一時停止" : "開始 / 再開"}
            </button>
            <button type="button" className="timer-settings-reset" onClick={onReset}>リセット</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default TimerSettings;



