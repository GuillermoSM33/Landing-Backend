import { Injectable } from '@nestjs/common';
import { get, ref, push, set } from 'firebase/database';
import { firebaseDatabase } from 'src/firebase.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../entity/lead.entity';

@Injectable()
export class FormularioService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>
  ) {}

  async createData(data: any): Promise<void> {
    // Guardar en Firebase
    const dataRef = ref(firebaseDatabase, 'Data');
    const newElementRef = push(dataRef);

    try {
      await set(newElementRef, data);
      console.log('Lead creado en Firebase:', data);
    } catch (error) {
      console.error('Error en Firebase:', error);
    }

    // Guardar en SQLite
    try {
      await this.leadRepository.save({
        ...data,
        leido: false,
        importante: false,
        estado: 'nuevo',
      });
      console.log('Lead guardado en SQLite:', data);
    } catch (error) {
      console.error('Error guardando en SQLite:', error);
      throw error;
    }
  }

  async getAllLeads() {
    return this.leadRepository.find({
      order: { fecha: 'DESC' },
    });
  }
}