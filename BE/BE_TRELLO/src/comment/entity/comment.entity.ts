import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserInfor } from "src/users/userInfor.entity";
import { Workspace } from "src/workspace/entity/workspace.entity";
import { User } from "src/users/user.entity";
import { RowEntity } from "src/table/row.entity";
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    commentId: number
    @Column()
    contentComment: string;
    @CreateDateColumn()
    createdAt!: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId' })
    user:User

    @ManyToOne(()=>RowEntity, (row)=> row.comments,{onDelete:'CASCADE'})
    @JoinColumn({name:"rowId"})
    row:RowEntity
    

}