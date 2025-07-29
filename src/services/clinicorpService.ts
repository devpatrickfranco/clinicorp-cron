import { api } from '../config/api';

export interface Appointment {
  id: number;
  PatientName: string;
  MobilePhone: string;
  date: string;
  fromTime: string;
}

export async function getAppointments(subscriberId: string, businessId: string, from: string, to: string): Promise<Appointment[]> {
  const response = await api.get('/appointment/list', {
    params: {
      subscriber_id: subscriberId,
      businessId,
      from,
      to
    }
  });
  return response.data;
}