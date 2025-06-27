from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from ..utils.serializers import to_camel_case

class BiblicalCounterArgument(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    scriptural_refutation: str
    contextual_explanation: str
    sound_doctrine: str
    supporting_scriptures: List[str]

class Myth(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    title: str
    popular_perception: str
    biblical_counter_argument: BiblicalCounterArgument
    category: str
    tags: List[str]

class Doctrine(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    title: str
    summary: str
    biblical_definition: str
    key_scriptures: List[str]
    common_misunderstandings: List[str]
    category: str

class BibleConcept(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    title: str
    description: str
    biblical_nuance: str
    common_abuses: List[str]
    balanced_perspective: str
    relevant_scriptures: List[str]

class ScriptureVerse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    reference: str
    verse: str
    common_misuse: str
    paragraph: str
    chapter_context: str
    book_theme: str
    proper_interpretation: str