"""
Continuum Engine Core: Distributed AGI Letter Cluster System

This module implements the foundational layer of the FOX HEIGHT AGI platform.
It manages 1 billion independent LLM "letters" organized into 38.46 million clusters.

Biblical Wisdom: Genesis 1:1 - "In the beginning God created the heavens and the earth"
This represents the initialization of all distributed agents.
"""

__version__ = "0.1.0"
__author__ = "FOX HEIGHT LTD"

from .models import Letter, Cluster, VirtualChip
from .engine import ContinuumEngine
from .encryption import encrypt_fgtm, decrypt_fgtm
from .neural import calculate_similarity, form_neural_connections

__all__ = [
    "Letter",
    "Cluster",
    "VirtualChip",
    "ContinuumEngine",
    "encrypt_fgtm",
    "decrypt_fgtm",
    "calculate_similarity",
    "form_neural_connections",
]