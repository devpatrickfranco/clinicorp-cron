import dotenv from 'dotenv';
dotenv.config();
import { createAppointment } from '../src/services/createAppointmentService';
import { processAppointments } from '../src/jobs/appointmentJob';
import { sendEvolutionMessage } from '../src/services/evolutionService';

describe('End-to-End: Agendamento e envio de mensagem', () => {
  const testPhone = '5519981724419';
  const testName = 'Teste E2E';
  const testDateBase = new Date();
  // Função para formatar hora no padrão HH:mm
  function formatTime(date: Date) {
    return date.toISOString().substring(11, 16);
  }
  // Função para formatar data no padrão yyyy-MM-ddTHH:mm:ss.000Z
  function formatDate(date: Date) {
    return date.toISOString().replace(/\.[0-9]{3}Z$/, '.000Z');
  }
  // Horário 3 horas à frente
  const date3h = new Date(testDateBase.getTime() + 3 * 60 * 60 * 1000);
  const fromTime3h = formatTime(date3h);
  const dateStr3h = formatDate(date3h);
  // Horário 24 horas à frente
  const date24h = new Date(testDateBase.getTime() + 24 * 60 * 60 * 1000);
  const fromTime24h = formatTime(date24h);
  const dateStr24h = formatDate(date24h);

  let appointmentId: string | null = null;
  let appointmentStatus: number | null = null;
  let appointmentId3h: string | null = null;
  let appointmentStatus3h: number | null = null;
  let appointmentId24h: string | null = null;
  let appointmentStatus24h: number | null = null;

  it('deve criar um agendamento no Clinicorp para daqui 3 horas', async () => {
    try {
      const response = await createAppointment({
        PatientName: testName + ' 3h',
        SchedulingReason: 'Consulta E2E 3h',
        MobilePhone: testPhone,
        OtherPhones: testPhone,
        OtherDocumentId: '999',
        Email: 'teste@e2e.com',
        NotesPatient: 'Teste automatizado 3h',
        fromTime: fromTime3h,
        toTime: '15:30',
        date: dateStr3h,
        Dentist_PersonId: 5978663972110336,
        Clinic_BusinessId: 6579080316190720,
        CodeLink: 49992
      });
      appointmentStatus3h = response?.status || null;
      appointmentId3h = response?.data?.id || response?.data?.appointmentId || 'created';
      console.log('Agendamento 3h criado com status:', appointmentStatus3h);
      expect(appointmentStatus3h).toBe(200);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar agendamento 3h:', error.message);
      } else {
        console.error('Erro ao criar agendamento 3h:', error);
      }
      throw error;
    }
  });

  it('deve criar um agendamento no Clinicorp para daqui 24 horas', async () => {
    try {
      const response = await createAppointment({
        PatientName: testName + ' 24h',
        SchedulingReason: 'Consulta E2E 24h',
        MobilePhone: testPhone,
        OtherPhones: testPhone,
        OtherDocumentId: '999',
        Email: 'teste@e2e.com',
        NotesPatient: 'Teste automatizado 24h',
        fromTime: fromTime24h,
        toTime: '15:30',
        date: dateStr24h,
        Dentist_PersonId: 5978663972110336,
        Clinic_BusinessId: 6579080316190720,
        CodeLink: 49992
      });
      appointmentStatus24h = response?.status || null;
      appointmentId24h = response?.data?.id || response?.data?.appointmentId || 'created';
      console.log('Agendamento 24h criado com status:', appointmentStatus24h);
      expect(appointmentStatus24h).toBe(200);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao criar agendamento 24h:', error.message);
      } else {
        console.error('Erro ao criar agendamento 24h:', error);
      }
      throw error;
    }
  });

  it('deve simular o cron e enviar mensagem Evolution', async () => {
    // Verificar se os agendamentos foram criados
    expect(appointmentStatus3h).toBe(200);
    expect(appointmentId3h).toBeTruthy();
    expect(appointmentStatus24h).toBe(200);
    expect(appointmentId24h).toBeTruthy();

    try {
      // Processar agendamentos (simular cron)
      console.log('Processando agendamentos...');
      await processAppointments();
      // Aguardar processamento
      await new Promise(resolve => setTimeout(resolve, 5000));
      // Enviar mensagem de teste diretamente para ambos
      console.log('Enviando mensagem de teste para 3h...');
      const messageResult3h: any = await sendEvolutionMessage(testPhone, 'Mensagem de teste E2E 3h');
      const messageSuccess3h = messageResult3h === true || 
                           (messageResult3h && (messageResult3h.success || messageResult3h.status === 200));
      console.log('Resultado do envio de mensagem 3h:', messageSuccess3h);
      expect(messageSuccess3h).toBeTruthy();

      console.log('Enviando mensagem de teste para 24h...');
      const messageResult24h: any = await sendEvolutionMessage(testPhone, 'Mensagem de teste E2E 24h');
      const messageSuccess24h = messageResult24h === true || 
                           (messageResult24h && (messageResult24h.success || messageResult24h.status === 200));
      console.log('Resultado do envio de mensagem 24h:', messageSuccess24h);
      expect(messageSuccess24h).toBeTruthy();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro no teste de envio:', error.message);
      } else {
        console.error('Erro no teste de envio:', error);
      }
      throw error;
    }
  });

  afterAll(async () => {
    // Limpeza se necessário - mas evite logar objetos complexos
    if (appointmentId3h) {
      console.log('Teste finalizado. ID do agendamento 3h:', appointmentId3h);
    }
    if (appointmentId24h) {
      console.log('Teste finalizado. ID do agendamento 24h:', appointmentId24h);
    }
  });
});