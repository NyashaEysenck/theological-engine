import { simulateNetworkDelay } from '../utils/helpers';
import { apiClient, ApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

interface Verse {
  number: number;
  text: string;
  explanation?: string;
}

class VerseService {
  async getChapterVerses(bookId: string, chapter: number): Promise<Verse[]> {
    try {
      // Try backend first
      const response = await apiClient.get<Verse[]>(
        API_ENDPOINTS.BIBLE.CHAPTER_VERSES(bookId, chapter)
      );
      return response;
    } catch (error) {
      console.warn('Backend verses request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return this.getMockVerses(bookId, chapter);
    }
  }

  private getMockVerses(bookId: string, chapter: number): Verse[] {
    // Sample verses for Genesis 1 (in a real app, this would come from a Bible API)
    if (bookId === 'genesis' && chapter === 1) {
      return [
        {
          number: 1,
          text: "In the beginning, God created the heavens and the earth.",
          explanation: "This opening verse establishes God as the eternal Creator who exists before all things. The Hebrew word 'bara' indicates creation ex nihilo (out of nothing), demonstrating God's absolute power and sovereignty."
        },
        {
          number: 2,
          text: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.",
          explanation: "The earth existed in a state of chaos and emptiness before God's ordering work. The Spirit's presence indicates the Trinity's involvement in creation from the beginning."
        },
        {
          number: 3,
          text: "And God said, 'Let there be light,' and there was light.",
          explanation: "God's word has creative power. This demonstrates that creation occurs through divine speech, showing the power and authority of God's word."
        },
        {
          number: 4,
          text: "And God saw that the light was good. And God separated the light from the darkness.",
          explanation: "God evaluates His creation as 'good,' establishing a moral framework. The separation of light and darkness introduces order and distinction."
        },
        {
          number: 5,
          text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.",
          explanation: "God names His creation, showing His authority over it. The pattern of evening and morning establishes the rhythm of time and the concept of days."
        }
      ];
    }

    if (bookId === 'genesis' && chapter === 2) {
      return [
        {
          number: 1,
          text: "Thus the heavens and the earth were finished, and all the host of them.",
          explanation: "This verse concludes the creation account, emphasizing the completeness and perfection of God's creative work."
        },
        {
          number: 2,
          text: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.",
          explanation: "God's rest doesn't indicate fatigue but completion and satisfaction with His work. This establishes the pattern for the Sabbath."
        },
        {
          number: 3,
          text: "So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation.",
          explanation: "The seventh day is set apart as holy, establishing the principle of sacred time and the importance of rest in God's design."
        }
      ];
    }

    // Default verses for other books/chapters
    return [
      {
        number: 1,
        text: "This is a sample verse from the selected chapter.",
        explanation: "This is a sample explanation that would provide context, original language insights, and application for this verse."
      },
      {
        number: 2,
        text: "Here is another verse that continues the narrative or teaching.",
        explanation: "Each verse explanation would include historical context, cross-references, and practical application."
      }
    ];
  }
}

export const verseService = new VerseService();