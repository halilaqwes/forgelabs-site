// Independently drawn light paths, visually inspired by Kokonut UI on 21st.dev.
export default function AmbientPaths({ className = "" }) {
  return (
    <div className={`ambient-paths ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="path-light" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#c4f458" stopOpacity="0" />
            <stop offset=".52" stopColor="#c4f458" stopOpacity=".9" />
            <stop offset="1" stopColor="#a69be9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i}>
            <path
              className="ambient-path-base"
              d={`M-100 ${180 + i * 19} C260 ${-130 + i * 26}, 390 ${670 - i * 11}, 810 ${285 + i * 17} S1190 ${270 - i * 20}, 1500 ${90 + i * 30}`}
            />
            <path
              className="ambient-path-beam"
              style={{ animationDelay: `${i * -0.6}s` }}
              d={`M-100 ${180 + i * 19} C260 ${-130 + i * 26}, 390 ${670 - i * 11}, 810 ${285 + i * 17} S1190 ${270 - i * 20}, 1500 ${90 + i * 30}`}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
