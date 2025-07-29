import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum EstadoLead {
  NUEVO = 'nuevo',
  CONTACTADO = 'contactado',
  DESCARTADO = 'descartado',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre_completo: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  mensaje: string;

  @Column({ default: false })
  leido: boolean;

  @Column({ default: false })
  importante: boolean;

  @Column({
    type: 'enum',
    enum: EstadoLead,
    default: EstadoLead.NUEVO,
  })
  estado: EstadoLead;

  @CreateDateColumn()
  fecha: Date;
}
