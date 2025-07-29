import { getAppointments } from '../services/clinicorpService';
import { minutesUntilAppointment, isWithinInterval } from '../utils/timeUtils';
import { sendEvolutionMessage } from '../services/evolutionService';
import dayjs from 'dayjs';

const sentMessages = new Set<string>();

export async function processAppointments() {
  const subscriberId = process.env.CLINICORP_SUBSCRIBER_ID!;
  const businessId = process.env.CLINICORP_BUSINESS_ID!;

  const from = dayjs().format('YYYY-MM-DD');
  const to = dayjs().add(1, 'day').format('YYYY-MM-DD');

  // ...

  const appointments = await getAppointments(subscriberId, businessId, from, to);
  // ...

  for (const appt of appointments) {
    const minutes = minutesUntilAppointment(appt.date, appt.fromTime);

    // Garante que o número tenha o DDI 55
    const phone = appt.MobilePhone && appt.MobilePhone.startsWith('55') ? appt.MobilePhone : `55${appt.MobilePhone}`;

    if (isWithinInterval(minutes, 1430, 1440)) {
      const msg24h = `Oi ${appt.PatientName}! Tudo certo? 😊\nSó passando pra confirmar seu horário — te espero amanhã às ${appt.fromTime} na Clínica DamaFace.\n\nQualquer dúvida, estou por aqui 💬`;
      await sendEvolutionMessage(phone, msg24h);
    }

    if (isWithinInterval(minutes, 170, 190)) {
      const msg3h = `Oi ${appt.PatientName}! Tudo bem? 😊\nSó passando para lembrar a sua consulta na DamaFace\n\nAté daqui a pouco às ${appt.fromTime}\nQualquer dúvida, estou por aqui 💬`;
      await sendEvolutionMessage(phone, msg3h);
    }
  }
}