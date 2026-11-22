/**
 * Smart Output Normalizer for Live Coding Arena
 * Handles cross-language output comparison including:
 * - Line endings (\\r\\n vs \\n)
 * - Trailing/leading whitespace
 * - Array formatting ("[1, 2]" vs "[1,2]" vs "1, 2" vs "1 2")
 * - Number formatting and floating-point epsilon (1e-6)
 * - Booleans ("true" vs "True")
 * - 2D matrix / multi-line lists
 * - SQL table rows and whitespace padding
 */

export interface ComparisonResult {
  passed: boolean;
  normalizedActual: string;
  normalizedExpected: string;
  diffMessage?: string;
}

// Check if string is valid JSON
function tryParseJson(str: string): any {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// Check if string represents a number
function isNumeric(str: string): boolean {
  if (typeof str !== 'string' || str.trim() === '') return false;
  return !Number.isNaN(Number(str.trim()));
}

// Compare two numbers with floating-point tolerance
function compareNumbers(a: number, b: number, epsilon: number = 1e-6): boolean {
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  return Math.abs(a - b) <= epsilon;
}

// Clean and normalize multi-line strings
export function cleanRawOutput(raw: string): string {
  if (raw === undefined || raw === null) return '';
  return raw
    .toString()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

// Normalize array-like strings: "[1, 2]" -> "1, 2", "1,2" -> "1, 2", "[1,2,3]" -> "1, 2, 3"
function normalizeArrayString(str: string): string[] | null {
  const trimmed = str.trim();
  // Strip outer brackets if present: [1, 2, 3] or (1, 2, 3)
  const bracketMatch = trimmed.match(/^\[(.*)\]$/s) || trimmed.match(/^\((.*)\)$/s);
  const content = bracketMatch ? bracketMatch[1].trim() : trimmed;

  // If contains commas: "1, 2, 3" or "1,2,3"
  if (content.includes(',')) {
    const items = content.split(',').map((s) => s.trim());
    return items;
  }

  // If space-separated: "1 2 3" (and not multi-line text)
  if (!content.includes('\n') && content.includes(' ')) {
    const items = content.split(/\s+/).map((s) => s.trim()).filter(Boolean);
    // Only treat as array if elements look homogeneous (e.g. numbers or booleans)
    const allNumbersOrBools = items.every(
      (it) => isNumeric(it) || /^(true|false)$/i.test(it)
    );
    if (allNumbersOrBools && items.length > 1) {
      return items;
    }
  }

  return null;
}

// Deep compare two JSON-parsed values
function deepCompareJson(actual: any, expected: any): boolean {
  if (actual === expected) return true;
  if (typeof actual === 'number' && typeof expected === 'number') {
    return compareNumbers(actual, expected);
  }
  if (typeof actual === 'boolean' && typeof expected === 'boolean') {
    return actual === expected;
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!deepCompareJson(actual[i], expected[i])) return false;
    }
    return true;
  }
  if (typeof actual === 'object' && typeof expected === 'object' && actual !== null && expected !== null) {
    const actualKeys = Object.keys(actual).sort();
    const expectedKeys = Object.keys(expected).sort();
    if (actualKeys.length !== expectedKeys.length) return false;
    for (let i = 0; i < actualKeys.length; i++) {
      if (actualKeys[i] !== expectedKeys[i]) return false;
      if (!deepCompareJson(actual[actualKeys[i]], expected[expectedKeys[i]])) return false;
    }
    return true;
  }
  return false;
}

/**
 * Compare actual user output against expected output with smart tolerance:
 * 1. Exact string match after trimming
 * 2. Case-insensitive boolean match ("True" == "true")
 * 3. Numeric match with epsilon 1e-6
 * 4. Array token match: ignores comma/bracket/spacing discrepancies
 * 5. Multi-line line-by-line comparison
 */
export function compareOutputs(actualRaw: string, expectedRaw: string): ComparisonResult {
  const actualClean = cleanRawOutput(actualRaw);
  const expectedClean = cleanRawOutput(expectedRaw);

  // 1. Direct match
  if (actualClean === expectedClean) {
    return { passed: true, normalizedActual: actualClean, normalizedExpected: expectedClean };
  }

  // 2. Boolean normalization: "True" vs "true"
  const isBoolActual = /^(true|false)$/i.test(actualClean);
  const isBoolExpected = /^(true|false)$/i.test(expectedClean);
  if (isBoolActual && isBoolExpected) {
    const passed = actualClean.toLowerCase() === expectedClean.toLowerCase();
    return {
      passed,
      normalizedActual: actualClean.toLowerCase(),
      normalizedExpected: expectedClean.toLowerCase(),
      diffMessage: passed ? undefined : `Expected boolean '${expectedClean.toLowerCase()}', but got '${actualClean.toLowerCase()}'`
    };
  }

  // 3. Numeric comparison
  if (isNumeric(actualClean) && isNumeric(expectedClean)) {
    const passed = compareNumbers(Number(actualClean), Number(expectedClean));
    return {
      passed,
      normalizedActual: actualClean,
      normalizedExpected: expectedClean,
      diffMessage: passed ? undefined : `Expected number '${expectedClean}', but got '${actualClean}'`
    };
  }

  // 4. JSON Structure match
  const jsonActual = tryParseJson(actualClean);
  const jsonExpected = tryParseJson(expectedClean);
  if (jsonActual !== null && jsonExpected !== null) {
    const passed = deepCompareJson(jsonActual, jsonExpected);
    return {
      passed,
      normalizedActual: JSON.stringify(jsonActual),
      normalizedExpected: JSON.stringify(jsonExpected),
      diffMessage: passed ? undefined : `Structural mismatch in JSON output.`
    };
  }

  // 5. Array / List comparison (e.g. "0, 1" vs "[0, 1]" vs "0,1" vs "[0,1]")
  const arrActual = normalizeArrayString(actualClean);
  const arrExpected = normalizeArrayString(expectedClean);
  if (arrActual && arrExpected && arrActual.length === arrExpected.length) {
    let allElementsMatch = true;
    for (let i = 0; i < arrActual.length; i++) {
      const a = arrActual[i];
      const e = arrExpected[i];
      if (a === e) continue;
      if (isNumeric(a) && isNumeric(e) && compareNumbers(Number(a), Number(e))) continue;
      if (/^(true|false)$/i.test(a) && /^(true|false)$/i.test(e) && a.toLowerCase() === e.toLowerCase()) continue;
      allElementsMatch = false;
      break;
    }
    if (allElementsMatch) {
      return {
        passed: true,
        normalizedActual: arrActual.join(', '),
        normalizedExpected: arrExpected.join(', ')
      };
    }
  }

  // 6. Multi-line comparison
  const linesActual = actualClean.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const linesExpected = expectedClean.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

  if (linesActual.length === linesExpected.length && linesActual.length > 1) {
    let allLinesMatch = true;
    for (let i = 0; i < linesActual.length; i++) {
      const cmp = compareOutputs(linesActual[i], linesExpected[i]);
      if (!cmp.passed) {
        allLinesMatch = false;
        break;
      }
    }
    if (allLinesMatch) {
      return {
        passed: true,
        normalizedActual: linesActual.join('\n'),
        normalizedExpected: linesExpected.join('\n')
      };
    }
  }

  // Return failed comparison
  return {
    passed: false,
    normalizedActual: actualClean,
    normalizedExpected: expectedClean,
    diffMessage: `Output discrepancy: Expected "${expectedClean}", but received "${actualClean}".`
  };
}
