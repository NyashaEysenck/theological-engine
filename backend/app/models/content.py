from pydantic import BaseModel
from typing import List, Optional

class BiblicalCounterArgument(BaseModel):
    scriptural_refutation: str
    contextual_explanation: str
    sound_doctrine: str
    supporting_scriptures: List[str]

class Myth(BaseModel):
    id: str
    title: str
    popular_perception: str
    biblical_counter_argument: BiblicalCounterArgument
    category: str
    tags: List[str]

class Doctrine(BaseModel):
    id: str
    title: str
    summary: str
    biblical_definition: str
    key_scriptures: List[str]
    common_misunderstandings: List[str]
    category: str

class BibleConcept(BaseModel):
    id: str
    title: str
    description: str
    biblical_nuance: str
    common_abuses: List[str]
    balanced_perspective: str
    relevant_scriptures: List[str]

class ScriptureVerse(BaseModel):
    id: str
    reference: str
    verse: str
    common_misuse: str
    paragraph: str
    chapter_context: str
    book_theme: str
    proper_interpretation: str