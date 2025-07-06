import { Injectable } from '@nestjs/common';
import { get, ref, push, set } from 'firebase/database';
import { firebaseDatabase } from 'src/firebase.config';

@Injectable()
export class FormularioService {
   async createData(data: any): Promise<void> {
  const dataRef = ref(firebaseDatabase, 'Data');
  const newElementRef = push(dataRef);
  try {
    await set(newElementRef, data);
    console.log('Lead creado en Firebase:', data);
  } catch (error) {
    console.error('Error guardando en Firebase:', error);
    throw error;
  }
}


    async getAllLeads() {
  const snapshot = await get(ref(firebaseDatabase, 'Data'));
  const data = snapshot.val();

  if (!data) return [];

  return Object.entries(data).map(([id, value]: any) => ({
    id,
    ...value
  }));
}
}

