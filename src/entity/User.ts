import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
    userName: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true, default: '' })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
    refreshToken: string; 
    
};