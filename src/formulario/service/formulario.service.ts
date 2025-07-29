import { Injectable } from '@nestjs/common';
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
    try {
      await this.leadRepository.save({
        ...data,
        leido: false,
        importante: false,
        estado: 'nuevo',
      });
      console.log('Lead guardado en PostgreSQL:', data);
    } catch (error) {
      console.error('Error guardando en PostgreSQL:', error);
      throw error;
    }
  }

  async getAllLeads() {
    return this.leadRepository.find({
      order: { fecha: 'DESC' },
    });
  }
}
