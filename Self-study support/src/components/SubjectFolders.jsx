import { subjects } from "../data/subjects";
import "./SubjectFolders.css";

// フォルダー位置とアニメーション設定
// ラベルの縦方向位置（調整可能）
const labelPositions = ["5%", "23%", "41%", "59%", "76%"];
// 教科タブの左右間隔（ピクセル）
const desktopTabSpacing = 52;
const mobileTabSpacing = 42;

function SubjectFolders({ activeSubject, leavingSubject, onSubjectChange }) {
  // 現在選択中の教科インデックス
  const activeIndex = subjects.findIndex(
    (subject) => subject.name === activeSubject,
  );
  const hasActiveSubject = activeIndex >= 0;
  const leavingSubjectData = subjects.find(
    (subject) => subject.name === leavingSubject,
  );

  return (
    // 教科フォルダー表示領域
    <aside className="subject-folder-dock" aria-label="教科選択">
      {leavingSubjectData && (
        // 切り替え中の退場シート
        <section
          className="subject-folder-leaving-sheet"
          aria-hidden="true"
          style={{ "--folder-color": leavingSubjectData.color }}
        />
      )}
      {subjects.map((subject, index) => {
        // 選択・退場・重なり順の状態を計算
        const isActive = subject.name === activeSubject;
        const isLeaving = subject.name === leavingSubject;
        const isTrailingTab = hasActiveSubject && index > activeIndex;
        const sheetId = `subject-sheet-${index}`;

        return (
          <div
            key={subject.name}
            className={`subject-folder-bundle ${
              isActive ? "is-active" : ""
            } ${isLeaving ? "is-leaving" : ""} ${
              isTrailingTab ? "is-trailing" : ""
            }`}
            style={{
              "--folder-color": subject.color,
              "--folder-left": `${index * desktopTabSpacing}px`,
              "--folder-left-mobile": `${index * mobileTabSpacing}px`,
              "--folder-right-target": `${
                (subjects.length - 1 - index) * desktopTabSpacing
              }px`,
              "--folder-right-target-mobile": `${
                (subjects.length - 1 - index) * mobileTabSpacing
              }px`,
              "--label-position": labelPositions[index],
              "--leading-layer": subjects.length - index + 20,
              "--trailing-layer": index + 10,
            }}
          >
            <section
              id={sheetId}
              className="subject-folder-sheet"
              aria-label={`${subject.name}のフォルダー`}
              aria-hidden={!isActive}
            />
            <button
              type="button"
              className="subject-folder"
              onClick={() => onSubjectChange?.(subject.name)}
              aria-controls={sheetId}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="subject-folder-label">{subject.name}</span>
            </button>
          </div>
        );
      })}
      {hasActiveSubject && (
        <button
          type="button"
          className="subject-folder-home-gap"
          onClick={() => onSubjectChange?.(activeSubject)}
          aria-label="ホームに戻る"
          title="ホームに戻る"
        />
      )}
    </aside>
  );
}

export default SubjectFolders;
