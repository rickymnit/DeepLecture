import faiss
import numpy as np
import pickle
from config import VECTOR_DB_PATH


class VectorStore:

    def __init__(self):

        self.index = None
        self.metadata = []

    def build(self, embeddings, metadata):

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatIP(dimension)

        self.index.add(embeddings)

        self.metadata = metadata

    def add(self, embeddings, metadata):

        if self.index is None:
            self.build(embeddings, metadata)
        else:
            self.index.add(embeddings)
            self.metadata.extend(metadata)

    def search(self, query_embedding, k=5):

        scores, indices = self.index.search(query_embedding, k)

        results = []

        for idx in indices[0]:
            results.append(self.metadata[idx])

        return results

    def save(self):

        faiss.write_index(self.index, VECTOR_DB_PATH)

        with open(VECTOR_DB_PATH + "_meta.pkl", "wb") as f:
            pickle.dump(self.metadata, f)

    def load(self):

        self.index = faiss.read_index(VECTOR_DB_PATH)

        with open(VECTOR_DB_PATH + "_meta.pkl", "rb") as f:
            self.metadata = pickle.load(f)


vector_store = VectorStore()