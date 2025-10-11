from sentence_transformers import SentenceTransformer, util
import re
def chunk_text(text: str, similarity_threshold: float = 0.65, max_chunk_size: int = 800):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    sentences = re.split(r'(?<=[.!?])\s+', text)
    embeddings = model.encode(sentences, convert_to_tensor=True)

    chunks = []
    current_chunk = sentences[0]

    for i in range(1, len(sentences)):
        sim = util.cos_sim(embeddings[i-1], embeddings[i]).item()
        if sim > similarity_threshold and len(current_chunk) + len(sentences[i]) < max_chunk_size:
            current_chunk += " " + sentences[i]
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentences[i]

    if current_chunk:
        chunks.append(current_chunk.strip())
    print(f"Generated a total of{len(chunks)} chunks from text.")
    return chunks

