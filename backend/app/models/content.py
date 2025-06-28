from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class BiblicalCounterArgument(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    scripturalRefutation: str
    contextualExplanation: str
    soundDoctrine: str
    supportingScriptures: List[str]

class Myth(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    title: str
    popularPerception: str
    biblicalCounterArgument: BiblicalCounterArgument
    category: str
    tags: List[str]

class Doctrine(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    title: str
    summary: str
    biblicalDefinition: str
    keyScriptures: List[str]
    commonMisunderstandings: List[str]
    category: str

class BibleConcept(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    title: str
    description: str
    biblicalNuance: str
    commonAbuses: List[str]
    balancedPerspective: str
    relevantScriptures: List[str]

class ScriptureVerse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    reference: str
    verse: str
    commonMisuse: str
    paragraph: str
    chapterContext: str
    bookTheme: str
    properInterpretation: str