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
    // Construction dynamique de la requête pour mettre à jour plusieurs champs
    const setFields = [];
    const values = [];
    for (const key in fields) {
      setFields.push(`${key} = ?`);
      values.push(fields[key]);
    }
    setFields.push('updated_at = NOW()');
    const query = `
      UPDATE transactions_pvit
      SET ${setFields.join(', ')}
      WHERE reference = ?
    `;
    values.push(reference);
    await conn.query(query, values);
    conn.release();
  },

  findByReference: async (reference) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM transactions_pvit WHERE reference = ?', [reference]);
    conn.release();
    return rows[0];
  }
};

module.exports = Transaction;