import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "../../books/entities/book.entity";

@Entity('aurthors')

export class Author {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'character varying', length: 120})
    name: string;
    @Column({type: 'character varying', length: 60})
    nationality: string;
    @Column({type: 'date', name: 'birth_date'})
    birth_date: Date;
    @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'})
    created_at: Date;
    @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'})
    updated_at: Date;

    @Column({
        name: 'created_by',
        type: 'character varying',
        length: 30,
        nullable: true,
      })
      createdBy: string;
    
      @Column({
        name: 'updated_by',
        type: 'character varying',
        length: 30,
        nullable: true,
      })
      updatedBy: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
