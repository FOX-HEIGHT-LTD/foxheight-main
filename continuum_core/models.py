import hashlib
from cryptography.fernet import Fernet

class Letter:
    def __init__(self, content: str):
        self.content = content
        self.fingerprint = self.generate_fingerprint(content)

    @staticmethod
    def generate_fingerprint(content: str) -> str:
        return hashlib.sha256(content.encode()).hexdigest()

class Cluster:
    def __init__(self, letters: list):
        self.letters = letters
        self.fingerprint = self.generate_fingerprint()

    def generate_fingerprint(self) -> str:
        combined_content = ''.join(letter.content for letter in self.letters)
        return hashlib.sha256(combined_content.encode()).hexdigest()

class VirtualChip:
    def __init__(self, key: bytes):
        self.cipher = Fernet(key)

    def encrypt(self, data: str) -> str:
        return self.cipher.encrypt(data.encode()).decode()

    def decrypt(self, token: str) -> str:
        return self.cipher.decrypt(token.encode()).decode()