import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class UserInfor {
    @PrimaryGeneratedColumn()
    userInforId: number
    @Column()
    display_name: string;
    @Column({default:null})
    avatarImg:string
    @Column({default:null})
    age:number;
    @Column({default:null})
    sex:string
    @Column({default:null})
    address:string;

    @OneToOne(() => User, (user) => user.userInfors)
    @JoinColumn({name:"userId"})
    users:User

}