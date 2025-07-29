import { api } from '../config/api';

export async function createAppointment({
  PatientName,
  SchedulingReason,
  MobilePhone,
  OtherPhones,
  OtherDocumentId,
  Email,
  NotesPatient,
  fromTime,
  toTime,
  date,
  Dentist_PersonId,
  Clinic_BusinessId,
  CodeLink
}: {
  PatientName: string;
  SchedulingReason: string;
  MobilePhone: string;
  OtherPhones: string;
  OtherDocumentId: string;
  Email: string;
  NotesPatient: string;
  fromTime: string;
  toTime: string;
  date: string;
  Dentist_PersonId: number;
  Clinic_BusinessId: number;
  CodeLink: number;
}) {
  return api.post('/appointment/create_online_scheduling', {
    CodeLink,
    PatientName,
    SchedulingReason,
    MobilePhone,
    OtherPhones,
    OtherDocumentId,
    Email,
    NotesPatient,
    fromTime,
    toTime,
    IsOnlineScheduling: true,
    date,
    Type: 'CLOUDIA',
    Dentist_PersonId,
    Clinic_BusinessId,
    AlreadyPatient: true
  });
}
