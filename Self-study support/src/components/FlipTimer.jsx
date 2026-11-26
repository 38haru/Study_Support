import "./FlipTimer.css";

function FlipDigit({ value }) {
  return (
    <span className="flip-timer-digit" aria-hidden="true">
      <span className="flip-timer-digit-base">{value}</span>
      <span key={value} className="flip-timer-digit-flap">{value}</span>
    </span>
  );
}

// 設定画面と接続するまでは、25分を表示する。
function FlipTimer({ remainingSeconds = 25 * 60, mode = "countdown", currentTime }) {
  let left;
  let right;

  if (mode === "clock") {
    const time = currentTime ?? new Date();
    left = String(time.getHours()).padStart(2, "0");
    right = String(time.getMinutes()).padStart(2, "0");
  } else {
    const displayTime = Math.max(0, Math.min(99 * 60 + 59, Math.floor(remainingSeconds)));
    left = String(Math.floor(displayTime / 60)).padStart(2, "0");
    right = String(displayTime % 60).padStart(2, "0");
  }

  return (
    <div className="flip-timer">
      <div className="flip-timer-clock" role="timer" aria-label={mode === "clock" ? `${left}時${right}分` : `${Number(left)}分${Number(right)}秒`}>
        {left.split("").map((digit, index) => <FlipDigit key={`m${index}`} value={digit} />)}
        <span className="flip-timer-colon" aria-hidden="true">:</span>
        {right.split("").map((digit, index) => <FlipDigit key={`s${index}`} value={digit} />)}
      </div>
    </div>
  );
}

export default FlipTimer;
