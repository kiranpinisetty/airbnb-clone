import { getAsset } from '../../lib/assets';
import './HostRow.css';

export default function HostRow({ host }) {
  const hostName = host ? host.name : 'Mirashya Homes';
  const years = host ? host.yearsHosting : 2;
  const avatarUrl = getAsset(host?.logo || 'avatars/host.jpeg');

  return (
    <div className="host-row" aria-label={`Host details for ${hostName}`}>
      <img
        src={avatarUrl}
        alt={`Avatar of ${hostName}`}
        className="host-avatar"
      />
      <div className="host-info">
        <h2 className="host-name">{`Hosted by ${hostName}`}</h2>
        <span className="host-tenure">{`${years} years hosting`}</span>
      </div>
    </div>
  );
}
