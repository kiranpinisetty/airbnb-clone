import { Check, Balloon, GraduationCap, Shield } from 'lucide-react';
import { getAsset } from '../../lib/assets';
import './MeetHost.css';

export default function MeetHost({ host, coHosts = [] }) {
  if (!host) return null;

  const hostName = host.name || 'Mirashya Homes';
  const avatarUrl = getAsset(host.logo || 'avatars/host.jpeg');
  const reviewsCount = (host.reviews || host.reviewCount || 1463).toLocaleString('en-IN');
  const ratingScore = host.rating || 4.68;
  const yearsHosting = host.yearsHosting || 2;
  const born = host.born || 'Born in the 80s';
  const school = host.school || 'Where I went to school: NICMAR GOA';
  const responseRate = host.responseRate || 'Response rate: 100%';
  const responseTime = host.responseTime || 'Responds within an hour';

  return (
    <section className="meet-host-section" aria-label="Host profile and information">
      <h2 className="meet-host-heading">Meet your host</h2>

      <div className="meet-host-columns">
        {/* Left Column: Host Badge Card + Born/School Info */}
        <div className="meet-host-left-col">
          <div className="meet-host-badge-card" aria-label="Host summary badge">
            {/* Left Half: Avatar, Crimson Check Badge, Name, Host Label */}
            <div className="meet-host-card-left">
              <div className="meet-host-avatar-wrapper">
                <img
                  src={avatarUrl}
                  alt={`Host ${hostName}`}
                  className="meet-host-avatar-img"
                  loading="lazy"
                />
                <div
                  className="meet-host-check-badge"
                  aria-label="Verified identity"
                >
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                </div>
              </div>

              <h3 className="meet-host-name">{hostName}</h3>
              <span className="meet-host-label">Host</span>
            </div>

            <div className="meet-host-card-divider" aria-hidden="true" />

            {/* Right Half: Reviews, Rating, Years Hosting */}
            <div className="meet-host-card-right">
              <div className="meet-host-stat-block">
                <span className="meet-host-stat-value">{reviewsCount}</span>
                <span className="meet-host-stat-label">Reviews</span>
              </div>

              <div className="meet-host-stat-block">
                <span className="meet-host-stat-value">{`${ratingScore}★`}</span>
                <span className="meet-host-stat-label">Rating</span>
              </div>

              <div className="meet-host-stat-block">
                <span className="meet-host-stat-value">{yearsHosting}</span>
                <span className="meet-host-stat-label">Years hosting</span>
              </div>
            </div>
          </div>

          {/* Info Rows below Card */}
          <div className="meet-host-info-list">
            <div className="meet-host-info-row">
              <Balloon
                size={24}
                strokeWidth={1.75}
                className="meet-host-info-icon"
                aria-hidden="true"
              />
              <span className="meet-host-info-text">{born}</span>
            </div>

            <div className="meet-host-info-row">
              <GraduationCap
                size={24}
                strokeWidth={1.75}
                className="meet-host-info-icon"
                aria-hidden="true"
              />
              <span className="meet-host-info-text">{school}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-hosts, Host details, Message CTA, Protection notice */}
        <div className="meet-host-right-col">
          {coHosts.length > 0 && (
            <>
              <h3 className="meet-host-subheading">Co-Hosts</h3>
              <div className="meet-host-cohosts-grid" aria-label="List of co-hosts">
                {coHosts.map((co) => (
                  <div key={co.name} className="meet-host-cohost-item">
                    <div className="meet-host-cohost-avatar-box">
                      {co.initial ? (
                        <div
                          className="meet-host-cohost-avatar-initial"
                          style={{
                            backgroundColor: co.initial.bg,
                            color: co.initial.fg,
                          }}
                        >
                          {co.initial.text}
                        </div>
                      ) : (
                        <img
                          src={getAsset(co.photo)}
                          alt=""
                          className="meet-host-cohost-avatar-img"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <span className="meet-host-cohost-name">{co.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="meet-host-subheading">Host details</h3>
          <div className="meet-host-details-lines">
            <p className="meet-host-detail-line">{responseRate}</p>
            <p className="meet-host-detail-line">{responseTime}</p>
          </div>

          <button
            type="button"
            className="meet-host-message-btn"
            aria-label="Message the host"
          >
            Message host
          </button>

          <div className="meet-host-security-notice">
            <Shield
              size={20}
              strokeWidth={1.8}
              className="meet-host-security-icon"
              aria-hidden="true"
            />
            <p className="meet-host-security-text">
              To help protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
