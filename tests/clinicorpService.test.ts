
import dotenv from 'dotenv';
dotenv.config();
import { getAppointments } from '../src/services/clinicorpService';



describe('getAppointments', () => {
  it('should fetch appointments without throwing errors', async () => {
    const subscriberId = process.env.CLINICORP_SUBSCRIBER_ID || 'test-subscriber';
    const businessId = process.env.CLINICORP_BUSINESS_ID || 'test-business';
    const from = '2025-07-28';
    const to = '2025-07-29';

    let error = null;
    let result = null;
    try {
      result = await getAppointments(subscriberId, businessId, from, to);
    } catch (e) {
      error = e;
    }
    expect(error).toBeNull();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle invalid parameters gracefully', async () => {
    let error = null;
    try {
      await getAppointments('', '', '', '');
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });
});
