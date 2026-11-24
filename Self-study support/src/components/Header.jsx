// スタイルと教科データの読み込み
import "./Header.css";
import { subjects } from "../data/subjects";

// アイコンコンポーネント
function AccountIcon() {
  return (
    // アイコンサイズ（調整可能）
    <svg
      viewBox="0 0 48 48"
      width="30"
      height="30"
      aria-hidden="true"
    >
      <circle cx="24" cy="16" r="9" fill="#999999" />
      <path
        d="M7 43c0-10 7-17 17-17s17 7 17 17"
        fill="#999999"
      />
    </svg>
  );
}

function Header({ activeTab = "学習状況", onTabChange }) {
  // タブ押下時に親コンポーネントへ通知
  const handleTabClick = (tab) => {
    onTabChange?.(tab);
  };

  return (
    // ヘッダー全体
    <header className="site-header">
      {/* 上段：ロゴ、検索、アカウント */}
      <div className="site-header-top">
        <a className="site-logo" href="/" aria-label="ホーム">
          <span className="site-logo-sub">SELF STUDY</span>
          <span className="site-logo-main">自習支援</span>
        </a>

        <div className="site-header-right">
          <div className="site-search">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m16 16 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="search"
              placeholder="キーワードを入力（検討中）"
              aria-label="教材を検索"
            />
          </div>

          <button
            type="button"
            className="site-account"
            aria-label="アカウント"
          >
            <AccountIcon />
          </button>
        </div>
      </div>

      {/* 下段：メインナビゲーション */}
      <nav className="site-header-nav" aria-label="メインメニュー">
        <button
          type="button"
          className={`site-nav-item ${activeTab === "学習状況" ? "is-active" : ""}`}
          onClick={() => handleTabClick("学習状況")}
        >
          学習状況
        </button>

        {subjects.map((subject) => (
          <button
            key={subject.name}
            type="button"
            className={`site-nav-item ${activeTab === subject.name ? "is-active" : ""}`}
            style={{ "--subject-color": subject.color }}
            onClick={() => handleTabClick(subject.name)}
          >
            {subject.name}
          </button>
        ))}

        <button
          type="button"
          className={`site-nav-item ${activeTab === "ブックマーク" ? "is-active" : ""}`}
          onClick={() => handleTabClick("ブックマーク")}
        >
          ブックマーク
        </button>
      </nav>
    </header>
  );
}

export default Header;
