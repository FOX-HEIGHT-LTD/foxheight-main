def calculate_similarity(dna1, dna2):
    """Calculate the similarity between two DNA sequences using Hamming distance."""
    if len(dna1) != len(dna2):
        raise ValueError("DNA sequences must be of the same length.")
    return sum(el1 == el2 for el1, el2 in zip(dna1, dna2)) / len(dna1)


def form_neural_connections(dna_sequences):
    """Create neural connections based on DNA sequences."""
    connections = {}
    for i in range(len(dna_sequences)):
        for j in range(i + 1, len(dna_sequences)):
            similarity = calculate_similarity(dna_sequences[i], dna_sequences[j])
            connections[(i, j)] = similarity
    return connections