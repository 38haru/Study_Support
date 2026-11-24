
// 外部コンポーネントとスタイルの読み込み
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import SubjectFolders from "./components/SubjectFolders";
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
  // 切り替えアニメーション中に退場する教科
  const [leavingSubject, setLeavingSubject] = useState(null);
  // タイマー参照
  const leavingSubjectTimer = useRef(null);
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
    },
    [],
  );

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
    setActiveTab(isSubject && activeTab === tab ? "学習状況" : tab);

    if (isSubject) {
      setActivePage("home");
    }
  };

  // 画面構成
  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="study-stage" aria-label="教科学習">
        <SubjectFolders
          activeSubject={activeSubject}
          leavingSubject={leavingSubject}
          onSubjectChange={handleTabChange}
        />
      </main>

      <BottomNav
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);

          if (page === "home") {
            clearLeavingSubject();
            setActiveTab("学習状況");
          }
        }}
      />
    </>
  );
}

export default App;
