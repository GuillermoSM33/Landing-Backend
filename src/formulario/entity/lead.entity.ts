import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column({ default: 'nuevo' })
  estado: 'nuevo' | 'contactado' | 'descartado';

  @CreateDateColumn()
  fecha: Date;
}