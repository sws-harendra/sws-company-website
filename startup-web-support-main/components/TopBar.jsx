import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const styles = `
  .topbar {
    background: #1e88e5;
    color: #fff;
    font-family: "Roboto", Arial, sans-serif;
    font-size: 14px;
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    gap: 8px 24px;
  }

  .topbar-left,
  .topbar-right {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 8px 32px;
  }

  .topbar-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    text-decoration: none;
    white-space: nowrap;
  }

  .topbar-item svg {
    font-size: 13px;
    flex-shrink: 0;
  }

  .topbar-phone {
    letter-spacing: 1.5px;
  }

  .topbar-phone a {
    color: inherit;
    text-decoration: none;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .topbar {
      justify-content: center;
      padding: 9px 8px;
      font-size: 12px;
      gap: 0;
      flex-wrap: nowrap;
    }

    .topbar-left {
      display: none;
    }

    .topbar-right {
      justify-content: center;
      flex-wrap: nowrap;
      gap: 16px;
      width: 100%;
    }

    .topbar-item {
      white-space: nowrap;
    }
  }

  /* Extra Small Devices */
  @media (max-width: 360px) {
    .topbar {
      font-size: 10px;
      padding: 8px 4px;
    }

    .topbar-right {
      gap: 10px;
    }

    .topbar-item {
      gap: 5px;
    }

    .topbar-item svg {
      font-size: 11px;
    }
  }
`;

const TopBar = () => {
  return (
    <>
      <style>{styles}</style>

      <div className="topbar">
        {/* LEFT SIDE: Address (Desktop Only) */}
        <div className="topbar-left">
          <span className="topbar-item">
            <FaMapMarkerAlt />
            3rd Floor, Parvati Tower, Phulwari Rd, Jagdeo Path, Patna, Bihar
            800014
          </span>
        </div>

        {/* RIGHT SIDE: Email + Phone */}
        <div className="topbar-right">
          <a className="topbar-item" href="mailto:info@startupwebsupport.com">
            <FaEnvelope />
            info@startupwebsupport.com
          </a>

          <span className="topbar-item topbar-phone">
            <FaPhoneAlt />
            <a href="tel:+917479499718">+917479499718</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default TopBar;
