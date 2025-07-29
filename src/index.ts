import 'dotenv/config';
import { processAppointments } from './jobs/appointmentJob';
import cron from 'node-cron';

cron.schedule('*/10 * * * *', async () => {
  console.log('Executando job...');
  await processAppointments();
});