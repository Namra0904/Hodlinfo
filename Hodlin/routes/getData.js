import express from 'express';
import connection from '../db.js';
import { Router } from 'express';

const router = Router()

router.get("/getData", async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * FROM trade ORDER BY id LIMIT 10"
    );
    res.json(result.rows).status(201);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
});
export default router;