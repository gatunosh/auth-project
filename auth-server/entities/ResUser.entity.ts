import { Entity, Column } from 'typeorm';
import { Person } from './utils/Person.entity';

@Entity('res_users')
export class ResUser extends Person {

    @Column()
    password: string;

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;
    
}