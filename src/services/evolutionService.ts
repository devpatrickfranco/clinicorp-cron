import { evoApi } from '../config/evoApi';

export async function sendEvolutionMessage(number: string, text: string) {
  try {
    const response = await evoApi.post('', {
      number,
      text
    });
    if (response.data && response.data.status === 'PENDING') {
      return true;
    }
    console.error('Resposta inesperada da Evolution API:', response.data);
    return false;
  } catch (error) {
    console.error('Erro ao enviar mensagem Evolution:', error);
    return false;
  }
}
