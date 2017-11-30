import { InvertedIndex } from "./inverted_index";
import { Tokenizer } from "./tokenizer";
import { Query } from "./query_builder";
export declare type ANY = any;
export declare class FullTextSearch {
    private _id;
    private _docs;
    private _idxSearcher;
    private _invIdxs;
    /**
     * Registers the full text search as plugin.
     */
    static register(): void;
    /**
     * Initialize the full text search for the given fields.
     * @param {object[]} fields - the field options
     * @param {string} fields.name - the name of the field
     * @param {boolean=true} fields.store - flag to indicate if the full text search should be stored on serialization or
     *  rebuild on deserialization
     * @param {boolean=true} fields.optimizeChanges - flag to indicate if deleting/updating a document should be optimized
     *  (requires more memory but performs better)
     * @param {Tokenizer=Tokenizer} fields.tokenizer - the tokenizer of the field
     * @param {string=$loki} id - the property name of the document index
     */
    constructor(fields?: FullTextSearch.FieldOptions[], id?: string);
    addDocument(doc: object, id?: number): void;
    removeDocument(doc: object, id?: number): void;
    updateDocument(doc: object, id?: number): void;
    clear(): void;
    search(query: Query): ANY;
    setDirty(): void;
    toJSON(): ANY;
    static fromJSONObject(serialized: ANY, tokenizers?: Tokenizer[]): FullTextSearch;
}
export declare namespace FullTextSearch {
    interface FieldOptions extends InvertedIndex.FieldOptions {
        name: string;
    }
}
export default FullTextSearch;
