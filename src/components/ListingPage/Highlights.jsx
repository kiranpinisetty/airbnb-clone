import { Palmtree, Wind, Key } from 'lucide-react';
import './Highlights.css';

const ICON_MAP = {
  outdoor: Palmtree,
  cooling: Wind,
  selfCheckIn: Key,
};

export default function Highlights({ highlights = [] }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="highlights-list">
      {highlights.map((item, index) => {
        const IconComponent = ICON_MAP[item.icon] || Key;
        return (
          <div key={item.title || index} className="highlight-item">
            <div className="highlight-icon-box">
              <IconComponent size={28} strokeWidth={1.75} color="#222222" aria-hidden="true" />
            </div>
            <div className="highlight-content">
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-description">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
