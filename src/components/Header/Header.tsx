export function Header() {
  return (
    <header>
      <div className="container">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="350"
          height="120"
          viewBox="0 0 400 120"
          fill="none"
        >
          <g id="book-icon">
            <rect x="20" y="35" width="50" height="50" rx="4" fill="#8B5CF6" />
            <rect x="22" y="37" width="46" height="46" rx="3" fill="white" />
            <line
              x1="45"
              y1="37"
              x2="45"
              y2="83"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <line
              x1="30"
              y1="50"
              x2="40"
              y2="50"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="58"
              x2="40"
              y2="58"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="66"
              x2="40"
              y2="66"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <line
              x1="50"
              y1="50"
              x2="60"
              y2="50"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="58"
              x2="60"
              y2="58"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="66"
              x2="60"
              y2="66"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          <g id="speech-bubble">
            <circle cx="65" cy="45" r="18" fill="#8B5CF6" />
            <polygon points="58,58 65,63 62,58" fill="#8B5CF6" />

            <line
              x1="62"
              y1="42"
              x2="68"
              y2="36"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          <g id="text">
            <text
              x="110"
              y="70"
              fontFamily="Inter, Poppins, sans-serif"
              fontSize="32"
              fontWeight="600"
              fill="#e5e7eb"
            >
              Справочник ЕГЭ
            </text>
          </g>
        </svg>
      </div>
    </header>
  );
}
