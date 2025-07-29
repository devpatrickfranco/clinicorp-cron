import dayjs from 'dayjs';

export function minutesUntilAppointment(appointmentDate: string, appointmentTime: string): number {
  // Extrai apenas a data (YYYY-MM-DD) do campo ISO
  const dateOnly = appointmentDate.split('T')[0];
  const appointmentDateTime = dayjs(`${dateOnly} ${appointmentTime}`);
  return appointmentDateTime.diff(dayjs(), 'minute');
}

export function isWithinInterval(minutes: number, min: number, max: number): boolean {
  return minutes >= min && minutes <= max;
}