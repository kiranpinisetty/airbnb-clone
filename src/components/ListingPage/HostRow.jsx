import hostAvatar from '../../assets/hero.png';
import './HostRow.css';

export default function HostRow({ host }) {
  const hostName = host ? host.name : 'Mirashya Homes';
  const years = host ? host.yearsHosting : 2;

  return (
    <div className="host-row" aria-label={`Host details for ${hostName}`}>
      <img
        src={hostAvatar}
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
