import React from 'react';
import QRCode from 'qrcode.react';

const QRCard = ({ qrData }) => {
    return (
      <div className="qr-card">
        <QRCode value={qrData} />
      </div>
    );
  };
  export default QRCard;