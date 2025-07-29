import 'dotenv/config';
import { processAppointments } from './jobs/appointmentJob';

export async function start() {
  console.log('Executando job Clinicorp...');
  await processAppointments();
}

// Permite executar localmente via `ts-node src/index.ts`
if (require.main === module) {
  start();
}
