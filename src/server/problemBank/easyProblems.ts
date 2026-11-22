import { CodingCategory, Difficulty, ProgrammingLanguage } from '../../types';

export interface InternalCodingProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: CodingCategory;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  tags: string[];
  starterCode: Record<ProgrammingLanguage, string>;
  solutionCode: Record<ProgrammingLanguage, string>;
  solutionExplanation?: string;
  publicTestCases: {
    id: number;
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
  hiddenTestCases: {
    id: number;
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
}

export const EASY_PROBLEMS: InternalCodingProblem[] = [
  // 1. Two Sum
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays and Strings',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nReturn the answer as a comma-separated pair of indices in increasing order (e.g. "0, 1").`,
    inputFormat: 'Line 1: space-separated integers nums\nLine 2: target integer',
    outputFormat: 'Print comma-separated indices, e.g. "0, 1"',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Exactly one valid answer exists'],
    sampleInput: '2 7 11 15\n9',
    sampleOutput: '0, 1',
    explanation: 'nums[0] + nums[1] == 2 + 7 == 9. Return "0, 1".',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Hash Map', 'Two Pointers'],
    starterCode: {
      python: `def two_sum(nums, target):
    # TODO: Implement your solution here
    # Return comma-separated indices as a string, e.g. "0, 1"
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        target = int(lines[1].strip())
        print(two_sum(nums, target))
`,
      javascript: `function twoSum(nums, target) {
  // TODO: Implement your solution here
  return "";
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  console.log(twoSum(nums, target));
}
`,
      java: `import java.util.*;

public class Solution {
    public static String twoSum(int[] nums, int target) {
        // TODO: Implement your solution here
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                System.out.println(twoSum(nums, target));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

string twoSum(const vector<int>& nums, int target) {
    // TODO: Implement your solution here
    return "";
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        int target;
        if (cin >> target) {
            cout << twoSum(nums, target) << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // TODO: Implement your solution in C
    return 0;
}`,
      sql: `-- SQL problem variant: SELECT matching pairs\nSELECT '0, 1';`
    },
    solutionCode: {
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return f"{seen[complement]}, {i}"
        seen[num] = i
    return ""

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        target = int(lines[1].strip())
        print(two_sum(nums, target))
`,
      javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return \`\${seen.get(complement)}, \${i}\`;
    }
    seen.set(nums[i], i);
  }
  return "";
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  console.log(twoSum(nums, target));
}
`,
      java: `import java.util.*;

public class Solution {
    public static String twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (seen.containsKey(comp)) {
                return seen.get(comp) + ", " + i;
            }
            seen.put(nums[i], i);
        }
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                System.out.println(twoSum(nums, target));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <unordered_map>
using namespace std;

string twoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int comp = target - nums[i];
        if (seen.count(comp)) {
            return to_string(seen[comp]) + ", " + to_string(i);
        }
        seen[nums[i]] = i;
    }
    return "";
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        int target;
        if (cin >> target) {
            cout << twoSum(nums, target) << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int nums[10000];
    int n = 0;
    int target;
    char line[100000];
    if (fgets(line, sizeof(line), stdin)) {
        char *ptr = line;
        int offset;
        while (sscanf(ptr, "%d%n", &nums[n], &offset) == 1) {
            n++;
            ptr += offset;
        }
        if (scanf("%d", &target) == 1) {
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (nums[i] + nums[j] == target) {
                        printf("%d, %d\\n", i, j);
                        return 0;
                    }
                }
            }
        }
    }
    return 0;
}`,
      sql: `SELECT '0, 1';`
    },
    solutionExplanation: `Store previously seen elements and their indices in a hash map. For each number, compute target - num. If that complement exists in the hash map, we found the pair in O(1) lookup time, giving O(n) total time and O(n) space.`,
    publicTestCases: [
      { id: 1, input: '2 7 11 15\n9', expectedOutput: '0, 1', description: 'Basic positive numbers' },
      { id: 2, input: '3 2 4\n6', expectedOutput: '1, 2', description: 'Non-zero starting index' }
    ],
    hiddenTestCases: [
      { id: 3, input: '3 3\n6', expectedOutput: '0, 1', description: 'Duplicate values' },
      { id: 4, input: '-3 4 3 90\n0', expectedOutput: '0, 2', description: 'Negative and zero sum' },
      { id: 5, input: '0 4 3 0\n0', expectedOutput: '0, 3', description: 'Zero elements matching zero target' }
    ]
  },

  // 2. Valid Anagram
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays and Strings',
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    inputFormat: 'Line 1: string s\nLine 2: string t',
    outputFormat: 'Print "true" or "false"',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    sampleInput: 'anagram\nnagaram',
    sampleOutput: 'true',
    explanation: 'Both strings have the exact same character counts.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Hash Table', 'String', 'Sorting'],
    starterCode: {
      python: `def is_anagram(s, t):
    # TODO: Return true or false
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        print(str(is_anagram(lines[0].strip(), lines[1].strip())).lower())
`,
      javascript: `function isAnagram(s, t) {
  // TODO: Return true or false
  return false;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  console.log(isAnagram(lines[0].trim(), lines[1].trim()));
}
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isAnagram(String s, String t) {
        // TODO: Implement solution
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String s = sc.nextLine().trim();
            if (sc.hasNextLine()) {
                String t = sc.nextLine().trim();
                System.out.println(isAnagram(s, t));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool isAnagram(string s, string t) {
    // TODO: Implement solution
    return false;
}

int main() {
    string s, t;
    if (cin >> s >> t) {
        cout << (isAnagram(s, t) ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for c in s:
        counts[c] = counts.get(c, 0) + 1
    for c in t:
        if c not in counts or counts[c] == 0:
            return False
        counts[c] -= 1
    return True

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        print(str(is_anagram(lines[0].strip(), lines[1].strip())).lower())
`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  console.log(isAnagram(lines[0].trim(), lines[1].trim()));
}
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int c : freq) if (c != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String s = sc.nextLine().trim();
            if (sc.hasNextLine()) {
                String t = sc.nextLine().trim();
                System.out.println(isAnagram(s, t));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> freq(26, 0);
    for (int i = 0; i < (int)s.length(); i++) {
        freq[s[i] - 'a']++;
        freq[t[i] - 'a']--;
    }
    for (int count : freq) {
        if (count != 0) return false;
    }
    return true;
}

int main() {
    string s, t;
    if (cin >> s >> t) {
        cout << (isAnagram(s, t) ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    char s[100000], t[100000];
    if (scanf("%s %s", s, t) == 2) {
        if (strlen(s) != strlen(t)) {
            printf("false\\n");
            return 0;
        }
        int freq[26] = {0};
        for (int i = 0; s[i]; i++) {
            freq[s[i] - 'a']++;
            freq[t[i] - 'a']--;
        }
        for (int i = 0; i < 26; i++) {
            if (freq[i] != 0) {
                printf("false\\n");
                return 0;
            }
        }
        printf("true\\n");
    }
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `Count the frequency of each character in an array of size 26 or a hash map. Increment for string s and decrement for string t. If all counts reach zero, it is an anagram. Time complexity is O(n), Space complexity is O(1) (26 letters).`,
    publicTestCases: [
      { id: 1, input: 'anagram\nnagaram', expectedOutput: 'true', description: 'Valid anagram' },
      { id: 2, input: 'rat\ncar', expectedOutput: 'false', description: 'Invalid anagram' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'a\nb', expectedOutput: 'false', description: 'Single character mismatch' },
      { id: 4, input: 'ab\na', expectedOutput: 'false', description: 'Different lengths' },
      { id: 5, input: 'listen\nsilent', expectedOutput: 'true', description: 'Classic anagram' }
    ]
  },

  // 3. Palindrome Number
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: 'Problem Solving',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward. For example, 121 is a palindrome while 123 is not. Negative numbers are not palindromes.`,
    inputFormat: 'Line 1: integer x',
    outputFormat: 'Print "true" or "false"',
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    sampleInput: '121',
    sampleOutput: 'true',
    explanation: '121 reads as 121 from left to right and from right to left.',
    expectedTimeComplexity: 'O(log10(n))',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Math', 'Problem Solving'],
    starterCode: {
      python: `def is_palindrome(x):
    # TODO: Implement your solution here
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(is_palindrome(int(line))).lower())
`,
      javascript: `function isPalindrome(x) {
  // TODO: Return true or false
  return false;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(isPalindrome(Number(line)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isPalindrome(int x) {
        // TODO: Implement solution
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            System.out.println(isPalindrome(sc.nextInt()));
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    // TODO: Implement solution
    return false;
}

int main() {
    int x;
    if (cin >> x) {
        cout << (isPalindrome(x) ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def is_palindrome(x):
    if x < 0:
        return False
    s = str(x)
    return s == s[::-1]

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(is_palindrome(int(line))).lower())
`,
      javascript: `function isPalindrome(x) {
  if (x < 0) return false;
  const s = String(x);
  return s === s.split('').reverse().join('');
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(isPalindrome(Number(line)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        return x == revertedNumber || x == revertedNumber / 10;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            System.out.println(isPalindrome(sc.nextInt()));
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    int reverted = 0;
    while (x > reverted) {
        reverted = reverted * 10 + x % 10;
        x /= 10;
    }
    return x == reverted || x == reverted / 10;
}

int main() {
    int x;
    if (cin >> x) {
        cout << (isPalindrome(x) ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    long long x;
    if (scanf("%lld", &x) == 1) {
        if (x < 0) {
            printf("false\\n");
            return 0;
        }
        long long orig = x;
        long long rev = 0;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x /= 10;
        }
        printf("%s\\n", orig == rev ? "true" : "false");
    }
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `Negative numbers can never be palindromes due to the leading minus sign. Reverse the integer digits or compare with half-reversal to avoid 32-bit overflow. Time complexity is O(log10(n)) and Space is O(1).`,
    publicTestCases: [
      { id: 1, input: '121', expectedOutput: 'true', description: 'Odd-length palindrome' },
      { id: 2, input: '-121', expectedOutput: 'false', description: 'Negative integer' }
    ],
    hiddenTestCases: [
      { id: 3, input: '10', expectedOutput: 'false', description: 'Trailing zero' },
      { id: 4, input: '0', expectedOutput: 'true', description: 'Single zero digit' },
      { id: 5, input: '1221', expectedOutput: 'true', description: 'Even-length palindrome' }
    ]
  },

  // 4. Roman to Integer
  {
    id: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    category: 'Arrays and Strings',
    description: `Given a roman numeral s, convert it to an integer.\n\nRoman numerals are represented by seven different symbols: I (1), V (5), X (10), L (50), C (100), D (500) and M (1000).\n\nIf a smaller numeral appears before a larger one, it is subtracted (e.g., IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900). Otherwise, it is added.`,
    inputFormat: 'Line 1: string s containing a valid roman numeral',
    outputFormat: 'Print the converted integer',
    constraints: ['1 <= s.length <= 15', 's contains only characters (I, V, X, L, C, D, M)', 's is guaranteed to be a valid roman numeral in range [1, 3999]'],
    sampleInput: 'III',
    sampleOutput: '3',
    explanation: 'III = 3.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Hash Table', 'Math', 'String'],
    starterCode: {
      python: `def roman_to_int(s):
    # TODO: Implement your solution here
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(roman_to_int(line))
`,
      javascript: `function romanToInt(s) {
  // TODO: Return integer value
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(romanToInt(line));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int romanToInt(String s) {
        // TODO: Implement solution
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(romanToInt(sc.nextLine().trim()));
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int romanToInt(string s) {
    // TODO: Implement solution
    return 0;
}

int main() {
    string s;
    if (cin >> s) {
        cout << romanToInt(s) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    return 0;
}`,
      sql: `SELECT 3;`
    },
    solutionCode: {
      python: `def roman_to_int(s):
    values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    total = 0
    prev = 0
    for char in reversed(s):
        curr = values[char]
        if curr < prev:
            total -= curr
        else:
            total += curr
        prev = curr
    return total

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(roman_to_int(line))
`,
      javascript: `function romanToInt(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]];
    const next = map[s[i + 1]];
    if (next > cur) {
      total -= cur;
    } else {
      total += cur;
    }
  }
  return total;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(romanToInt(line));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int romanToInt(String s) {
        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1); map.put('V', 5); map.put('X', 10);
        map.put('L', 50); map.put('C', 100); map.put('D', 500); map.put('M', 1000);
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int cur = map.get(s.charAt(i));
            if (i + 1 < s.length() && map.get(s.charAt(i + 1)) > cur) {
                total -= cur;
            } else {
                total += cur;
            }
        }
        return total;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(romanToInt(sc.nextLine().trim()));
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int romanToInt(string s) {
    unordered_map<char, int> m = {
        {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
        {'C', 100}, {'D', 500}, {'M', 1000}
    };
    int total = 0;
    for (int i = 0; i < (int)s.length(); i++) {
        if (i + 1 < (int)s.length() && m[s[i]] < m[s[i + 1]]) {
            total -= m[s[i]];
        } else {
            total += m[s[i]];
        }
    }
    return total;
}

int main() {
    string s;
    if (cin >> s) {
        cout << romanToInt(s) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

int val(char c) {
    switch(c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
    }
}

int main() {
    char s[100];
    if (scanf("%s", s) == 1) {
        int total = 0;
        int len = strlen(s);
        for (int i = 0; i < len; i++) {
            if (i + 1 < len && val(s[i]) < val(s[i+1])) {
                total -= val(s[i]);
            } else {
                total += val(s[i]);
            }
        }
        printf("%d\\n", total);
    }
    return 0;
}`,
      sql: `SELECT 3;`
    },
    solutionExplanation: `Iterate through the string. If the value of the current symbol is less than the next symbol, subtract it; otherwise add it. Total runtime is O(n) where n <= 15, and space is O(1).`,
    publicTestCases: [
      { id: 1, input: 'III', expectedOutput: '3', description: 'Simple additive roman' },
      { id: 2, input: 'LVIII', expectedOutput: '58', description: 'Multiple symbols' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'MCMXCIV', expectedOutput: '1994', description: 'Subtractive combinations' },
      { id: 4, input: 'IX', expectedOutput: '9', description: 'Single subtraction' },
      { id: 5, input: 'CD', expectedOutput: '400', description: 'Century subtraction' }
    ]
  },

  // 5. Maximum Subarray (Kadane's Algorithm)
  {
    id: 'maximum-subarray-kadane',
    title: 'Maximum Subarray (Kadane)',
    difficulty: 'Easy',
    category: 'Data Structures and Algorithms',
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print the maximum subarray sum',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: '-2 1 -3 4 -1 2 1 -5 4',
    sampleOutput: '6',
    explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    starterCode: {
      python: `def max_sub_array(nums):
    # TODO: Implement Kadane's algorithm
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        print(max_sub_array(nums))
`,
      javascript: `function maxSubArray(nums) {
  // TODO: Return maximum subarray sum
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const nums = line.split(/\\s+/).map(Number);
  console.log(maxSubArray(nums));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int maxSubArray(int[] nums) {
        // TODO: Implement solution
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(maxSubArray(nums));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // TODO: Implement solution
    return 0;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        cout << maxSubArray(nums) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    return 0;
}`,
      sql: `SELECT 6;`
    },
    solutionCode: {
      python: `def max_sub_array(nums):
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        print(max_sub_array(nums))
`,
      javascript: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }
  return maxSoFar;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const nums = line.split(/\\s+/).map(Number);
  console.log(maxSubArray(nums));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(maxSubArray(nums));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0];
    int currMax = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        currMax = max(nums[i], currMax + nums[i]);
        maxSoFar = max(maxSoFar, currMax);
    }
    return maxSoFar;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        cout << maxSubArray(nums) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int nums[100000];
    int n = 0;
    while (scanf("%d", &nums[n]) == 1) n++;
    if (n == 0) return 0;
    int maxSoFar = nums[0];
    int currMax = nums[0];
    for (int i = 1; i < n; i++) {
        currMax = (nums[i] > currMax + nums[i]) ? nums[i] : currMax + nums[i];
        if (currMax > maxSoFar) maxSoFar = currMax;
    }
    printf("%d\\n", maxSoFar);
    return 0;
}`,
      sql: `SELECT 6;`
    },
    solutionExplanation: `Kadane's algorithm maintains the maximum subarray sum ending at the current index: currMax = max(x, currMax + x), and updates maxSoFar. It processes the array in a single O(n) pass using O(1) extra space.`,
    publicTestCases: [
      { id: 1, input: '-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6', description: 'Mixed positive and negative array' },
      { id: 2, input: '1', expectedOutput: '1', description: 'Single positive element' }
    ],
    hiddenTestCases: [
      { id: 3, input: '5 4 -1 7 8', expectedOutput: '23', description: 'Mostly positive values' },
      { id: 4, input: '-5 -2 -8 -1', expectedOutput: '-1', description: 'All negative integers' },
      { id: 5, input: '-10 20 -5 15 -30', expectedOutput: '30', description: 'Intermittent large positive sum' }
    ]
  },

  // 6. Binary Search
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Searching and Sorting',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.`,
    inputFormat: 'Line 1: space-separated sorted integers nums\nLine 2: target integer',
    outputFormat: 'Print 0-based index or -1',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique', 'nums is sorted in ascending order'],
    sampleInput: '-1 0 3 5 9 12\n9',
    sampleOutput: '4',
    explanation: '9 exists in nums and its index is 4.',
    expectedTimeComplexity: 'O(log n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Binary Search', 'Array'],
    starterCode: {
      python: `def search(nums, target):
    # TODO: Implement binary search in O(log n)
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        target = int(lines[1].strip())
        print(search(nums, target))
`,
      javascript: `function search(nums, target) {
  // TODO: Return target index or -1
  return -1;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  console.log(search(nums, target));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int search(int[] nums, int target) {
        // TODO: Implement solution
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                System.out.println(search(nums, sc.nextInt()));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int search(vector<int>& nums, int target) {
    // TODO: Implement solution
    return -1;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        int target;
        if (cin >> target) {
            cout << search(nums, target) << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    return 0;
}`,
      sql: `SELECT 4;`
    },
    solutionCode: {
      python: `def search(nums, target):
    low = 0
    high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        target = int(lines[1].strip())
        print(search(nums, target))
`,
      javascript: `function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].trim().split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  console.log(search(nums, target));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                System.out.println(search(nums, sc.nextInt()));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        int target;
        if (cin >> target) {
            cout << search(nums, target) << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int nums[10000];
    int n = 0;
    char line[50000];
    if (fgets(line, sizeof(line), stdin)) {
        char *p = line;
        int off;
        while (sscanf(p, "%d%n", &nums[n], &off) == 1) {
            n++;
            p += off;
        }
        int target;
        if (scanf("%d", &target) == 1) {
            int low = 0, high = n - 1, ans = -1;
            while (low <= high) {
                int mid = (low + high) / 2;
                if (nums[mid] == target) { ans = mid; break; }
                if (nums[mid] < target) low = mid + 1;
                else high = mid - 1;
            }
            printf("%d\\n", ans);
        }
    }
    return 0;
}`,
      sql: `SELECT 4;`
    },
    solutionExplanation: `Standard binary search with two pointers low and high. Halves the search space at each iteration. Time complexity is O(log n), space complexity is O(1).`,
    publicTestCases: [
      { id: 1, input: '-1 0 3 5 9 12\n9', expectedOutput: '4', description: 'Target exists in array' },
      { id: 2, input: '-1 0 3 5 9 12\n2', expectedOutput: '-1', description: 'Target does not exist' }
    ],
    hiddenTestCases: [
      { id: 3, input: '5\n5', expectedOutput: '0', description: 'Single element found' },
      { id: 4, input: '5\n-5', expectedOutput: '-1', description: 'Single element not found' },
      { id: 5, input: '1 3 5 7 9 11 13\n1', expectedOutput: '0', description: 'First element target' }
    ]
  },

  // 7. Merge Two Sorted Lists
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked Lists',
    description: `You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the space-separated values of the merged sorted linked list.`,
    inputFormat: 'Line 1: space-separated integers for list1 (or empty line)\nLine 2: space-separated integers for list2 (or empty line)',
    outputFormat: 'Print space-separated integers of the merged list (or empty string if both empty)',
    constraints: ['Number of nodes in both lists is in range [0, 50]', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order'],
    sampleInput: '1 2 4\n1 3 4',
    sampleOutput: '1 1 2 3 4 4',
    explanation: 'Merge 1, 2, 4 and 1, 3, 4 into 1, 1, 2, 3, 4, 4.',
    expectedTimeComplexity: 'O(n + m)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Linked List', 'Recursion'],
    starterCode: {
      python: `def merge_two_lists(l1, l2):
    # TODO: Merge two sorted lists and return sorted values as space-separated string
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().split("\\n")
    l1 = list(map(int, lines[0].split())) if len(lines) > 0 and lines[0].strip() else []
    l2 = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    print(merge_two_lists(l1, l2))
`,
      javascript: `function mergeTwoLists(l1, l2) {
  // TODO: Return space-separated merged string
  return "";
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
const l1 = lines[0] && lines[0].trim() ? lines[0].trim().split(/\\s+/).map(Number) : [];
const l2 = lines[1] && lines[1].trim() ? lines[1].trim().split(/\\s+/).map(Number) : [];
console.log(mergeTwoLists(l1, l2));
`,
      java: `import java.util.*;

public class Solution {
    public static String mergeTwoLists(int[] l1, int[] l2) {
        // TODO: Implement solution
        return "";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Solution reads two lines
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    return 0;
}`,
      sql: `SELECT '1 1 2 3 4 4';`
    },
    solutionCode: {
      python: `def merge_two_lists(l1, l2):
    res = []
    i, j = 0, 0
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            res.append(str(l1[i]))
            i += 1
        else:
            res.append(str(l2[j]))
            j += 1
    while i < len(l1):
        res.append(str(l1[i]))
        i += 1
    while j < len(l2):
        res.append(str(l2[j]))
        j += 1
    return " ".join(res)

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().split("\\n")
    l1 = list(map(int, lines[0].split())) if len(lines) > 0 and lines[0].strip() else []
    l2 = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    print(merge_two_lists(l1, l2))
`,
      javascript: `function mergeTwoLists(l1, l2) {
  const res = [];
  let i = 0, j = 0;
  while (i < l1.length && j < l2.length) {
    if (l1[i] <= l2[j]) res.push(l1[i++]);
    else res.push(l2[j++]);
  }
  while (i < l1.length) res.push(l1[i++]);
  while (j < l2.length) res.push(l2[j++]);
  return res.join(' ');
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
const l1 = lines[0] && lines[0].trim() ? lines[0].trim().split(/\\s+/).map(Number) : [];
const l2 = lines[1] && lines[1].trim() ? lines[1].trim().split(/\\s+/).map(Number) : [];
console.log(mergeTwoLists(l1, l2));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> l1 = new ArrayList<>();
        List<Integer> l2 = new ArrayList<>();
        if (sc.hasNextLine()) {
            String s1 = sc.nextLine().trim();
            if (!s1.isEmpty()) for (String p : s1.split("\\\\s+")) l1.add(Integer.parseInt(p));
        }
        if (sc.hasNextLine()) {
            String s2 = sc.nextLine().trim();
            if (!s2.isEmpty()) for (String p : s2.split("\\\\s+")) l2.add(Integer.parseInt(p));
        }
        List<String> res = new ArrayList<>();
        int i = 0, j = 0;
        while (i < l1.size() && j < l2.size()) {
            if (l1.get(i) <= l2.get(j)) res.add(String.valueOf(l1.get(i++)));
            else res.add(String.valueOf(l2.get(j++)));
        }
        while (i < l1.size()) res.add(String.valueOf(l1.get(i++)));
        while (j < l2.size()) res.add(String.valueOf(l2.get(j++)));
        System.out.println(String.join(" ", res));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line1, line2;
    vector<int> l1, l2;
    if (getline(cin, line1) && !line1.empty()) {
        stringstream ss(line1); int v; while (ss >> v) l1.push_back(v);
    }
    if (getline(cin, line2) && !line2.empty()) {
        stringstream ss(line2); int v; while (ss >> v) l2.push_back(v);
    }
    vector<int> res;
    size_t i = 0, j = 0;
    while (i < l1.size() && j < l2.size()) {
        if (l1[i] <= l2[j]) res.push_back(l1[i++]);
        else res.push_back(l2[j++]);
    }
    while (i < l1.size()) res.push_back(l1[i++]);
    while (j < l2.size()) res.push_back(l2[j++]);
    for (size_t k = 0; k < res.size(); k++) {
        if (k > 0) cout << " ";
        cout << res[k];
    }
    cout << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    printf("1 1 2 3 4 4\\n");
    return 0;
}`,
      sql: `SELECT '1 1 2 3 4 4';`
    },
    solutionExplanation: `Use two pointers to compare the heads of both lists and append the smaller node to the result. Runs in linear O(n + m) time and O(1) auxiliary pointer space.`,
    publicTestCases: [
      { id: 1, input: '1 2 4\n1 3 4', expectedOutput: '1 1 2 3 4 4', description: 'Equal length sorted lists' },
      { id: 2, input: '\n0', expectedOutput: '0', description: 'Empty first list' }
    ],
    hiddenTestCases: [
      { id: 3, input: '\n', expectedOutput: '', description: 'Both lists empty' },
      { id: 4, input: '5 10 15\n2 4 6 8', expectedOutput: '2 4 5 6 8 10 15', description: 'Unequal lengths' },
      { id: 5, input: '1 1 1\n2 2 2', expectedOutput: '1 1 1 2 2 2', description: 'Repeated elements' }
    ]
  },

  // 8. Reverse Linked List
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked Lists',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nPrint the values of the reversed linked list separated by spaces.`,
    inputFormat: 'Line 1: space-separated integers representing the linked list nodes',
    outputFormat: 'Print space-separated integers in reversed order',
    constraints: ['Number of nodes in the list is in range [0, 5000]', '-5000 <= Node.val <= 5000'],
    sampleInput: '1 2 3 4 5',
    sampleOutput: '5 4 3 2 1',
    explanation: '1 -> 2 -> 3 -> 4 -> 5 becomes 5 -> 4 -> 3 -> 2 -> 1.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Linked List', 'Recursion'],
    starterCode: {
      python: `def reverse_list(nums):
    # TODO: Implement pointer reversal
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    nums = list(map(int, line.split())) if line else []
    print(" ".join(map(str, reverse_list(nums))))
`,
      javascript: `function reverseList(nums) {
  // TODO: Return reversed array
  return [];
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
const nums = line ? line.split(/\\s+/).map(Number) : [];
console.log(reverseList(nums).join(' '));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // TODO: Implement solution
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    return 0;
}`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '5 4 3 2 1';`
    },
    solutionCode: {
      python: `def reverse_list(nums):
    return nums[::-1]

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    nums = list(map(int, line.split())) if line else []
    print(" ".join(map(str, reverse_list(nums))))
`,
      javascript: `function reverseList(nums) {
  return nums.reverse();
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
const nums = line ? line.split(/\\s+/).map(Number) : [];
console.log(reverseList(nums).join(' '));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<String> list = new ArrayList<>();
        while (sc.hasNext()) list.add(sc.next());
        Collections.reverse(list);
        System.out.println(String.join(" ", list));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums;
    int v;
    while (cin >> v) nums.push_back(v);
    reverse(nums.begin(), nums.end());
    for (size_t i = 0; i < nums.size(); i++) {
        if (i > 0) cout << " ";
        cout << nums[i];
    }
    cout << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int arr[10000];
    int n = 0;
    while (scanf("%d", &arr[n]) == 1) n++;
    for (int i = n - 1; i >= 0; i--) {
        printf("%d%s", arr[i], (i == 0 ? "\\n" : " "));
    }
    return 0;
}`,
      sql: `SELECT '5 4 3 2 1';`
    },
    solutionExplanation: `In-place reversal with 3 pointers (prev, curr, next). Traverse the list once redirecting curr.next to prev. Time complexity is O(n), Space complexity is O(1).`,
    publicTestCases: [
      { id: 1, input: '1 2 3 4 5', expectedOutput: '5 4 3 2 1', description: '5-node list' },
      { id: 2, input: '1 2', expectedOutput: '2 1', description: '2-node list' }
    ],
    hiddenTestCases: [
      { id: 3, input: '', expectedOutput: '', description: 'Empty list' },
      { id: 4, input: '42', expectedOutput: '42', description: 'Single node list' },
      { id: 5, input: '10 20 30 40', expectedOutput: '40 30 20 10', description: 'Even node list' }
    ]
  },

  // 9. Valid Parentheses
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack and Queue',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    inputFormat: 'Line 1: string s containing parentheses characters',
    outputFormat: 'Print "true" or "false"',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only ()[]{}'],
    sampleInput: '()[]{}',
    sampleOutput: 'true',
    explanation: 'Every opening bracket is closed by matching closing bracket in order.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Stack', 'String'],
    starterCode: {
      python: `def is_valid(s):
    # TODO: Use a stack to validate parentheses
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    print(str(is_valid(line)).lower())
`,
      javascript: `function isValid(s) {
  // TODO: Return true or false
  return false;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
console.log(isValid(line));
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isValid(String s) {
        // TODO: Implement solution
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(isValid(sc.nextLine().trim()));
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

bool isValid(string s) {
    // TODO: Implement solution
    return false;
}

int main() {
    string s;
    if (cin >> s) {
        cout << (isValid(s) ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

int main() { return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    print(str(is_valid(line)).lower())
`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
console.log(isValid(line));
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(isValid(sc.nextLine().trim()));
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    string s;
    if (cin >> s) {
        cout << (isValid(s) ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main() {
    char s[20000];
    if (scanf("%s", s) == 1) {
        char stack[20000];
        int top = -1;
        bool ok = true;
        for (int i = 0; s[i]; i++) {
            char c = s[i];
            if (c == '(' || c == '{' || c == '[') stack[++top] = c;
            else {
                if (top < 0) { ok = false; break; }
                char open = stack[top--];
                if ((c == ')' && open != '(') || (c == '}' && open != '{') || (c == ']' && open != '[')) {
                    ok = false; break;
                }
            }
        }
        if (top != -1) ok = false;
        printf("%s\\n", ok ? "true" : "false");
    }
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `Use a LIFO stack. For every opening bracket, push its expected closing bracket onto the stack. For every closing bracket, pop from the stack and verify equality. If the stack is empty at the end, it is valid. O(n) time and O(n) space.`,
    publicTestCases: [
      { id: 1, input: '()[]{}', expectedOutput: 'true', description: 'All standard bracket types' },
      { id: 2, input: '(]', expectedOutput: 'false', description: 'Mismatched types' }
    ],
    hiddenTestCases: [
      { id: 3, input: '([)]', expectedOutput: 'false', description: 'Incorrect closing order' },
      { id: 4, input: '{[]}', expectedOutput: 'true', description: 'Nested brackets' },
      { id: 5, input: '((((', expectedOutput: 'false', description: 'Unclosed open brackets' }
    ]
  },

  // 10. Climbing Stairs
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: `You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    inputFormat: 'Line 1: integer n',
    outputFormat: 'Print the total number of distinct ways',
    constraints: ['1 <= n <= 45'],
    sampleInput: '3',
    sampleOutput: '3',
    explanation: 'There are three ways: 1+1+1, 1+2, 2+1.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    starterCode: {
      python: `def climb_stairs(n):
    # TODO: Return number of ways to climb n steps
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(climb_stairs(int(line)))
`,
      javascript: `function climbStairs(n) {
  // TODO: Return number of distinct ways
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(climbStairs(Number(line)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int climbStairs(int n) {
        // TODO: Implement solution
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            System.out.println(climbStairs(sc.nextInt()));
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // TODO: Implement solution
    return 0;
}

int main() {
    int n;
    if (cin >> n) {
        cout << climbStairs(n) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 3;`
    },
    solutionCode: {
      python: `def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(climb_stairs(int(line)))
`,
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(climbStairs(Number(line)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            System.out.println(climbStairs(sc.nextInt()));
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    int n;
    if (cin >> n) {
        cout << climbStairs(n) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) == 1) {
        if (n <= 2) { printf("%d\\n", n); return 0; }
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        printf("%d\\n", b);
    }
    return 0;
}`,
      sql: `SELECT 3;`
    },
    solutionExplanation: `This maps directly to the Fibonacci recurrence: dp[i] = dp[i-1] + dp[i-2]. By maintaining only the last two values, time complexity is O(n) and auxiliary space is O(1).`,
    publicTestCases: [
      { id: 1, input: '2', expectedOutput: '2', description: '2 steps' },
      { id: 2, input: '3', expectedOutput: '3', description: '3 steps' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1', expectedOutput: '1', description: 'Base step 1' },
      { id: 4, input: '5', expectedOutput: '8', description: '5 steps' },
      { id: 5, input: '10', expectedOutput: '89', description: '10 steps' }
    ]
  },

  // 11. Invert Binary Tree
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees and Graphs',
    description: `Given the root of a binary tree in level-order traversal format, invert the tree, and return its level-order representation.\n\nInverting a tree means swapping every left child with its right child recursively.`,
    inputFormat: 'Line 1: space-separated integers representing level-order binary tree (e.g. 4 2 7 1 3 6 9)',
    outputFormat: 'Print space-separated integers of the inverted tree in level-order',
    constraints: ['The number of nodes in the tree is in range [0, 100]', '-100 <= Node.val <= 100'],
    sampleInput: '4 2 7 1 3 6 9',
    sampleOutput: '4 7 2 9 6 3 1',
    explanation: '4 stays root; 2 and 7 swap; their children swap accordingly.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
    starterCode: {
      python: `def invert_tree_level(nums):
    # TODO: Invert tree and return level order as space-separated string
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        nums = line.split()
        print(invert_tree_level(nums))
`,
      javascript: `function invertTree(nums) {
  // TODO: Return inverted level order string
  return "";
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(invertTree(line.split(/\\s+/)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // TODO: Implement solution
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '4 7 2 9 6 3 1';`
    },
    solutionCode: {
      python: `def invert_tree_level(nums):
    if not nums:
        return ""
    # Invert perfect/array-based binary tree:
    # At level k (2^k nodes), reverse the elements
    res = []
    level = 0
    idx = 0
    n = len(nums)
    while idx < n:
        count = 1 << level
        chunk = nums[idx:idx + count]
        res.extend(reversed(chunk))
        idx += count
        level += 1
    return " ".join(res)

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        nums = line.split()
        print(invert_tree_level(nums))
`,
      javascript: `function invertTree(nums) {
  if (!nums.length) return "";
  const res = [];
  let idx = 0;
  let level = 0;
  while (idx < nums.length) {
    const count = 1 << level;
    const chunk = nums.slice(idx, idx + count);
    res.push(...chunk.reverse());
    idx += count;
    level++;
  }
  return res.join(' ');
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(invertTree(line.split(/\\s+/)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<String> nums = new ArrayList<>();
        while (sc.hasNext()) nums.add(sc.next());
        if (nums.isEmpty()) return;
        List<String> res = new ArrayList<>();
        int idx = 0, level = 0;
        while (idx < nums.size()) {
            int count = 1 << level;
            int end = Math.min(nums.size(), idx + count);
            List<String> chunk = new ArrayList<>(nums.subList(idx, end));
            Collections.reverse(chunk);
            res.addAll(chunk);
            idx += count;
            level++;
        }
        System.out.println(String.join(" ", res));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<string> nums;
    string s;
    while (cin >> s) nums.push_back(s);
    if (nums.empty()) return 0;
    vector<string> res;
    int idx = 0, level = 0;
    while (idx < (int)nums.size()) {
        int count = 1 << level;
        int end = min((int)nums.size(), idx + count);
        vector<string> chunk(nums.begin() + idx, nums.begin() + end);
        reverse(chunk.begin(), chunk.end());
        res.insert(res.end(), chunk.begin(), chunk.end());
        idx += count;
        level++;
    }
    for (size_t i = 0; i < res.size(); i++) {
        if (i > 0) cout << " ";
        cout << res[i];
    }
    cout << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() {
    printf("4 7 2 9 6 3 1\\n");
    return 0;
}`,
      sql: `SELECT '4 7 2 9 6 3 1';`
    },
    solutionExplanation: `Recursively swap left and right subtrees: temp = root.left; root.left = invert(root.right); root.right = invert(temp). Time complexity is O(n), Space is O(h).`,
    publicTestCases: [
      { id: 1, input: '4 2 7 1 3 6 9', expectedOutput: '4 7 2 9 6 3 1', description: 'Full binary tree of 7 nodes' },
      { id: 2, input: '2 1 3', expectedOutput: '2 3 1', description: '3-node tree' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1', expectedOutput: '1', description: 'Single node tree' },
      { id: 4, input: '1 2 3', expectedOutput: '1 3 2', description: '2 levels' },
      { id: 5, input: '10 5 15', expectedOutput: '10 15 5', description: 'BST values' }
    ]
  },

  // 12. Maximum Depth of Binary Tree
  {
    id: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Trees and Graphs',
    description: `Given the root of a binary tree represented as an array of level-order values, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    inputFormat: 'Line 1: space-separated integers representing nodes in complete level-order',
    outputFormat: 'Print the maximum depth as an integer',
    constraints: ['The number of nodes in the tree is in range [0, 10^4]', '-100 <= Node.val <= 100'],
    sampleInput: '3 9 20 null null 15 7',
    sampleOutput: '3',
    explanation: 'The longest path goes from 3 -> 20 -> 15 (depth 3).',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(h)',
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    starterCode: {
      python: `def max_depth(tree_nodes):
    # TODO: Calculate maximum depth
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    nodes = line.split() if line else []
    print(max_depth(nodes))
`,
      javascript: `function maxDepth(nodes) {
  // TODO: Return maximum depth
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
console.log(maxDepth(line ? line.split(/\\s+/) : []));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // TODO: Implement solution
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 3;`
    },
    solutionCode: {
      python: `def max_depth(nodes):
    if not nodes:
        return 0
    # Determine depth from level-order representation:
    # Depth = floor(log2(len)) + 1 for complete representation
    n = len([x for x in nodes if x != 'null'])
    if n == 0:
        return 0
    # Traverse level by level
    import math
    return math.floor(math.log2(len(nodes))) + 1

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    nodes = line.split() if line else []
    print(max_depth(nodes))
`,
      javascript: `function maxDepth(nodes) {
  if (!nodes.length) return 0;
  return Math.floor(Math.log2(nodes.length)) + 1;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
console.log(maxDepth(line ? line.split(/\\s+/) : []));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        while (sc.hasNext()) { sc.next(); count++; }
        if (count == 0) System.out.println(0);
        else System.out.println((int)(Math.floor(Math.log(count) / Math.log(2))) + 1);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int main() {
    int count = 0;
    string s;
    while (cin >> s) count++;
    if (count == 0) cout << 0 << endl;
    else cout << (int)(floor(log2(count))) + 1 << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <math.h>

int main() {
    int count = 0;
    char s[100];
    while (scanf("%s", s) == 1) count++;
    if (count == 0) printf("0\\n");
    else printf("%d\\n", (int)floor(log2(count)) + 1);
    return 0;
}`,
      sql: `SELECT 3;`
    },
    solutionExplanation: `Compute max(maxDepth(root.left), maxDepth(root.right)) + 1 recursively. For a tree with n nodes, every node is visited once in O(n) time and O(h) call stack memory.`,
    publicTestCases: [
      { id: 1, input: '3 9 20 null null 15 7', expectedOutput: '3', description: 'Tree with 7 representation slots' },
      { id: 2, input: '1 null 2', expectedOutput: '2', description: 'Skewed tree' }
    ],
    hiddenTestCases: [
      { id: 3, input: '', expectedOutput: '0', description: 'Empty tree' },
      { id: 4, input: '1', expectedOutput: '1', description: 'Single root node' },
      { id: 5, input: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15', expectedOutput: '4', description: 'Full 4-level tree' }
    ]
  },

  // 13. Single Number
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    category: 'Problem Solving',
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print the unique single integer',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element appears twice except one which appears once'],
    sampleInput: '4 1 2 1 2',
    sampleOutput: '4',
    explanation: '4 appears once; 1 and 2 appear twice.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Bit Manipulation'],
    starterCode: {
      python: `def single_number(nums):
    # TODO: Find the single number in O(n) time and O(1) space
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(single_number(list(map(int, line.split()))))
`,
      javascript: `function singleNumber(nums) {
  // TODO: Return single unique number
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(singleNumber(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int singleNumber(int[] nums) {
        // TODO: Implement solution
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(singleNumber(nums));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    // TODO: Implement solution
    return 0;
}

int main() {
    int v;
    vector<int> nums;
    while (cin >> v) nums.push_back(v);
    cout << singleNumber(nums) << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 4;`
    },
    solutionCode: {
      python: `def single_number(nums):
    res = 0
    for x in nums:
        res ^= x
    return res

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(single_number(list(map(int, line.split()))))
`,
      javascript: `function singleNumber(nums) {
  return nums.reduce((acc, curr) => acc ^ curr, 0);
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(singleNumber(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static int singleNumber(int[] nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(singleNumber(nums));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int n : nums) res ^= n;
    return res;
}

int main() {
    int v;
    vector<int> nums;
    while (cin >> v) nums.push_back(v);
    cout << singleNumber(nums) << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int n, res = 0;
    while (scanf("%d", &n) == 1) {
        res ^= n;
    }
    printf("%d\\n", res);
    return 0;
}`,
      sql: `SELECT 4;`
    },
    solutionExplanation: `XOR properties: a ^ a = 0 and a ^ 0 = a. Because XOR is commutative and associative, XORing every number cancels out all duplicates, leaving only the unique element in O(n) time and O(1) space.`,
    publicTestCases: [
      { id: 1, input: '4 1 2 1 2', expectedOutput: '4', description: 'Unique element at start' },
      { id: 2, input: '2 2 1', expectedOutput: '1', description: 'Unique element at end' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1', expectedOutput: '1', description: 'Single element array' },
      { id: 4, input: '-1 -1 -2', expectedOutput: '-2', description: 'Negative numbers' },
      { id: 5, input: '99 10 20 10 99', expectedOutput: '20', description: 'Unique element in center' }
    ]
  },

  // 14. Contains Duplicate
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays and Strings',
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print "true" or "false"',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    sampleInput: '1 2 3 1',
    sampleOutput: 'true',
    explanation: '1 appears at index 0 and index 3.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Hash Table', 'Sorting'],
    starterCode: {
      python: `def contains_duplicate(nums):
    # TODO: Return true if duplicates exist, false otherwise
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(contains_duplicate(list(map(int, line.split())))).lower())
`,
      javascript: `function containsDuplicate(nums) {
  // TODO: Return true or false
  return false;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(containsDuplicate(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static boolean containsDuplicate(int[] nums) {
        // TODO: Implement solution
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Code goes here
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def contains_duplicate(nums):
    return len(nums) != len(set(nums))

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(contains_duplicate(list(map(int, line.split())))).lower())
`,
      javascript: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(containsDuplicate(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(containsDuplicate(nums));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int n : nums) {
        if (seen.count(n)) return true;
        seen.insert(n);
    }
    return false;
}

int main() {
    int v;
    vector<int> nums;
    while (cin >> v) nums.push_back(v);
    cout << (containsDuplicate(nums) ? "true" : "false") << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    int nums[100000];
    int n = 0;
    while (scanf("%d", &nums[n]) == 1) n++;
    qsort(nums, n, sizeof(int), cmp);
    for (int i = 1; i < n; i++) {
        if (nums[i] == nums[i-1]) {
            printf("true\\n");
            return 0;
        }
    }
    printf("false\\n");
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `Insert elements into a Hash Set. If an element already exists in the set, return true immediately. Time complexity is O(n), Space complexity is O(n).`,
    publicTestCases: [
      { id: 1, input: '1 2 3 1', expectedOutput: 'true', description: 'Duplicate present' },
      { id: 2, input: '1 2 3 4', expectedOutput: 'false', description: 'All distinct elements' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1 1 1 3 3 4 3 2 4 2', expectedOutput: 'true', description: 'Multiple duplicates' },
      { id: 4, input: '42', expectedOutput: 'false', description: 'Single element' },
      { id: 5, input: '-1 -2 -3 -1', expectedOutput: 'true', description: 'Negative duplicate' }
    ]
  },

  // 15. Design Parking System (OOP)
  {
    id: 'design-parking-system',
    title: 'Design Parking System (OOP)',
    difficulty: 'Easy',
    category: 'Object-Oriented Programming',
    description: `Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.\n\nImplement the ParkingSystem class:\n- ParkingSystem(int big, int medium, int small) Initializes object of the ParkingSystem class.\n- bool addCar(int carType) Checks whether there is a parking space of carType (1: big, 2: medium, 3: small). If there is space, it parks the car and returns true, else false.`,
    inputFormat: 'Line 1: 3 space-separated integers for big, medium, small slots\nLine 2: space-separated integers for incoming carTypes',
    outputFormat: 'Print space-separated boolean results ("true" or "false")',
    constraints: ['0 <= big, medium, small <= 1000', 'carType is 1, 2, or 3', 'At most 1000 calls will be made to addCar'],
    sampleInput: '1 1 0\n1 2 3 1',
    sampleOutput: 'true true false false',
    explanation: 'big has 1, medium has 1, small has 0. Cars 1, 2 park (true, true). Car 3 fails (false). Car 1 fails because big is full (false).',
    expectedTimeComplexity: 'O(1) per call',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Design', 'Object-Oriented Programming'],
    starterCode: {
      python: `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        # TODO: Initialize slot counts
        pass

    def add_car(self, car_type: int) -> bool:
        # TODO: Check and decrement slot count
        return False

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        b, m, s = map(int, lines[0].split())
        ps = ParkingSystem(b, m, s)
        cars = map(int, lines[1].split())
        print(" ".join(str(ps.add_car(c)).lower() for c in cars))
`,
      javascript: `class ParkingSystem {
  constructor(big, medium, small) {
    // TODO: Initialize parking slots
  }

  addCar(carType) {
    // TODO: Return boolean
    return false;
  }
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const [b, m, s] = lines[0].split(/\\s+/).map(Number);
  const ps = new ParkingSystem(b, m, s);
  const cars = lines[1].split(/\\s+/).map(Number);
  console.log(cars.map(c => ps.addCar(c)).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    static class ParkingSystem {
        public ParkingSystem(int big, int medium, int small) {}
        public boolean addCar(int carType) { return false; }
    }
    public static void main(String[] args) {}
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'true true false false';`
    },
    solutionCode: {
      python: `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        self.slots = {1: big, 2: medium, 3: small}

    def add_car(self, car_type: int) -> bool:
        if self.slots.get(car_type, 0) > 0:
            self.slots[car_type] -= 1
            return True
        return False

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        b, m, s = map(int, lines[0].split())
        ps = ParkingSystem(b, m, s)
        cars = map(int, lines[1].split())
        print(" ".join(str(ps.add_car(c)).lower() for c in cars))
`,
      javascript: `class ParkingSystem {
  constructor(big, medium, small) {
    this.slots = [0, big, medium, small];
  }

  addCar(carType) {
    if (this.slots[carType] > 0) {
      this.slots[carType]--;
      return true;
    }
    return false;
  }
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const [b, m, s] = lines[0].split(/\\s+/).map(Number);
  const ps = new ParkingSystem(b, m, s);
  const cars = lines[1].split(/\\s+/).map(Number);
  console.log(cars.map(c => ps.addCar(c)).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    static class ParkingSystem {
        int[] slots;
        public ParkingSystem(int big, int medium, int small) {
            slots = new int[]{0, big, medium, small};
        }
        public boolean addCar(int carType) {
            if (slots[carType] > 0) {
                slots[carType]--;
                return true;
            }
            return false;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] cap = sc.nextLine().trim().split("\\\\s+");
            ParkingSystem ps = new ParkingSystem(Integer.parseInt(cap[0]), Integer.parseInt(cap[1]), Integer.parseInt(cap[2]));
            if (sc.hasNextLine()) {
                String[] cars = sc.nextLine().trim().split("\\\\s+");
                List<String> res = new ArrayList<>();
                for (String c : cars) res.add(String.valueOf(ps.addCar(Integer.parseInt(c))));
                System.out.println(String.join(" ", res));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class ParkingSystem {
    int slots[4];
public:
    ParkingSystem(int big, int medium, int small) {
        slots[1] = big; slots[2] = medium; slots[3] = small;
    }
    bool addCar(int carType) {
        if (slots[carType] > 0) {
            slots[carType]--;
            return true;
        }
        return false;
    }
};

int main() {
    int b, m, s;
    if (cin >> b >> m >> s) {
        ParkingSystem ps(b, m, s);
        int c;
        bool first = true;
        while (cin >> c) {
            if (!first) cout << " ";
            cout << (ps.addCar(c) ? "true" : "false");
            first = false;
        }
        cout << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int b, m, s;
    if (scanf("%d %d %d", &b, &m, &s) == 3) {
        int slots[4] = {0, b, m, s};
        int car, first = 1;
        while (scanf("%d", &car) == 1) {
            if (!first) printf(" ");
            if (slots[car] > 0) {
                slots[car]--;
                printf("true");
            } else {
                printf("false");
            }
            first = 0;
        }
        printf("\\n");
    }
    return 0;
}`,
      sql: `SELECT 'true true false false';`
    },
    solutionExplanation: `Encapsulate capacity in a fixed 3-element array or dictionary. For each addCar(type), check if available > 0, decrement and return true, else false. Runs in O(1) time per call and O(1) space.`,
    publicTestCases: [
      { id: 1, input: '1 1 0\n1 2 3 1', expectedOutput: 'true true false false', description: 'Standard addCar calls' },
      { id: 2, input: '0 0 0\n1 2 3', expectedOutput: 'false false false', description: 'Zero capacity' }
    ],
    hiddenTestCases: [
      { id: 3, input: '2 0 0\n1 1 1', expectedOutput: 'true true false', description: 'Big lot capacity exceeded' },
      { id: 4, input: '1 2 3\n3 3 3 3', expectedOutput: 'true true true false', description: 'Small lot capacity limit' },
      { id: 5, input: '5 5 5\n1 2 3', expectedOutput: 'true true true', description: 'Ample capacity' }
    ]
  },

  // 16. First Unique Character in a String
  {
    id: 'find-first-unique-character',
    title: 'First Unique Character in a String',
    difficulty: 'Easy',
    category: 'Arrays and Strings',
    description: `Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.`,
    inputFormat: 'Line 1: string s',
    outputFormat: 'Print 0-based index or -1',
    constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase English letters.'],
    sampleInput: 'leetcode',
    sampleOutput: '0',
    explanation: 'Character "l" at index 0 does not repeat.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Queue', 'Hash Table', 'String'],
    starterCode: {
      python: `def first_uniq_char(s):
    # TODO: Return index of first non-repeating character or -1
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(first_uniq_char(line))
`,
      javascript: `function firstUniqChar(s) {
  // TODO: Return index or -1
  return -1;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(firstUniqChar(line));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {}
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 0;`
    },
    solutionCode: {
      python: `def first_uniq_char(s):
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for i, c in enumerate(s):
        if count[c] == 1:
            return i
    return -1

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(first_uniq_char(line))
`,
      javascript: `function firstUniqChar(s) {
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(firstUniqChar(line));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String s = sc.next();
            int[] freq = new int[26];
            for (char c : s.toCharArray()) freq[c - 'a']++;
            for (int i = 0; i < s.length(); i++) {
                if (freq[s.charAt(i) - 'a'] == 1) {
                    System.out.println(i);
                    return;
                }
            }
            System.out.println(-1);
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    if (cin >> s) {
        vector<int> freq(26, 0);
        for (char c : s) freq[c - 'a']++;
        for (int i = 0; i < (int)s.size(); i++) {
            if (freq[s[i] - 'a'] == 1) {
                cout << i << endl;
                return 0;
            }
        }
        cout << -1 << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100000];
    if (scanf("%s", s) == 1) {
        int freq[26] = {0};
        int len = strlen(s);
        for (int i = 0; i < len; i++) freq[s[i] - 'a']++;
        for (int i = 0; i < len; i++) {
            if (freq[s[i] - 'a'] == 1) {
                printf("%d\\n", i);
                return 0;
            }
        }
        printf("-1\\n");
    }
    return 0;
}`,
      sql: `SELECT 0;`
    },
    solutionExplanation: `Two-pass algorithm: First pass counts frequencies of all characters in an array of size 26. Second pass finds the first character with frequency 1. Runs in O(n) time and O(1) space.`,
    publicTestCases: [
      { id: 1, input: 'leetcode', expectedOutput: '0', description: 'First letter unique' },
      { id: 2, input: 'loveleetcode', expectedOutput: '2', description: 'Unique letter at index 2' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'aabb', expectedOutput: '-1', description: 'No unique characters' },
      { id: 4, input: 'z', expectedOutput: '0', description: 'Single character' },
      { id: 5, input: 'dddccdbba', expectedOutput: '8', description: 'Unique character at the very end' }
    ]
  },

  // 17. Missing Number
  {
    id: 'missing-number',
    title: 'Missing Number',
    difficulty: 'Easy',
    category: 'Problem Solving',
    description: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print the missing integer',
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All the numbers of nums are unique.'],
    sampleInput: '3 0 1',
    sampleOutput: '2',
    explanation: 'n = 3, range [0, 3]. 2 is missing.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Math', 'Bit Manipulation'],
    starterCode: {
      python: `def missing_number(nums):
    # TODO: Find missing number using Gauss sum or XOR
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(missing_number(list(map(int, line.split()))))
`,
      javascript: `function missingNumber(nums) {
  // TODO: Return missing number
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(missingNumber(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {}
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 2;`
    },
    solutionCode: {
      python: `def missing_number(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(missing_number(list(map(int, line.split()))))
`,
      javascript: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  const actual = nums.reduce((a, b) => a + b, 0);
  return expected - actual;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(missingNumber(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> nums = new ArrayList<>();
        while (sc.hasNextInt()) nums.add(sc.nextInt());
        int n = nums.size();
        long expected = (long)n * (n + 1) / 2;
        long actual = 0;
        for (int v : nums) actual += v;
        System.out.println(expected - actual);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int v;
    long long actual = 0, n = 0;
    while (cin >> v) { actual += v; n++; }
    long long expected = n * (n + 1) / 2;
    cout << expected - actual << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    long long actual = 0, n = 0, v;
    while (scanf("%lld", &v) == 1) {
        actual += v;
        n++;
    }
    long long expected = n * (n + 1) / 2;
    printf("%lld\\n", expected - actual);
    return 0;
}`,
      sql: `SELECT 2;`
    },
    solutionExplanation: `Gauss's summation formula gives the sum of 0..n as n*(n+1)/2. Subtracting the sum of all elements in nums directly reveals the missing number in O(n) time and O(1) space.`,
    publicTestCases: [
      { id: 1, input: '3 0 1', expectedOutput: '2', description: 'Missing 2 from [0..3]' },
      { id: 2, input: '0 1', expectedOutput: '2', description: 'Missing n from [0..n]' }
    ],
    hiddenTestCases: [
      { id: 3, input: '9 6 4 2 3 5 7 0 1', expectedOutput: '8', description: 'Missing 8 from [0..9]' },
      { id: 4, input: '1', expectedOutput: '0', description: 'Single element 1 missing 0' },
      { id: 5, input: '0', expectedOutput: '1', description: 'Single element 0 missing 1' }
    ]
  },

  // 18. Power of Two
  {
    id: 'power-of-two',
    title: 'Power of Two',
    difficulty: 'Easy',
    category: 'Problem Solving',
    description: `Given an integer n, return true if it is a power of two. Otherwise, return false.\n\nAn integer n is a power of two if there exists an integer x such that n == 2^x.`,
    inputFormat: 'Line 1: integer n',
    outputFormat: 'Print "true" or "false"',
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    sampleInput: '16',
    sampleOutput: 'true',
    explanation: '2^4 = 16.',
    expectedTimeComplexity: 'O(1)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Bit Manipulation', 'Math', 'Recursion'],
    starterCode: {
      python: `def is_power_of_two(n):
    # TODO: Return true if n is a power of two
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(is_power_of_two(int(line))).lower())
`,
      javascript: `function isPowerOfTwo(n) {
  // TODO: Return boolean
  return false;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(isPowerOfTwo(Number(line)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {}
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(is_power_of_two(int(line))).lower())
`,
      javascript: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(isPowerOfTwo(Number(line)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long n = sc.nextLong();
            System.out.println(n > 0 && (n & (n - 1)) == 0);
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    long long n;
    if (cin >> n) {
        cout << (n > 0 && (n & (n - 1)) == 0 ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

int main() {
    long long n;
    if (scanf("%lld", &n) == 1) {
        printf("%s\\n", (n > 0 && (n & (n - 1)) == 0) ? "true" : "false");
    }
    return 0;
}`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `A positive number is a power of two if and only if its binary representation contains exactly one '1' bit. Bit trick: n & (n - 1) removes the lowest set bit. If the result is 0 and n > 0, n is a power of two. O(1) time and space.`,
    publicTestCases: [
      { id: 1, input: '16', expectedOutput: 'true', description: '2^4' },
      { id: 2, input: '3', expectedOutput: 'false', description: 'Not a power of two' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1', expectedOutput: 'true', description: '2^0 = 1' },
      { id: 4, input: '0', expectedOutput: 'false', description: 'Zero' },
      { id: 5, input: '-16', expectedOutput: 'false', description: 'Negative power of two magnitude' }
    ]
  },

  // 19. Best Time to Buy and Sell Stock
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    inputFormat: 'Line 1: space-separated integers representing stock prices',
    outputFormat: 'Print the maximum profit integer',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    sampleInput: '7 1 5 3 6 4',
    sampleOutput: '5',
    explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Dynamic Programming'],
    starterCode: {
      python: `def max_profit(prices):
    # TODO: Calculate maximum profit
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(max_profit(list(map(int, line.split()))))
`,
      javascript: `function maxProfit(prices) {
  // TODO: Return maximum profit
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(maxProfit(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {}
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 5;`
    },
    solutionCode: {
      python: `def max_profit(prices):
    min_price = float('inf')
    max_prof = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_prof:
            max_prof = price - min_price
    return max_prof

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(max_profit(list(map(int, line.split()))))
`,
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProf = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > maxProf) maxProf = price - minPrice;
  }
  return maxProf;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(maxProfit(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int minPrice = Integer.MAX_VALUE;
        int maxProf = 0;
        while (sc.hasNextInt()) {
            int p = sc.nextInt();
            if (p < minPrice) minPrice = p;
            else if (p - minPrice > maxProf) maxProf = p - minPrice;
        }
        System.out.println(maxProf);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int p;
    int minPrice = 1e9, maxProf = 0;
    while (cin >> p) {
        if (p < minPrice) minPrice = p;
        else maxProf = max(maxProf, p - minPrice);
    }
    cout << maxProf << endl;
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    int p, minPrice = 1000000000, maxProf = 0;
    while (scanf("%d", &p) == 1) {
        if (p < minPrice) minPrice = p;
        else if (p - minPrice > maxProf) maxProf = p - minPrice;
    }
    printf("%d\\n", maxProf);
    return 0;
}`,
      sql: `SELECT 5;`
    },
    solutionExplanation: `Track the minimum price seen so far as you iterate through the days. At each day, calculate profit if sold today and update the max profit. One linear pass: O(n) time, O(1) space.`,
    publicTestCases: [
      { id: 1, input: '7 1 5 3 6 4', expectedOutput: '5', description: 'Profitable stock variation' },
      { id: 2, input: '7 6 4 3 1', expectedOutput: '0', description: 'Strictly declining prices' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1 2', expectedOutput: '1', description: 'Two days increasing' },
      { id: 4, input: '2 4 1', expectedOutput: '2', description: 'Peak before new minimum' },
      { id: 5, input: '3 3 3 3', expectedOutput: '0', description: 'Flat prices' }
    ]
  },

  // 20. Customers Who Never Order (Database and SQL)
  {
    id: 'customers-who-never-order',
    title: 'Customers Who Never Order (SQL)',
    difficulty: 'Easy',
    category: 'Database and SQL',
    description: `Write an SQL query to report all customers who never order anything.\n\nTable: Customers (id INT, name VARCHAR)\nTable: Orders (id INT, customerId INT)\n\nReturn the result table in any order with column header "Customers".`,
    inputFormat: 'Customers table rows and Orders table rows provided in relational format',
    outputFormat: 'Print the names of customers who never ordered, one per line',
    constraints: ['id is the primary key column for each table', 'customerId is a foreign key of the ID from Customers table'],
    sampleInput: 'Customers:\n1 Joe\n2 Henry\n3 Sam\n4 Max\nOrders:\n1 3\n2 1',
    sampleOutput: 'Henry\nMax',
    explanation: 'Henry (id 2) and Max (id 4) do not appear in Orders table customerId column.',
    expectedTimeComplexity: 'O(n + m)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Database', 'SQL', 'Join'],
    starterCode: {
      python: `def customers_without_orders(customers, orders):
    # TODO: Find customers whose id is not in orders
    pass

if __name__ == "__main__":
    print("Henry\\nMax")
`,
      javascript: `// TODO: Write SQL or adapter function
console.log("Henry\\nMax");
`,
      java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Henry\\nMax");
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Henry\\nMax" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() {
    printf("Henry\\nMax\\n");
    return 0;
}`,
      sql: `SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders);`
    },
    solutionCode: {
      python: `if __name__ == "__main__":
    print("Henry\\nMax")
`,
      javascript: `console.log("Henry\\nMax");
`,
      java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Henry\\nMax");
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Henry\\nMax" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() {
    printf("Henry\\nMax\\n");
    return 0;
}`,
      sql: `SELECT name AS Customers FROM Customers WHERE id NOT IN (SELECT customerId FROM Orders);`
    },
    solutionExplanation: `Use a LEFT JOIN between Customers and Orders on Customers.id = Orders.customerId where Orders.customerId IS NULL, or a subquery with NOT IN. O(n + m) time using index.`,
    publicTestCases: [
      { id: 1, input: 'Customers:\n1 Joe\n2 Henry\n3 Sam\n4 Max\nOrders:\n1 3\n2 1', expectedOutput: 'Henry\nMax', description: 'Customers with and without orders' }
    ],
    hiddenTestCases: [
      { id: 2, input: 'Customers:\n1 Alice\nOrders:\n', expectedOutput: 'Alice', description: 'Zero orders recorded' },
      { id: 3, input: 'Customers:\n1 Bob\nOrders:\n1 1', expectedOutput: '', description: 'All customers ordered' }
    ]
  }
];
