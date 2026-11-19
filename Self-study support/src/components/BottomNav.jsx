import "./BottomNav.css";

const menuItems = [
  { id: "home", label: "ホーム" },
  { id: "records", label: "学習記録" },
  { id: "schedule", label: "予定" },
  { id: "timer", label: "タイマー" },
  { id: "settings", label: "設定" },
];

function NavIcon({ name }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    records: (
      <>
        <path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1" />
        <path d="M12 6c3-2 6-2 9-1v14c-3-1-6-1-9 1" />
        <path d="M12 6v14" />
        <path d="m15 12 2 2 3-4" />
      </>
    ),
    schedule: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
    timer: (
      <>
        <circle cx="12" cy="13" r="9" />
        <path d="M12 8v5l3 2M9 2h6" />
      </>
    ),
    settings: (
      <>
        <path d="M10 2h4l1 3 3 1 3-1 2 4-2 2v3l2 2-2 4-3-1-3 1-1 3h-4l-1-3-3-1-3 1-2-4 2-2v-3L1 9l2-4 3 1 3-1z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      aria-hidden="true"
      {...common}
    >
      {icons[name]}
    </svg>
  );
}

function BottomNav({ activePage = "home", onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="下部メニュー">
      <div className="bottom-nav-inner">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate?.(item.id)}
            aria-current={
              activePage === item.id ? "page" : undefined
            }
          >
            <NavIcon name={item.id} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;