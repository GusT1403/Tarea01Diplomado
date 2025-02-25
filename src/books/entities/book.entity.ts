import { Author } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('books')

export class Book {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'character varying', length: 120})
    title: string;
    @Column({type: 'character varying', length: 20})
    isbn: string;
    @Column({type: 'character varying', length: 60})
    publisher: string;
    @Column({type: 'integer', name: 'publication_year'})
    publication_year: number;
    @Column({type: 'character varying', length: 60})
    genre: string;
    @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'})
    created_at: Date;
    @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'})
    updated_at: Date;

    @Column({ name: 'author_id', type: 'integer' })
    author_id: number;
    @ManyToOne(() => Author, (author) => author.id)
    @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
    author: Author;
}
