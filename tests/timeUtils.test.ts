import { minutesUntilAppointment, isWithinInterval } from '../src/utils/timeUtils';
import dayjs from 'dayjs';

describe('timeUtils', () => {
  test('calcula minutos até o agendamento', () => {
    const future = dayjs().add(24, 'hour');
    const date = future.toISOString(); // formato ISO igual ao sistema real
    const time = future.format('HH:mm');
    const diff = minutesUntilAppointment(date, time);
    expect(diff).toBeGreaterThanOrEqual(1439);
  });

  test('verifica se está dentro do intervalo', () => {
    expect(isWithinInterval(1440, 1430, 1450)).toBe(true);
    expect(isWithinInterval(1500, 1430, 1450)).toBe(false);
  });
});