const pool = require('../config/database');

const Transaction = {
  create: async (data) => {
    const conn = await pool.getConnection();
    const query = `
      INSERT INTO transactions_pvit
      (transaction_id, reference, amount, status, customer_account_number, charge_owner, free_info, transaction_operation, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [
      data.transaction_id,
      data.reference,
      data.amount,
      data.status,
      data.customer_account_number,
      data.charge_owner,
      data.free_info,
      data.transaction_operation,
      data.created_at,
      data.updated_at
    ]);
    conn.release();
  },

  updateTransaction: async (reference, fields) => {
    const conn = await pool.getConnection();
    const query = `
      UPDATE transactions_pvit SET transaction_id = ?, updated_at = NOW()
      WHERE reference = ?
    `;
    await conn.query(query, [fields.transaction_id, reference]);
    conn.release();
  }
};



updateTransaction: async (reference, fields) => {
  const conn = await pool.getConnection();
  const query = `
    UPDATE transactions_pvit
    SET transaction_id = ?, status = ?, updated_at = ?
    WHERE reference = ?
  `;
  await conn.query(query, [
    fields.transaction_id,
    fields.status,
    fields.updated_at,
    reference
  ]);
  conn.release();
}
module.exports = Transaction;