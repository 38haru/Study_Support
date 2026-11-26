
// 外部コンポーネントとスタイルの読み込み
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import SubjectFolders from "./components/SubjectFolders";
import HomeDashboard from "./components/HomeDashboard";
import TimerSettings from "./components/TimerSettings";
import { subjects } from "./data/subjects";
import "./App.css";

// アニメーション時間（調整可能）
// 教科切り替え時のアニメーション時間（ミリ秒）
const subjectCardTransitionDuration = 600;

function App() {
  // 状態管理
  // 選択中の上部タブ
  const [activeTab, setActiveTab] = useState("学習状況");
  // 選択中の下部ナビゲーション
  const [activePage, setActivePage] = useState("home");
  // 教科フォルダーの表示後にホームのカードを切り替える
  const [showHomeDashboard, setShowHomeDashboard] = useState(true);
  // タイマー設定ウィンドウとタイマー状態
  const [timerSettingsOpen, setTimerSettingsOpen] = useState(false);
  const [timerMode, setTimerMode] = useState("clock");
  const [timerDuration, setTimerDuration] = useState(25 * 60);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  // 切り替えアニメーション中に退場する教科
  const [leavingSubject, setLeavingSubject] = useState(null);
  // タイマー参照
  const leavingSubjectTimer = useRef(null);
  const homeDashboardTimer = useRef(null);
  // 教科タブが選択されている場合のみ教科名を保持
  const activeSubject = subjects.some((subject) => subject.name === activeTab)
    ? activeTab
    : null;

  // ライフサイクル処理
  // コンポーネント破棄時にタイマーを解除
  useEffect(
    () => () => {
      if (leavingSubjectTimer.current) {
        window.clearTimeout(leavingSubjectTimer.current);
      }
      if (homeDashboardTimer.current) {
        window.clearTimeout(homeDashboardTimer.current);
      }
    },
    [],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());

      if (timerMode === "elapsed" && timerRunning) {
        setTimerElapsed((value) => value + 1);
      }

      if (timerMode === "countdown" && timerRunning) {
        setTimerRemaining((value) => {
          if (value <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return value - 1;
        });
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timerMode, timerRunning]);

  // ユーティリティ関数
  // 教科切り替え状態とタイマーを解除
  const clearLeavingSubject = () => {
    if (leavingSubjectTimer.current) {
      window.clearTimeout(leavingSubjectTimer.current);
      leavingSubjectTimer.current = null;
    }

    setLeavingSubject(null);
  };

  const handleTabChange = (tab) => {
    // 教科タブかどうかを判定
    const isSubject = subjects.some((subject) => subject.name === tab);
    // 別の教科タブへ切り替えるか判定
    const isSwitchingSubjects =
      isSubject && activeSubject && activeSubject !== tab;
    // 同じ教科を押してフォルダーを閉じるか判定
    const isClosingSubject = isSubject && activeSubject === tab;
    // 学習状況タブからフォルダーを開くか判定
    const isOpeningSubject = isSubject && !activeSubject;

    if (homeDashboardTimer.current) {
      window.clearTimeout(homeDashboardTimer.current);
      homeDashboardTimer.current = null;
    }

    if (isOpeningSubject) {
      // フォルダーを出し切ってからホームのカードを消す
      setShowHomeDashboard(true);
      homeDashboardTimer.current = window.setTimeout(() => {
        setShowHomeDashboard(false);
        homeDashboardTimer.current = null;
      }, subjectCardTransitionDuration);
    } else if (isClosingSubject || tab === "学習状況") {
      // フォルダーを閉じ始める前にホームのカードを表示する
      setShowHomeDashboard(true);
    } else if (isSwitchingSubjects) {
      setShowHomeDashboard(false);
    }

    if (isSwitchingSubjects) {
      // 切り替え前に残っているタイマーをクリア
      if (leavingSubjectTimer.current) {
        window.clearTimeout(leavingSubjectTimer.current);
      }

      // 退場させる教科を設定
      setLeavingSubject(activeSubject);
      // 指定時間後に退場状態を解除
      leavingSubjectTimer.current = window.setTimeout(() => {
        setLeavingSubject(null);
        leavingSubjectTimer.current = null;
      }, subjectCardTransitionDuration);
    } else {
      clearLeavingSubject();
    }

    // 同じ教科をもう一度押した場合は「学習状況」に戻る
    setActiveTab(isClosingSubject ? "学習状況" : tab);

    if (isSubject || tab === "学習状況") {
      setActivePage("home");
    }
  };

  const returnHome = () => {
    setTimerSettingsOpen(false);
    setActivePage("home");
    clearLeavingSubject();
    setActiveTab("学習状況");
    if (homeDashboardTimer.current) {
      window.clearTimeout(homeDashboardTimer.current);
      homeDashboardTimer.current = null;
    }
    setShowHomeDashboard(true);
  };

  const handleTimerModeChange = (mode) => {
    setTimerRunning(false);
    setTimerMode(mode);

    if (mode === "elapsed") {
      setTimerElapsed(0);
    } else if (mode === "countdown") {
      setTimerRemaining(timerDuration);
    }
  };

  const handleTimerDurationChange = (duration) => {
    setTimerDuration(duration);
    setTimerRemaining(duration);
  };

  const handleTimerReset = () => {
    setTimerRunning(false);
    if (timerMode === "elapsed") {
      setTimerElapsed(0);
    } else if (timerMode === "countdown") {
      setTimerRemaining(timerDuration);
    }
  };

  const handleTimerToggle = () => {
    if (timerMode === "countdown" && timerRemaining === 0) {
      setTimerRemaining(timerDuration);
    }
    setTimerRunning((running) => !running);
  };

  const timerDisplaySeconds =
    timerMode === "elapsed" ? timerElapsed :
    timerMode === "countdown" ? timerRemaining :
    0;

  // 画面構成
  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="study-stage" aria-label="学習画面">
        {showHomeDashboard && (activePage === "home" || activePage === "timer") && (
          <HomeDashboard
            timerMode={timerMode}
            timerSeconds={timerDisplaySeconds}
            currentTime={currentTime}
          />
        )}
        <SubjectFolders
          activeSubject={activeSubject}
          leavingSubject={leavingSubject}
          onSubjectChange={handleTabChange}
        />
      </main>

      <BottomNav
        activePage={activePage}
        onNavigate={(page) => {
          if (page === "home" || (page === "timer" && timerSettingsOpen)) {
            returnHome();
            return;
          }

          setActivePage(page);

          if (activeSubject) {
            setShowHomeDashboard(true);
          }

          if (page === "timer") {
            setTimerSettingsOpen((open) => !open);
          } else {
            setTimerSettingsOpen(false);
          }
        }}
      />
      {timerSettingsOpen && <TimerSettings
        open={timerSettingsOpen}
        mode={timerMode}
        durationSeconds={timerDuration}
        running={timerRunning}
        onClose={returnHome}
        onModeChange={handleTimerModeChange}
        onDurationChange={handleTimerDurationChange}
        onToggleRunning={handleTimerToggle}
        onReset={handleTimerReset}
      />}
    </>
  );
}

export default App;





