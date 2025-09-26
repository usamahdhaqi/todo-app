import React from "react";

const ConfirmPopup = ({ handleDelete, cancelDelete }) => (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>Konfirmasi</h3>
      <p>Kamu yakin ingin menghapus todo ini?</p>
      <div className="popup-actions">
        <button onClick={handleDelete} className="delete-button">
          Ya, Hapus
        </button>
        <button onClick={cancelDelete} className="cancel-button">
          Batal
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmPopup;
