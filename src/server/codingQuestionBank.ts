import { CodingCategory, Difficulty, ProgrammingLanguage, CodingProblem } from '../types';
import { EASY_PROBLEMS } from './problemBank/easyProblems';
import type { InternalCodingProblem } from './problemBank/easyProblems';
import { MEDIUM_PROBLEMS } from './problemBank/mediumProblems';
import { HARD_PROBLEMS } from './problemBank/hardProblems';

export type { InternalCodingProblem };

// The 50-Problem Comprehensive Validated Catalog (20 Easy, 20 Medium, 10 Hard)
export const CURATED_CODING_PROBLEMS: InternalCodingProblem[] = [
  ...EASY_PROBLEMS,
  ...MEDIUM_PROBLEMS,
  ...HARD_PROBLEMS
];

export function getProblemById(id: string): InternalCodingProblem | undefined {
  return CURATED_CODING_PROBLEMS.find((p) => p.id === id);
}

export function getAllProblems(): InternalCodingProblem[] {
  return CURATED_CODING_PROBLEMS;
}

export function getProblemsByCategoryAndDifficulty(
  category?: string,
  difficulty?: Difficulty
): InternalCodingProblem[] {
  return CURATED_CODING_PROBLEMS.filter((p) => {
    const matchCategory =
      !category ||
      category === 'All' ||
      category === 'Data Structures and Algorithms' || // general umbrella
      p.category === category ||
      (category === 'Problem Solving' && (p.category === 'Problem Solving' || p.category === 'Arrays and Strings')) ||
      (category === 'Searching and Sorting' && (p.category === 'Searching and Sorting' || p.tags.includes('Binary Search')));

    const matchDifficulty = !difficulty || p.difficulty === difficulty;
    return matchCategory && matchDifficulty;
  });
}
