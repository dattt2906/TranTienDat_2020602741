import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { RowEntity } from "./row.entity";
import { User } from "src/users/user.entity";
import { Board } from "src/board/entity/board.entity";


@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    columnId: number;
    @Column()
    columnName: string;
    @Column({default:null})
    sort:number;

    @CreateDateColumn()
    createdAt!: Date;
    @OneToMany(() => RowEntity, (row) => row.cols)

    rows: RowEntity[];

    @ManyToOne(() => Board, (board) => board.cols)
    @JoinColumn({ name: "boardId" })
    board:Board



}
