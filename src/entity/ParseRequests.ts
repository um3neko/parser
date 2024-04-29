import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ParseRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
    userName: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    requestTime: Date;
};
