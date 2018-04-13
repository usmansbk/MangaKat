import { normalize, schema } from 'normalizr';

const mangaSchema = new schema.Entity('manga', {}, {
	idAttribute: 'mangaId'
});

const mangaListSchema = [ mangaSchema ];

export default function normalizeMangaList(data) {
	return normalize(data, mangaListSchema);
}