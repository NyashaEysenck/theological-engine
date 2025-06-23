import json
import os
from typing import List, Dict, Optional
from app.models.bible import BibleBook, HistoricalContext, GeographicContext, ChapterIntroduction, Verse, ReadingProgress

class BibleService:
    def __init__(self):
        self.data_dir = "backend/data"
        self.bible_books_file = os.path.join(self.data_dir, "bible_books.json")
        self.verses_dir = os.path.join(self.data_dir, "verses")
    
    async def _load_json_file(self, file_path: str) -> dict:
        """Load data from JSON file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}
    
    async def get_all_books(self) -> List[BibleBook]:
        """Get all Bible books"""
        data = await self._load_json_file(self.bible_books_file)
        books = []
        for genre_books in data.values():
            books.extend([BibleBook(**book) for book in genre_books])
        return books
    
    async def get_books_by_genre(self) -> Dict[str, List[BibleBook]]:
        """Get Bible books organized by genre"""
        data = await self._load_json_file(self.bible_books_file)
        result = {}
        for genre, books in data.items():
            result[genre] = [BibleBook(**book) for book in books]
        return result
    
    async def get_historical_context(self, book_id: str, chapter: int) -> HistoricalContext:
        """Get historical context for a specific chapter"""
        if book_id == "genesis":
            if chapter == 1:
                return HistoricalContext(
                    period="Pre-history",
                    date="Creation",
                    background="The beginning of everything - God creates the universe, earth, and all life",
                    concurrent=[
                        "No concurrent events - this is the absolute beginning",
                        "Establishment of natural order and cycles",
                        "Institution of time, space, and matter"
                    ]
                )
            elif chapter == 2:
                return HistoricalContext(
                    period="Creation Week",
                    date="Day 6-7 of Creation",
                    background="Detailed account of humanity's creation and the Garden of Eden",
                    concurrent=[
                        "First human civilization being established",
                        "Naming of animals",
                        "Institution of marriage"
                    ]
                )
            elif chapter == 3:
                return HistoricalContext(
                    period="Early Earth",
                    date="Shortly after Creation",
                    background="The fall of humanity through disobedience and its consequences",
                    concurrent=[
                        "First sin enters the world",
                        "Curse pronounced on creation",
                        "Promise of redemption given"
                    ]
                )
            else:
                return HistoricalContext(
                    period="Early Earth",
                    date="Pre-Flood Era",
                    background="The early history of human civilization",
                    concurrent=[
                        "Development of early human society",
                        "Growth of human population",
                        "Increase of wickedness on earth"
                    ]
                )
        
        return HistoricalContext(
            period="Unknown Period",
            date="Unknown Date",
            background="Historical context not available",
            concurrent=[]
        )
    
    async def get_geographic_context(self, book_id: str, chapter: int) -> GeographicContext:
        """Get geographic context for a specific chapter"""
        if book_id == "genesis":
            if chapter == 1:
                return GeographicContext(
                    main_location="The Universe/Earth",
                    related_sites=[
                        "The heavens",
                        "The earth",
                        "The seas",
                        "The dry land"
                    ],
                    routes=[
                        "Movement of celestial bodies",
                        "Water cycle patterns",
                        "Atmospheric systems"
                    ]
                )
            elif chapter == 2:
                return GeographicContext(
                    main_location="Garden of Eden",
                    related_sites=[
                        "Four rivers (Pishon, Gihon, Tigris, Euphrates)",
                        "Land of Havilah",
                        "Tree of Life",
                        "Tree of Knowledge of Good and Evil"
                    ],
                    routes=[
                        "River systems through Eden",
                        "Adam's paths through the garden",
                        "Animal migration patterns"
                    ]
                )
            elif chapter == 3:
                return GeographicContext(
                    main_location="Garden of Eden and its surroundings",
                    related_sites=[
                        "East of Eden",
                        "Garden entrance",
                        "Location of Cherubim guards",
                        "New dwelling place of Adam and Eve"
                    ],
                    routes=[
                        "Path of expulsion from Eden",
                        "New territories for human habitation",
                        "Blocked route back to Tree of Life"
                    ]
                )
            else:
                return GeographicContext(
                    main_location="Ancient Near East",
                    related_sites=[
                        "Early human settlements",
                        "Agricultural regions",
                        "First cities"
                    ],
                    routes=[
                        "Early trade routes",
                        "Migration patterns",
                        "River systems"
                    ]
                )
        
        return GeographicContext(
            main_location="Location unknown",
            related_sites=[],
            routes=[]
        )
    
    async def get_chapter_introduction(self, book_id: str, chapter: int) -> ChapterIntroduction:
        """Get chapter introduction with themes and structure"""
        if book_id == "genesis":
            if chapter == 1:
                return ChapterIntroduction(
                    summary="God creates the universe, earth, and all life in six days",
                    themes=[
                        "God's creative power",
                        "Order from chaos",
                        "The goodness of creation",
                        "Human dignity and purpose"
                    ],
                    characters=[
                        {"name": "God", "role": "Creator of all things"},
                        {"name": "Spirit of God", "role": "Hovering over the waters"},
                        {"name": "Humanity", "role": "Created in God's image"}
                    ],
                    structure=[
                        "Initial creation (1-2)",
                        "First day: Light (3-5)",
                        "Second day: Sky and waters (6-8)",
                        "Third day: Land and vegetation (9-13)",
                        "Fourth day: Sun, moon, and stars (14-19)",
                        "Fifth day: Sea creatures and birds (20-23)",
                        "Sixth day: Land animals and humans (24-31)"
                    ]
                )
            elif chapter == 2:
                return ChapterIntroduction(
                    summary="Detailed account of humanity's creation and life in Eden",
                    themes=[
                        "Human purpose and work",
                        "Marriage institution",
                        "Relationship with God",
                        "Stewardship of creation"
                    ],
                    characters=[
                        {"name": "God", "role": "Creator and provider"},
                        {"name": "Adam", "role": "First man, garden keeper"},
                        {"name": "Eve", "role": "First woman, helper suitable for Adam"}
                    ],
                    structure=[
                        "Seventh day rest (1-3)",
                        "Creation of man (4-7)",
                        "Planting of Eden (8-14)",
                        "Man's role and the first command (15-17)",
                        "Creation of woman (18-25)"
                    ]
                )
            elif chapter == 3:
                return ChapterIntroduction(
                    summary="The fall of humanity through disobedience and its consequences",
                    themes=[
                        "Temptation and sin",
                        "Consequences of disobedience",
                        "God's judgment and mercy",
                        "Promise of redemption"
                    ],
                    characters=[
                        {"name": "Serpent", "role": "Tempter"},
                        {"name": "Eve", "role": "First to be tempted and sin"},
                        {"name": "Adam", "role": "Participates in sin"},
                        {"name": "God", "role": "Judge and provider of hope"}
                    ],
                    structure=[
                        "The temptation (1-5)",
                        "The sin (6-7)",
                        "The confrontation (8-13)",
                        "The curses (14-19)",
                        "The provision and expulsion (20-24)"
                    ]
                )
            else:
                return ChapterIntroduction(
                    summary="Early history continues",
                    themes=[
                        "Human development",
                        "Sin's effects",
                        "God's sovereignty"
                    ],
                    characters=[
                        {"name": "Various individuals", "role": "Early human history participants"}
                    ],
                    structure=[
                        "Chapter events and developments"
                    ]
                )
        
        return ChapterIntroduction(
            summary="Chapter introduction not available",
            themes=[],
            characters=[],
            structure=[]
        )
    
    async def get_chapter_verses(self, book_id: str, chapter: int) -> List[Verse]:
        """Get verses for a specific chapter"""
        # Load verses from file if it exists
        verse_file = os.path.join(self.verses_dir, f"{book_id}_{chapter}.json")
        
        if os.path.exists(verse_file):
            data = await self._load_json_file(verse_file)
            return [Verse(**verse) for verse in data]
        
        # Return sample verses for Genesis 1 if file doesn't exist
        if book_id == "genesis" and chapter == 1:
            return [
                Verse(
                    number=1,
                    text="In the beginning, God created the heavens and the earth.",
                    explanation="This opening verse establishes God as the eternal Creator who exists before all things."
                ),
                Verse(
                    number=2,
                    text="The earth was without form and void, and darkness was over the face of the deep.",
                    explanation="The earth existed in a state of chaos and emptiness before God's ordering work."
                ),
                Verse(
                    number=3,
                    text="And God said, 'Let there be light,' and there was light.",
                    explanation="God's word has creative power, demonstrating divine authority."
                )
            ]
        
        return [
            Verse(
                number=1,
                text="Sample verse text for this chapter.",
                explanation="Sample explanation for this verse."
            )
        ]
    
    async def get_current_reading_position(self, reading_progress: list) -> ReadingProgress:
        """Get current reading position for a user"""
        books = await self.get_all_books()
        current_book = books[0] if books else None
        current_chapter = 1
        overall_progress = 0
        
        if current_book:
            return ReadingProgress(
                current_book=current_book,
                current_chapter=current_chapter,
                overall_progress=overall_progress
            )
        
        # Fallback
        return ReadingProgress(
            current_book=BibleBook(id="genesis", name="Genesis", chapters=50, genre="Law"),
            current_chapter=1,
            overall_progress=0
        )