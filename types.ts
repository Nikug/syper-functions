export interface UserTestResult {
  id: string
  date: string
  userId: string
  textMode: string
  quoteId?: string
  source: string
  characters: number
  words: number
  duration: number
  wordsPerMinute: number
  accuracy: number
  correctness: number
}
