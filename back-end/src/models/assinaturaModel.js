import db from "../config/db.js";

export async function buscarMotorista(representanteId) {
  const [motoristas] = await db.execute(
    "SELECT id FROM motorista WHERE representante_id = ? LIMIT 1",
    [representanteId]
  );

  return motoristas[0] ?? null;
}

export async function buscarAssinatura(motoristaId) {
  const [assinaturas] = await db.execute(
    `SELECT id, status, data_fim, pagamento_confirmado_em,
            (data_inicio <= NOW()) AS iniciou,
            (data_fim > NOW()) AS valida
       FROM assinaturas_motorista
      WHERE motorista_id = ?
      ORDER BY criada_em DESC, id DESC
      LIMIT 1`,
    [motoristaId]
  );

  return assinaturas[0] ?? null;
}
