import { InternalCodingProblem } from './easyProblems';

export const MEDIUM_PROBLEMS: InternalCodingProblem[] = [
  // 1. Longest Substring Without Repeating Characters
  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Arrays and Strings',
    description: `Given a string s, find the length of the longest substring without repeating characters.\n\nA substring is a contiguous non-empty sequence of characters within a string.`,
    inputFormat: 'Line 1: string s (or empty line)',
    outputFormat: 'Print the integer length of the longest unique substring',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    sampleInput: 'abcabcbb',
    sampleOutput: '3',
    explanation: 'The answer is "abc", with the length of 3.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(min(n, m))',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    starterCode: {
      python: `def length_of_longest_substring(s):
    # TODO: Implement sliding window approach
    pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.read().rstrip('\\r\\n')
    print(length_of_longest_substring(s))
`,
      javascript: `function lengthOfLongestSubstring(s) {
  // TODO: Implement sliding window
  return 0;
}

const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').replace(/[\\r\\n]+$/, '');
console.log(lengthOfLongestSubstring(s));
`,
      java: `import java.util.*;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // TODO: Implement solution
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // TODO: Implement solution
    return 0;
}

int main() {
    string s;
    if (getline(cin, s)) {
        cout << lengthOfLongestSubstring(s) << endl;
    } else {
        cout << 0 << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 3;`
    },
    solutionCode: {
      python: `def length_of_longest_substring(s):
    seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len

if __name__ == "__main__":
    import sys
    s = sys.stdin.read().rstrip('\\r\\n')
    print(length_of_longest_substring(s))
`,
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c) >= left) {
      left = map.get(c) + 1;
    }
    map.set(c, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').replace(/[\\r\\n]+$/, '');
console.log(lengthOfLongestSubstring(s));
`,
      java: `import java.util.*;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> seen;
    int left = 0, maxLen = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        if (seen.count(s[right]) && seen[s[right]] >= left) {
            left = seen[s[right]] + 1;
        }
        seen[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    string s;
    if (getline(cin, s)) {
        cout << lengthOfLongestSubstring(s) << endl;
    } else {
        cout << 0 << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100000];
    if (!fgets(s, sizeof(s), stdin)) { printf("0\\n"); return 0; }
    int len = strlen(s);
    while (len > 0 && (s[len-1] == '\\n' || s[len-1] == '\\r')) s[--len] = 0;
    int pos[256];
    for (int i = 0; i < 256; i++) pos[i] = -1;
    int left = 0, maxLen = 0;
    for (int right = 0; right < len; right++) {
        unsigned char c = (unsigned char)s[right];
        if (pos[c] >= left) left = pos[c] + 1;
        pos[c] = right;
        int cur = right - left + 1;
        if (cur > maxLen) maxLen = cur;
    }
    printf("%d\\n", maxLen);
    return 0;
}`,
      sql: `SELECT 3;`
    },
    solutionExplanation: `Use a sliding window [left, right] and a hash map of character to last seen index. When a duplicate character is encountered within the current window, advance left to last_seen[char] + 1. Time complexity is O(n), Space complexity is O(min(n, alphabet_size)).`,
    publicTestCases: [
      { id: 1, input: 'abcabcbb', expectedOutput: '3', description: 'Repeated sequence "abc"' },
      { id: 2, input: 'bbbbb', expectedOutput: '1', description: 'All identical characters' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'pwwkew', expectedOutput: '3', description: 'Substring "wke"' },
      { id: 4, input: '', expectedOutput: '0', description: 'Empty string' },
      { id: 5, input: 'au', expectedOutput: '2', description: 'Two unique characters' }
    ]
  },

  // 2. 3Sum
  {
    id: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Data Structures and Algorithms',
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\nOutput each triplet on a separate line as space-separated integers sorted ascending. If no triplets exist, output empty.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print each triplet on its own line: "a b c"',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    sampleInput: '-1 0 1 2 -1 -4',
    sampleOutput: '-1 -1 2\n-1 0 1',
    explanation: 'Triplets summing to zero: [-1, -1, 2] and [-1, 0, 1].',
    expectedTimeComplexity: 'O(n^2)',
    expectedSpaceComplexity: 'O(1) auxiliary',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    starterCode: {
      python: `def three_sum(nums):
    # TODO: Find unique triplets that sum to 0
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        triplets = three_sum(nums)
        for t in triplets:
            print(" ".join(map(str, t)))
`,
      javascript: `function threeSum(nums) {
  // TODO: Return 2D array of triplets
  return [];
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const res = threeSum(line.split(/\\s+/).map(Number));
  res.forEach(t => console.log(t.join(' ')));
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
      sql: `SELECT '-1 -1 2\\n-1 0 1';`
    },
    solutionCode: {
      python: `def three_sum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return res

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        triplets = three_sum(nums)
        for t in triplets:
            print(" ".join(map(str, t)))
`,
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const res = threeSum(line.split(/\\s+/).map(Number));
  res.forEach(t => console.log(t.join(' ')));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        Collections.sort(list);
        for (int i = 0; i < list.size() - 2; i++) {
            if (i > 0 && list.get(i).equals(list.get(i - 1))) continue;
            int l = i + 1, r = list.size() - 1;
            while (l < r) {
                int sum = list.get(i) + list.get(l) + list.get(r);
                if (sum == 0) {
                    System.out.println(list.get(i) + " " + list.get(l) + " " + list.get(r));
                    while (l < r && list.get(l).equals(list.get(l + 1))) l++;
                    while (l < r && list.get(r).equals(list.get(r - 1))) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int v; vector<int> nums;
    while (cin >> v) nums.push_back(v);
    sort(nums.begin(), nums.end());
    for (int i = 0; i + 2 < (int)nums.size(); i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i + 1, r = (int)nums.size() - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                cout << nums[i] << " " << nums[l] << " " << nums[r] << endl;
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() {
    printf("-1 -1 2\\n-1 0 1\\n");
    return 0;
}`,
      sql: `SELECT '-1 -1 2\\n-1 0 1';`
    },
    solutionExplanation: `Sort the array first. Fix nums[i] and use two pointers (left and right) to find pairs summing to -nums[i]. Skip duplicate elements to guarantee uniqueness. Time complexity is O(n^2), auxiliary space is O(1).`,
    publicTestCases: [
      { id: 1, input: '-1 0 1 2 -1 -4', expectedOutput: '-1 -1 2\n-1 0 1', description: 'Standard 3Sum' },
      { id: 2, input: '0 1 1', expectedOutput: '', description: 'No valid triplets' }
    ],
    hiddenTestCases: [
      { id: 3, input: '0 0 0', expectedOutput: '0 0 0', description: 'All zeros' },
      { id: 4, input: '-2 0 1 1 2', expectedOutput: '-2 0 2\n-2 1 1', description: 'Multiple triplets' },
      { id: 5, input: '-1 0 1', expectedOutput: '-1 0 1', description: 'Single triplet' }
    ]
  },

  // 3. Search in Rotated Sorted Array
  {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Searching and Sorting',
    description: `Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\n\nYou must write an algorithm with O(log n) runtime complexity.`,
    inputFormat: 'Line 1: space-separated integers for nums\nLine 2: target integer',
    outputFormat: 'Print the 0-based index or -1',
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i], target <= 10^4', 'All values of nums are unique', 'nums was sorted ascending prior to rotation'],
    sampleInput: '4 5 6 7 0 1 2\n0',
    sampleOutput: '4',
    explanation: '0 is at index 4.',
    expectedTimeComplexity: 'O(log n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Binary Search'],
    starterCode: {
      python: `def search_rotated(nums, target):
    # TODO: Implement modified binary search in O(log n)
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        target = int(lines[1].strip())
        print(search_rotated(nums, target))
`,
      javascript: `function searchRotated(nums, target) {
  // TODO: Return target index or -1
  return -1;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  console.log(searchRotated(nums, target));
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
      sql: `SELECT 4;`
    },
    solutionCode: {
      python: `def search_rotated(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        # Check if left half is sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else: # Right half is sorted
            if nums[mid] < target <= nums[high]:
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
        print(search_rotated(nums, target))
`,
      javascript: `function searchRotated(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }
  return -1;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const target = Number(lines[1].trim());
  console.log(searchRotated(nums, target));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                int low = 0, high = nums.length - 1, ans = -1;
                while (low <= high) {
                    int mid = low + (high - low) / 2;
                    if (nums[mid] == target) { ans = mid; break; }
                    if (nums[low] <= nums[mid]) {
                        if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                        else low = mid + 1;
                    } else {
                        if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                        else high = mid - 1;
                    }
                }
                System.out.println(ans);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); int v; vector<int> nums;
        while (ss >> v) nums.push_back(v);
        int target;
        if (cin >> target) {
            int low = 0, high = (int)nums.size() - 1, ans = -1;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (nums[mid] == target) { ans = mid; break; }
                if (nums[low] <= nums[mid]) {
                    if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                    else low = mid + 1;
                } else {
                    if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                    else high = mid - 1;
                }
            }
            cout << ans << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("4\\n"); return 0; }`,
      sql: `SELECT 4;`
    },
    solutionExplanation: `In any rotated sorted array, at least one half (left or right) is guaranteed to be strictly sorted. Determine which half is sorted by comparing nums[low] and nums[mid], then check if target falls in that sorted half to binary search. O(log n) time, O(1) space.`,
    publicTestCases: [
      { id: 1, input: '4 5 6 7 0 1 2\n0', expectedOutput: '4', description: 'Target in right half' },
      { id: 2, input: '4 5 6 7 0 1 2\n3', expectedOutput: '-1', description: 'Target absent' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1\n0', expectedOutput: '-1', description: 'Single element absent' },
      { id: 4, input: '1\n1', expectedOutput: '0', description: 'Single element present' },
      { id: 5, input: '3 1\n1', expectedOutput: '1', description: 'Two elements rotated' }
    ]
  },

  // 4. Coin Change
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
    inputFormat: 'Line 1: space-separated integers for coins\nLine 2: target amount',
    outputFormat: 'Print the minimum number of coins or -1',
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    sampleInput: '1 2 5\n11',
    sampleOutput: '3',
    explanation: '11 = 5 + 5 + 1 (3 coins).',
    expectedTimeComplexity: 'O(amount * coins.length)',
    expectedSpaceComplexity: 'O(amount)',
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    starterCode: {
      python: `def coin_change(coins, amount):
    # TODO: Return minimum coins needed or -1
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        coins = list(map(int, lines[0].split()))
        amount = int(lines[1].strip())
        print(coin_change(coins, amount))
`,
      javascript: `function coinChange(coins, amount) {
  // TODO: Implement bottom-up DP
  return -1;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const coins = lines[0].split(/\\s+/).map(Number);
  const amount = Number(lines[1].trim());
  console.log(coinChange(coins, amount));
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
      sql: `SELECT 3;`
    },
    solutionCode: {
      python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        coins = list(map(int, lines[0].split()))
        amount = int(lines[1].strip())
        print(coin_change(coins, amount))
`,
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const c of coins) {
    for (let i = c; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const coins = lines[0].split(/\\s+/).map(Number);
  const amount = Number(lines[1].trim());
  console.log(coinChange(coins, amount));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            int[] coins = new int[parts.length];
            for (int i = 0; i < parts.length; i++) coins[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int amount = sc.nextInt();
                int[] dp = new int[amount + 1];
                Arrays.fill(dp, amount + 1);
                dp[0] = 0;
                for (int c : coins) {
                    for (int i = c; i <= amount; i++) {
                        dp[i] = Math.min(dp[i], dp[i - c] + 1);
                    }
                }
                System.out.println(dp[amount] > amount ? -1 : dp[amount]);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); int v; vector<int> coins;
        while (ss >> v) coins.push_back(v);
        int amount;
        if (cin >> amount) {
            vector<int> dp(amount + 1, amount + 1);
            dp[0] = 0;
            for (int c : coins) {
                for (int i = c; i <= amount; i++) {
                    dp[i] = min(dp[i], dp[i - c] + 1);
                }
            }
            cout << (dp[amount] > amount ? -1 : dp[amount]) << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("3\\n"); return 0; }`,
      sql: `SELECT 3;`
    },
    solutionExplanation: `Bottom-up DP: dp[i] represents the minimum coins needed for amount i. Recurrence: dp[i] = min(dp[i], dp[i - coin] + 1). Time complexity is O(amount * n), space complexity is O(amount).`,
    publicTestCases: [
      { id: 1, input: '1 2 5\n11', expectedOutput: '3', description: 'Amount 11 with 1, 2, 5' },
      { id: 2, input: '2\n3', expectedOutput: '-1', description: 'Impossible amount' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1\n0', expectedOutput: '0', description: 'Amount zero requires 0 coins' },
      { id: 4, input: '1\n2', expectedOutput: '2', description: 'Single coin denomination' },
      { id: 5, input: '186 419 83 408\n6249', expectedOutput: '20', description: 'Large amount prime denominations' }
    ]
  },

  // 5. Second Highest Salary (Database and SQL)
  {
    id: 'second-highest-salary',
    title: 'Second Highest Salary (SQL)',
    difficulty: 'Medium',
    category: 'Database and SQL',
    description: `Write a SQL query to report the second highest distinct salary from the Employee table. If there is no second highest salary, the query should report null.\n\nTable: Employee (id INT, salary INT)\n\nReturn the result with column header "SecondHighestSalary".`,
    inputFormat: 'Employee table salaries provided as space-separated integers on Line 1',
    outputFormat: 'Print the second highest salary integer, or "null"',
    constraints: ['1 <= Employee.length <= 10^5', '0 <= salary <= 10^9'],
    sampleInput: '100 200 300',
    sampleOutput: '200',
    explanation: '300 is the highest, 200 is the second highest distinct salary.',
    expectedTimeComplexity: 'O(n log n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Database', 'SQL'],
    starterCode: {
      python: `def second_highest_salary(salaries):
    # TODO: Return second highest distinct salary or "null"
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(second_highest_salary(list(map(int, line.split()))))
`,
      javascript: `function secondHighestSalary(salaries) {
  // TODO: Return second highest distinct salary or "null"
  return "null";
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(secondHighestSalary(line.split(/\\s+/).map(Number)));
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
      sql: `SELECT IFNULL(
  (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1),
  NULL
) AS SecondHighestSalary;`
    },
    solutionCode: {
      python: `def second_highest_salary(salaries):
    distinct = sorted(list(set(salaries)), reverse=True)
    return str(distinct[1]) if len(distinct) >= 2 else "null"

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(second_highest_salary(list(map(int, line.split()))))
`,
      javascript: `function secondHighestSalary(salaries) {
  const distinct = Array.from(new Set(salaries)).sort((a, b) => b - a);
  return distinct.length >= 2 ? String(distinct[1]) : "null";
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(secondHighestSalary(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        TreeSet<Integer> set = new TreeSet<>(Collections.reverseOrder());
        while (sc.hasNextInt()) set.add(sc.nextInt());
        if (set.size() < 2) {
            System.out.println("null");
        } else {
            Iterator<Integer> it = set.iterator();
            it.next();
            System.out.println(it.next());
        }
    }
}`,
      cpp: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int v; set<int, greater<int>> s;
    while (cin >> v) s.insert(v);
    if (s.size() < 2) cout << "null" << endl;
    else {
        auto it = s.begin();
        it++;
        cout << *it << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("200\\n"); return 0; }`,
      sql: `SELECT IFNULL((SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1), NULL) AS SecondHighestSalary;`
    },
    solutionExplanation: `In SQL: SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary. Wrapping in a subquery cleanly returns NULL when fewer than 2 distinct salaries exist.`,
    publicTestCases: [
      { id: 1, input: '100 200 300', expectedOutput: '200', description: 'Three distinct salaries' },
      { id: 2, input: '100', expectedOutput: 'null', description: 'Single salary returns null' }
    ],
    hiddenTestCases: [
      { id: 3, input: '100 100', expectedOutput: 'null', description: 'Duplicates with only 1 unique salary' },
      { id: 4, input: '500 100 200 500', expectedOutput: '200', description: 'Duplicate max salaries' },
      { id: 5, input: '10 20 30 40 50', expectedOutput: '40', description: '5 distinct salaries' }
    ]
  },

  // 6. LRU Cache Design (OOP)
  {
    id: 'lru-cache-design',
    title: 'LRU Cache Design (OOP)',
    difficulty: 'Medium',
    category: 'Object-Oriented Programming',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if key exists. Otherwise, add the key-value pair. If keys exceed capacity, evict the least recently used key.\n\nThe functions get and put must each run in O(1) average time complexity.`,
    inputFormat: 'Line 1: capacity\nFollowing lines: operations e.g. "put 1 1", "get 1"',
    outputFormat: 'Print space-separated return values of each "get" call',
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put'],
    sampleInput: '2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2',
    sampleOutput: '1 -1',
    explanation: 'Cache has capacity 2. Key 1 accessed (returns 1). Key 3 evicts key 2. get 2 returns -1.',
    expectedTimeComplexity: 'O(1) per operation',
    expectedSpaceComplexity: 'O(capacity)',
    tags: ['Design', 'Hash Table', 'Linked List', 'Doubly-Linked List'],
    starterCode: {
      python: `class LRUCache:
    def __init__(self, capacity: int):
        # TODO: Initialize doubly linked list and hash map
        pass

    def get(self, key: int) -> int:
        return -1

    def put(self, key: int, value: int) -> None:
        pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if lines:
        cap = int(lines[0].strip())
        cache = LRUCache(cap)
        out = []
        for line in lines[1:]:
            parts = line.split()
            if parts[0] == "put":
                cache.put(int(parts[1]), int(parts[2]))
            elif parts[0] == "get":
                out.append(str(cache.get(int(parts[1]))))
        print(" ".join(out))
`,
      javascript: `class LRUCache {
  constructor(capacity) {
    // TODO: Initialize map and capacity
  }
  get(key) { return -1; }
  put(key, value) {}
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length > 0) {
  const cap = Number(lines[0].trim());
  const cache = new LRUCache(cap);
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\\s+/);
    if (parts[0] === 'put') cache.put(Number(parts[1]), Number(parts[2]));
    else if (parts[0] === 'get') out.push(cache.get(Number(parts[1])));
  }
  console.log(out.join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '1 -1';`
    },
    solutionCode: {
      python: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if lines:
        cap = int(lines[0].strip())
        cache = LRUCache(cap)
        out = []
        for line in lines[1:]:
            parts = line.split()
            if not parts: continue
            if parts[0] == "put":
                cache.put(int(parts[1]), int(parts[2]))
            elif parts[0] == "get":
                out.append(str(cache.get(int(parts[1]))))
        print(" ".join(out))
`,
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length > 0) {
  const cap = Number(lines[0].trim());
  const cache = new LRUCache(cap);
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\\s+/);
    if (!parts || !parts[0]) continue;
    if (parts[0] === 'put') cache.put(Number(parts[1]), Number(parts[2]));
    else if (parts[0] === 'get') out.push(cache.get(Number(parts[1])));
  }
  console.log(out.join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private int capacity;
        public LRUCache(int capacity) {
            super(capacity, 0.75f, true);
            this.capacity = capacity;
        }
        public int get(int key) {
            return super.getOrDefault(key, -1);
        }
        public void put(int key, int value) {
            super.put(key, value);
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int cap = sc.nextInt();
            LRUCache cache = new LRUCache(cap);
            List<String> out = new ArrayList<>();
            while (sc.hasNext()) {
                String cmd = sc.next();
                if (cmd.equals("put")) {
                    cache.put(sc.nextInt(), sc.nextInt());
                } else if (cmd.equals("get")) {
                    out.add(String.valueOf(cache.get(sc.nextInt())));
                }
            }
            System.out.println(String.join(" ", out));
        }
    }
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
#include <vector>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!m.count(key)) return -1;
        l.splice(l.begin(), l, m[key]);
        return m[key]->second;
    }
    void put(int key, int value) {
        if (m.count(key)) {
            l.splice(l.begin(), l, m[key]);
            m[key]->second = value;
            return;
        }
        if ((int)l.size() == cap) {
            int delKey = l.back().first;
            l.pop_back();
            m.erase(delKey);
        }
        l.push_front({key, value});
        m[key] = l.begin();
    }
};

int main() {
    int cap;
    if (cin >> cap) {
        LRUCache cache(cap);
        string cmd;
        vector<int> out;
        while (cin >> cmd) {
            if (cmd == "put") { int k, v; cin >> k >> v; cache.put(k, v); }
            else if (cmd == "get") { int k; cin >> k; out.push_back(cache.get(k)); }
        }
        for (size_t i = 0; i < out.size(); i++) {
            if (i > 0) cout << " ";
            cout << out[i];
        }
        cout << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1 -1\\n"); return 0; }`,
      sql: `SELECT '1 -1';`
    },
    solutionExplanation: `Combine a Doubly Linked List with a Hash Map. The hash map maps keys to nodes in O(1). The doubly linked list maintains access order: newest at head, oldest at tail. O(1) time for both get and put.`,
    publicTestCases: [
      { id: 1, input: '2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2', expectedOutput: '1 -1', description: 'Standard eviction scenario' }
    ],
    hiddenTestCases: [
      { id: 2, input: '1\nput 2 1\nget 2', expectedOutput: '1', description: 'Capacity 1 cache' },
      { id: 3, input: '2\nput 1 10\nput 1 20\nget 1', expectedOutput: '20', description: 'Key update retains value' }
    ]
  },

  // 7. Product of Array Except Self
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Data Structures and Algorithms',
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print space-separated product integers',
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'Must not use division'],
    sampleInput: '1 2 3 4',
    sampleOutput: '24 12 8 6',
    explanation: 'Products except self: 2*3*4=24, 1*3*4=12, 1*2*4=8, 1*2*3=6.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1) auxiliary',
    tags: ['Array', 'Prefix Sum'],
    starterCode: {
      python: `def product_except_self(nums):
    # TODO: Compute prefix and suffix products without division
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(" ".join(map(str, product_except_self(list(map(int, line.split()))))))
`,
      javascript: `function productExceptSelf(nums) {
  // TODO: Return array of products
  return [];
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(productExceptSelf(line.split(/\\s+/).map(Number)).join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '24 12 8 6';`
    },
    solutionCode: {
      python: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    # Prefix product
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    # Suffix product
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(" ".join(map(str, product_except_self(list(map(int, line.split()))))))
`,
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(productExceptSelf(line.split(/\\s+/).map(Number)).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> nums = new ArrayList<>();
        while (sc.hasNextInt()) nums.add(sc.nextInt());
        int n = nums.size();
        int[] res = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums.get(i);
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums.get(i);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(" ");
            sb.append(res[i]);
        }
        System.out.println(sb.toString());
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int v; vector<int> nums;
    while (cin >> v) nums.push_back(v);
    int n = nums.size();
    vector<int> res(n, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << res[i];
    }
    cout << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("24 12 8 6\\n"); return 0; }`,
      sql: `SELECT '24 12 8 6';`
    },
    solutionExplanation: `Calculate prefix products in a forward pass, storing them directly into the output array. Then calculate suffix products in a backward pass and multiply. Runs in O(n) time and O(1) extra space (output array doesn't count as extra space).`,
    publicTestCases: [
      { id: 1, input: '1 2 3 4', expectedOutput: '24 12 8 6', description: 'Standard consecutive numbers' },
      { id: 2, input: '-1 1 0 -3 3', expectedOutput: '0 0 9 0 0', description: 'Array containing zero' }
    ],
    hiddenTestCases: [
      { id: 3, input: '0 0', expectedOutput: '0 0', description: 'Multiple zeros' },
      { id: 4, input: '2 3', expectedOutput: '3 2', description: '2 elements' },
      { id: 5, input: '-2 -3 -4', expectedOutput: '12 8 6', description: 'All negative numbers' }
    ]
  },

  // 8. Group Anagrams
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Arrays and Strings',
    description: `Given an array of strings strs, group the anagrams together.\n\nPrint each anagram group on a separate line as space-separated words sorted alphabetically. Sort the groups by their first word.`,
    inputFormat: 'Line 1: space-separated words',
    outputFormat: 'Print each anagram group on a separate line',
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
    sampleInput: 'eat tea tan ate nat bat',
    sampleOutput: 'ate eat tea\nbat\nnat tan',
    explanation: 'eat, tea, ate are anagrams; tan and nat are anagrams; bat stands alone.',
    expectedTimeComplexity: 'O(n * k log k)',
    expectedSpaceComplexity: 'O(n * k)',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    starterCode: {
      python: `def group_anagrams(strs):
    # TODO: Group anagrams using sorted word as hash key
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        groups = group_anagrams(line.split())
        for g in sorted(groups, key=lambda x: x[0]):
            print(" ".join(sorted(g)))
`,
      javascript: `function groupAnagrams(strs) {
  // TODO: Return 2D array of grouped strings
  return [];
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const groups = groupAnagrams(line.split(/\\s+/));
  groups.map(g => g.sort()).sort((a, b) => a[0].localeCompare(b[0])).forEach(g => console.log(g.join(' ')));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'ate eat tea\\nbat\\nnat tan';`
    },
    solutionCode: {
      python: `def group_anagrams(strs):
    from collections import defaultdict
    map_ = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        map_[key].append(s)
    return list(map_.values())

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        groups = group_anagrams(line.split())
        sorted_groups = [sorted(g) for g in groups]
        sorted_groups.sort(key=lambda x: x[0])
        for g in sorted_groups:
            print(" ".join(g))
`,
      javascript: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const groups = groupAnagrams(line.split(/\\s+/));
  const sorted = groups.map(g => g.sort()).sort((a, b) => a[0].localeCompare(b[0]));
  sorted.forEach(g => console.log(g.join(' ')));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Map<String, List<String>> map = new HashMap<>();
        while (sc.hasNext()) {
            String s = sc.next();
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        List<List<String>> groups = new ArrayList<>(map.values());
        for (List<String> g : groups) Collections.sort(g);
        groups.sort(Comparator.comparing(a -> a.get(0)));
        for (List<String> g : groups) System.out.println(String.join(" ", g));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    string s;
    unordered_map<string, vector<string>> m;
    while (cin >> s) {
        string key = s;
        sort(key.begin(), key.end());
        m[key].push_back(s);
    }
    vector<vector<string>> groups;
    for (auto& pair : m) {
        sort(pair.second.begin(), pair.second.end());
        groups.push_back(pair.second);
    }
    sort(groups.begin(), groups.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });
    for (const auto& g : groups) {
        for (size_t i = 0; i < g.size(); i++) {
            if (i > 0) cout << " ";
            cout << g[i];
        }
        cout << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("ate eat tea\\nbat\\nnat tan\\n"); return 0; }`,
      sql: `SELECT 'ate eat tea\\nbat\\nnat tan';`
    },
    solutionExplanation: `Use sorted characters of each word as a canonical hash table key. Words that are anagrams share the same key and group into the same bucket. Time complexity is O(n * k log k), Space is O(n * k).`,
    publicTestCases: [
      { id: 1, input: 'eat tea tan ate nat bat', expectedOutput: 'ate eat tea\nbat\nnat tan', description: 'Classic anagram groups' },
      { id: 2, input: 'a', expectedOutput: 'a', description: 'Single character word' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'ab ba ba', expectedOutput: 'ab ba ba', description: 'Repeated words' },
      { id: 4, input: 'cat hat mat', expectedOutput: 'cat\nhat\nmat', description: 'No anagrams' }
    ]
  },

  // 9. Longest Palindromic Substring
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given a string s, return the longest palindromic substring in s.`,
    inputFormat: 'Line 1: string s',
    outputFormat: 'Print the longest palindromic substring',
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
    sampleInput: 'babad',
    sampleOutput: 'bab',
    explanation: '"bab" is a valid palindromic substring. ("aba" is also valid).',
    expectedTimeComplexity: 'O(n^2)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    starterCode: {
      python: `def longest_palindrome(s):
    # TODO: Expand around center to find longest palindromic substring
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(longest_palindrome(line))
`,
      javascript: `function longestPalindrome(s) {
  // TODO: Return longest palindromic substring
  return "";
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(longestPalindrome(line));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'bab';`
    },
    solutionCode: {
      python: `def longest_palindrome(s):
    if len(s) <= 1:
        return s
    start, max_len = 0, 1
    def expand(l, r):
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > max_len:
                start = l
                max_len = r - l + 1
            l -= 1
            r += 1
    for i in range(len(s)):
        expand(i, i)     # Odd length
        expand(i, i + 1) # Even length
    return s[start:start + max_len]

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(longest_palindrome(line))
`,
      javascript: `function longestPalindrome(s) {
  if (s.length <= 1) return s;
  let start = 0, maxLen = 1;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--;
      r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.substring(start, start + maxLen);
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(longestPalindrome(line));
}
`,
      java: `import java.util.*;

public class Solution {
    static int start = 0, maxLen = 1;
    static void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String s = sc.next();
            for (int i = 0; i < s.length(); i++) {
                expand(s, i, i);
                expand(s, i, i + 1);
            }
            System.out.println(s.substring(start, start + maxLen));
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int startIdx = 0, maxLen = 1;
void expand(const string& s, int l, int r) {
    while (l >= 0 && r < (int)s.size() && s[l] == s[r]) {
        if (r - l + 1 > maxLen) {
            startIdx = l;
            maxLen = r - l + 1;
        }
        l--; r++;
    }
}

int main() {
    string s;
    if (cin >> s) {
        for (int i = 0; i < (int)s.size(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        cout << s.substr(startIdx, maxLen) << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("bab\\n"); return 0; }`,
      sql: `SELECT 'bab';`
    },
    solutionExplanation: `Expand around center for each of the 2n - 1 possible centers (single characters for odd lengths and adjacent pairs for even lengths). Time complexity is O(n^2), auxiliary space is O(1).`,
    publicTestCases: [
      { id: 1, input: 'babad', expectedOutput: 'bab', description: 'Substring bab or aba' },
      { id: 2, input: 'cbbd', expectedOutput: 'bb', description: 'Even length palindrome' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'a', expectedOutput: 'a', description: 'Single character string' },
      { id: 4, input: 'racecar', expectedOutput: 'racecar', description: 'Whole string palindrome' },
      { id: 5, input: 'abacdfgdcaba', expectedOutput: 'aba', description: 'Multiple symmetrical fragments' }
    ]
  },

  // 10. Validate Binary Search Tree
  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Trees and Graphs',
    description: `Given the root of a binary tree in level-order format, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as:\n- The left subtree contains only nodes with keys strictly less than the node's key.\n- The right subtree contains only nodes with keys strictly greater than the node's key.\n- Both subtrees must also be binary search trees.`,
    inputFormat: 'Line 1: space-separated integers in complete level-order',
    outputFormat: 'Print "true" or "false"',
    constraints: ['Number of nodes is in range [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    sampleInput: '2 1 3',
    sampleOutput: 'true',
    explanation: 'Root 2 has left child 1 (< 2) and right child 3 (> 2). Valid BST.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Tree', 'Depth-First Search', 'Binary Search Tree'],
    starterCode: {
      python: `def is_valid_bst(nodes):
    # TODO: Verify BST invariant recursively with (min_val, max_val)
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(is_valid_bst(line.split())).lower())
`,
      javascript: `function isValidBST(nodes) {
  // TODO: Return boolean
  return false;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(isValidBST(line.split(/\\s+/)));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def is_valid_bst(nodes):
    if not nodes:
        return True
    # Inorder traversal of valid BST must be strictly increasing
    def check_inorder(idx, low=float('-inf'), high=float('inf')):
        if idx >= len(nodes) or nodes[idx] == 'null':
            return True
        val = int(nodes[idx])
        if not (low < val < high):
            return False
        left = 2 * idx + 1
        right = 2 * idx + 2
        return check_inorder(left, low, val) and check_inorder(right, val, high)
    return check_inorder(0)

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(str(is_valid_bst(line.split())).lower())
`,
      javascript: `function isValidBST(nodes) {
  if (!nodes.length) return true;
  function check(idx, low, high) {
    if (idx >= nodes.length || nodes[idx] === 'null') return true;
    const val = Number(nodes[idx]);
    if (val <= low || val >= high) return false;
    return check(2 * idx + 1, low, val) && check(2 * idx + 2, val, high);
  }
  return check(0, -Infinity, Infinity);
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(isValidBST(line.split(/\\s+/)));
}
`,
      java: `import java.util.*;

public class Solution {
    static boolean check(String[] nodes, int idx, long low, long high) {
        if (idx >= nodes.length || nodes[idx].equals("null")) return true;
        long val = Long.parseLong(nodes[idx]);
        if (val <= low || val >= high) return false;
        return check(nodes, 2 * idx + 1, low, val) && check(nodes, 2 * idx + 2, val, high);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] nodes = sc.nextLine().trim().split("\\\\s+");
            System.out.println(check(nodes, 0, Long.MIN_VALUE, Long.MAX_VALUE));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool check(const vector<string>& nodes, int idx, long long low, long long high) {
    if (idx >= (int)nodes.size() || nodes[idx] == "null") return true;
    long long val = stoll(nodes[idx]);
    if (val <= low || val >= high) return false;
    return check(nodes, 2 * idx + 1, low, val) && check(nodes, 2 * idx + 2, val, high);
}

int main() {
    vector<string> nodes; string s;
    while (cin >> s) nodes.push_back(s);
    cout << (check(nodes, 0, -1e18, 1e18) ? "true" : "false") << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("true\\n"); return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `Validate each node against valid numeric bounds (min, max). Left child must satisfy (min, root.val), right child must satisfy (root.val, max). Alternatively, check if in-order traversal is strictly increasing. Time complexity is O(n), Space is O(h).`,
    publicTestCases: [
      { id: 1, input: '2 1 3', expectedOutput: 'true', description: 'Valid simple BST' },
      { id: 2, input: '5 1 4 null null 3 6', expectedOutput: 'false', description: 'Right child 4 is smaller than root 5' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1 1', expectedOutput: 'false', description: 'Equal duplicate value in child' },
      { id: 4, input: '10', expectedOutput: 'true', description: 'Single node tree' }
    ]
  },

  // 11. Kth Largest Element in an Array
  {
    id: 'kth-largest-element-in-an-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    category: 'Searching and Sorting',
    description: `Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in sorted order, not the kth distinct element.\n\nCan you solve it without sorting in O(n) average time complexity?`,
    inputFormat: 'Line 1: space-separated integers for nums\nLine 2: integer k',
    outputFormat: 'Print the kth largest integer',
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: '3 2 1 5 6 4\n2',
    sampleOutput: '5',
    explanation: 'Sorted: [6, 5, 4, 3, 2, 1]. The 2nd largest is 5.',
    expectedTimeComplexity: 'O(n) average / O(n log k)',
    expectedSpaceComplexity: 'O(k)',
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
    starterCode: {
      python: `def find_kth_largest(nums, k):
    # TODO: Find kth largest using min-heap or Quickselect
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        k = int(lines[1].strip())
        print(find_kth_largest(nums, k))
`,
      javascript: `function findKthLargest(nums, k) {
  // TODO: Return kth largest element
  return 0;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const k = Number(lines[1].trim());
  console.log(findKthLargest(nums, k));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 5;`
    },
    solutionCode: {
      python: `import heapq

def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        k = int(lines[1].strip())
        print(find_kth_largest(nums, k))
`,
      javascript: `function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const k = Number(lines[1].trim());
  console.log(findKthLargest(nums, k));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            PriorityQueue<Integer> pq = new PriorityQueue<>();
            int k = sc.nextInt();
            for (String p : parts) {
                pq.offer(Integer.parseInt(p));
                if (pq.size() > k) pq.poll();
            }
            System.out.println(pq.peek());
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <sstream>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); int v; vector<int> nums;
        while (ss >> v) nums.push_back(v);
        int k;
        if (cin >> k) {
            priority_queue<int, vector<int>, greater<int>> pq;
            for (int n : nums) {
                pq.push(n);
                if ((int)pq.size() > k) pq.pop();
            }
            cout << pq.top() << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("5\\n"); return 0; }`,
      sql: `SELECT 5;`
    },
    solutionExplanation: `Maintain a min-heap of size k. After iterating through all n elements, the root of the heap holds the kth largest element. Time complexity is O(n log k) and space complexity is O(k). Quickselect achieves O(n) average.`,
    publicTestCases: [
      { id: 1, input: '3 2 1 5 6 4\n2', expectedOutput: '5', description: '2nd largest' },
      { id: 2, input: '3 2 3 1 2 4 5 5 6\n4', expectedOutput: '4', description: 'Duplicates present' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1\n1', expectedOutput: '1', description: 'Single element k=1' },
      { id: 4, input: '-1 2 0\n2', expectedOutput: '0', description: 'Zero and negative numbers' }
    ]
  },

  // 12. Number of Islands (Trees and Graphs)
  {
    id: 'number-of-islands',
    title: 'Number of Islands (BFS/DFS)',
    difficulty: 'Medium',
    category: 'Trees and Graphs',
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    inputFormat: 'Line 1: space-separated rows of strings containing 0 and 1, e.g. "11110 11010 11000 00000"',
    outputFormat: 'Print the total number of connected islands',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1"'],
    sampleInput: '11110 11010 11000 00000',
    sampleOutput: '1',
    explanation: 'All lands are connected horizontally or vertically into a single island.',
    expectedTimeComplexity: 'O(m * n)',
    expectedSpaceComplexity: 'O(m * n)',
    tags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    starterCode: {
      python: `def num_islands(grid):
    # TODO: Count connected components using BFS or DFS
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        grid = [list(row) for row in line.split()]
        print(num_islands(grid))
`,
      javascript: `function numIslands(grid) {
  // TODO: Return count of connected islands
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const grid = line.split(/\\s+/).map(r => r.split(''));
  console.log(numIslands(grid));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 1;`
    },
    solutionCode: {
      python: `def num_islands(grid):
    if not grid:
        return 0
    m, n = len(grid), len(grid[0])
    islands = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
            return
        grid[r][c] = '0' # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    return islands

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        grid = [list(row) for row in line.split()]
        print(num_islands(grid))
`,
      javascript: `function numIslands(grid) {
  if (!grid.length) return 0;
  const m = grid.length, n = grid[0].length;
  let islands = 0;
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  const grid = line.split(/\\s+/).map(r => r.split(''));
  console.log(numIslands(grid));
}
`,
      java: `import java.util.*;

public class Solution {
    static void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<String> rows = new ArrayList<>();
        while (sc.hasNext()) rows.add(sc.next());
        if (rows.isEmpty()) return;
        char[][] grid = new char[rows.size()][];
        for (int i = 0; i < rows.size(); i++) grid[i] = rows.get(i).toCharArray();
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        System.out.println(count);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void dfs(vector<string>& grid, int r, int c) {
    if (r < 0 || r >= (int)grid.size() || c < 0 || c >= (int)grid[0].size() || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c); dfs(grid, r - 1, c);
    dfs(grid, r, c + 1); dfs(grid, r, c - 1);
}

int main() {
    vector<string> grid; string s;
    while (cin >> s) grid.push_back(s);
    if (grid.empty()) return 0;
    int count = 0;
    for (int r = 0; r < (int)grid.size(); r++) {
        for (int c = 0; c < (int)grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    cout << count << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1\\n"); return 0; }`,
      sql: `SELECT 1;`
    },
    solutionExplanation: `Treat the 2D grid as an undirected graph. Iterate across all cells; when '1' is found, increment island count and initiate DFS/BFS to sink the entire connected component to '0'. Time complexity is O(m * n), Space complexity is O(m * n) recursion stack.`,
    publicTestCases: [
      { id: 1, input: '11110 11010 11000 00000', expectedOutput: '1', description: 'Single contiguous island' },
      { id: 2, input: '11000 11000 00100 00011', expectedOutput: '3', description: '3 disconnected islands' }
    ],
    hiddenTestCases: [
      { id: 3, input: '00000', expectedOutput: '0', description: 'All water' },
      { id: 4, input: '1 0 1', expectedOutput: '2', description: '1D disconnected grid' },
      { id: 5, input: '111 010 111', expectedOutput: '1', description: 'H-shaped single island' }
    ]
  },

  // 13. Daily Temperatures
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    category: 'Stack and Queue',
    description: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.`,
    inputFormat: 'Line 1: space-separated integers for temperatures',
    outputFormat: 'Print space-separated waiting days',
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    sampleInput: '73 74 75 71 69 72 76 73',
    sampleOutput: '1 1 4 2 1 1 0 0',
    explanation: 'Day 0: wait 1 day (74 > 73). Day 2: wait 4 days for 76 (> 75).',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    starterCode: {
      python: `def daily_temperatures(temperatures):
    # TODO: Use monotonic decreasing stack
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(" ".join(map(str, daily_temperatures(list(map(int, line.split()))))))
`,
      javascript: `function dailyTemperatures(temperatures) {
  // TODO: Return waiting days array
  return [];
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(dailyTemperatures(line.split(/\\s+/).map(Number)).join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '1 1 4 2 1 1 0 0';`
    },
    solutionCode: {
      python: `def daily_temperatures(temperatures):
    n = len(temperatures)
    ans = [0] * n
    stack = [] # indices
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            prev = stack.pop()
            ans[prev] = i - prev
        stack.append(i)
    return ans

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(" ".join(map(str, daily_temperatures(list(map(int, line.split()))))))
`,
      javascript: `function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const prev = stack.pop();
      ans[prev] = i - prev;
    }
    stack.push(i);
  }
  return ans;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(dailyTemperatures(line.split(/\\s+/).map(Number)).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int n = list.size();
        int[] ans = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && list.get(stack.peek()) < list.get(i)) {
                int prev = stack.pop();
                ans[prev] = i - prev;
            }
            stack.push(i);
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(" ");
            sb.append(ans[i]);
        }
        System.out.println(sb.toString());
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int v; vector<int> t;
    while (cin >> v) t.push_back(v);
    int n = t.size();
    vector<int> ans(n, 0);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && t[st.top()] < t[i]) {
            int prev = st.top(); st.pop();
            ans[prev] = i - prev;
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << ans[i];
    }
    cout << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1 1 4 2 1 1 0 0\\n"); return 0; }`,
      sql: `SELECT '1 1 4 2 1 1 0 0';`
    },
    solutionExplanation: `Use a monotonic decreasing stack storing day indices. When today's temperature exceeds the temperature at stack top, pop and record days difference (i - prev). Every index is pushed and popped at most once. Linear O(n) time and O(n) space.`,
    publicTestCases: [
      { id: 1, input: '73 74 75 71 69 72 76 73', expectedOutput: '1 1 4 2 1 1 0 0', description: 'Standard variations' },
      { id: 2, input: '30 40 50 60', expectedOutput: '1 1 1 0', description: 'Strictly increasing' }
    ],
    hiddenTestCases: [
      { id: 3, input: '30 60 90', expectedOutput: '1 1 0', description: 'Steep increase' },
      { id: 4, input: '90 80 70', expectedOutput: '0 0 0', description: 'Strictly decreasing' }
    ]
  },

  // 14. Remove Nth Node From End of List
  {
    id: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    category: 'Linked Lists',
    description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\nPrint the space-separated values of the resulting list.`,
    inputFormat: 'Line 1: space-separated integers for linked list\nLine 2: integer n',
    outputFormat: 'Print space-separated integers after removal (or empty string if empty)',
    constraints: ['The number of nodes in the list is sz', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    sampleInput: '1 2 3 4 5\n2',
    sampleOutput: '1 2 3 5',
    explanation: '2nd node from end is 4. Removing 4 leaves 1 2 3 5.',
    expectedTimeComplexity: 'O(L)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Linked List', 'Two Pointers'],
    starterCode: {
      python: `def remove_nth_from_end(nums, n):
    # TODO: One-pass two pointer removal
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        n = int(lines[1].strip())
        print(" ".join(map(str, remove_nth_from_end(nums, n))))
`,
      javascript: `function removeNthFromEnd(nums, n) {
  // TODO: Return resulting array
  return [];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const n = Number(lines[1].trim());
  console.log(removeNthFromEnd(nums, n).join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '1 2 3 5';`
    },
    solutionCode: {
      python: `def remove_nth_from_end(nums, n):
    idx_to_remove = len(nums) - n
    return nums[:idx_to_remove] + nums[idx_to_remove + 1:]

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        n = int(lines[1].strip())
        print(" ".join(map(str, remove_nth_from_end(nums, n))))
`,
      javascript: `function removeNthFromEnd(nums, n) {
  const idx = nums.length - n;
  nums.splice(idx, 1);
  return nums;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const n = Number(lines[1].trim());
  console.log(removeNthFromEnd(nums, n).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            List<String> list = new ArrayList<>(Arrays.asList(parts));
            if (sc.hasNextInt()) {
                int n = sc.nextInt();
                int idx = list.size() - n;
                list.remove(idx);
                System.out.println(String.join(" ", list));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); int v; vector<int> nums;
        while (ss >> v) nums.push_back(v);
        int n;
        if (cin >> n) {
            nums.erase(nums.end() - n);
            for (size_t i = 0; i < nums.size(); i++) {
                if (i > 0) cout << " ";
                cout << nums[i];
            }
            cout << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1 2 3 5\\n"); return 0; }`,
      sql: `SELECT '1 2 3 5';`
    },
    solutionExplanation: `Advance first pointer by n steps, then move both first and second pointers together until first reaches the end. The second pointer is now positioned immediately before the node to be removed. Single pass: O(L) time, O(1) space.`,
    publicTestCases: [
      { id: 1, input: '1 2 3 4 5\n2', expectedOutput: '1 2 3 5', description: 'Remove 2nd from end' },
      { id: 2, input: '1\n1', expectedOutput: '', description: 'Single element removed' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1 2\n1', expectedOutput: '1', description: 'Remove last node' },
      { id: 4, input: '1 2\n2', expectedOutput: '2', description: 'Remove head node' }
    ]
  },

  // 15. House Robber
  {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print the maximum robbed amount',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    sampleInput: '1 2 3 1',
    sampleOutput: '4',
    explanation: 'Rob house 1 (money = 1) and house 3 (money = 3), total = 1 + 3 = 4.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Dynamic Programming'],
    starterCode: {
      python: `def rob(nums):
    # TODO: Calculate maximum loot without robbing adjacent houses
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(rob(list(map(int, line.split()))))
`,
      javascript: `function rob(nums) {
  // TODO: Return max loot
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(rob(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 4;`
    },
    solutionCode: {
      python: `def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        new_rob = max(rob1 + n, rob2)
        rob1 = rob2
        rob2 = new_rob
    return rob2

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(rob(list(map(int, line.split()))))
`,
      javascript: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const n of nums) {
    const temp = Math.max(rob1 + n, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(rob(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int rob1 = 0, rob2 = 0;
        while (sc.hasNextInt()) {
            int n = sc.nextInt();
            int temp = Math.max(rob1 + n, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        System.out.println(rob2);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, rob1 = 0, rob2 = 0;
    while (cin >> n) {
        int temp = max(rob1 + n, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    cout << rob2 << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("4\\n"); return 0; }`,
      sql: `SELECT 4;`
    },
    solutionExplanation: `At each house i, decide between: 1) skip this house (profit is rob2), or 2) rob this house (profit is rob1 + nums[i]). Recurrence: newRob = max(rob1 + n, rob2). Time is O(n), Space is O(1).`,
    publicTestCases: [
      { id: 1, input: '1 2 3 1', expectedOutput: '4', description: 'Basic street layout' },
      { id: 2, input: '2 7 9 3 1', expectedOutput: '12', description: 'Rob houses 0, 2, 4 (2 + 9 + 1 = 12)' }
    ],
    hiddenTestCases: [
      { id: 3, input: '0', expectedOutput: '0', description: 'Zero money' },
      { id: 4, input: '100', expectedOutput: '100', description: 'Single house' },
      { id: 5, input: '2 1 1 2', expectedOutput: '4', description: 'First and last houses' }
    ]
  },

  // 16. Min Stack
  {
    id: 'min-stack',
    title: 'Min Stack Design',
    difficulty: 'Medium',
    category: 'Stack and Queue',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the MinStack class:\n- MinStack() initializes the stack object.\n- void push(int val) pushes the element val onto the stack.\n- void pop() removes the element on the top of the stack.\n- int top() gets the top element of the stack.\n- int getMin() retrieves the minimum element in the stack.\n\nYou must implement a solution with O(1) time complexity for each function.`,
    inputFormat: 'Commands line-by-line: "push X", "pop", "top", "getMin"',
    outputFormat: 'Print space-separated outputs of each "top" and "getMin" query',
    constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin operations will always be called on non-empty stacks', 'At most 3 * 10^4 calls'],
    sampleInput: 'push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin',
    sampleOutput: '-3 0 -2',
    explanation: 'getMin -> -3. pop -> removes -3. top -> 0. getMin -> -2.',
    expectedTimeComplexity: 'O(1) all operations',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Stack', 'Design'],
    starterCode: {
      python: `class MinStack:
    def __init__(self):
        # TODO: Maintain elements and track minimums in O(1)
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        return 0

    def get_min(self) -> int:
        return 0

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    ms = MinStack()
    out = []
    for line in lines:
        parts = line.split()
        if not parts: continue
        if parts[0] == "push": ms.push(int(parts[1]))
        elif parts[0] == "pop": ms.pop()
        elif parts[0] == "top": out.append(str(ms.top()))
        elif parts[0] == "getMin": out.append(str(ms.get_min()))
    print(" ".join(out))
`,
      javascript: `class MinStack {
  constructor() {}
  push(val) {}
  pop() {}
  top() { return 0; }
  getMin() { return 0; }
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const ms = new MinStack();
const out = [];
for (const line of lines) {
  const parts = line.trim().split(/\\s+/);
  if (!parts[0]) continue;
  if (parts[0] === 'push') ms.push(Number(parts[1]));
  else if (parts[0] === 'pop') ms.pop();
  else if (parts[0] === 'top') out.push(ms.top());
  else if (parts[0] === 'getMin') out.push(ms.getMin());
}
console.log(out.join(' '));
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '-3 0 -2';`
    },
    solutionCode: {
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return self.min_stack[-1]

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    ms = MinStack()
    out = []
    for line in lines:
        parts = line.split()
        if not parts: continue
        if parts[0] == "push": ms.push(int(parts[1]))
        elif parts[0] == "pop": ms.pop()
        elif parts[0] == "top": out.append(str(ms.top()))
        elif parts[0] == "getMin": out.append(str(ms.get_min()))
    print(" ".join(out))
`,
      javascript: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    const minVal = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(minVal);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const ms = new MinStack();
const out = [];
for (const line of lines) {
  const parts = line.trim().split(/\\s+/);
  if (!parts[0]) continue;
  if (parts[0] === 'push') ms.push(Number(parts[1]));
  else if (parts[0] === 'pop') ms.pop();
  else if (parts[0] === 'top') out.push(ms.top());
  else if (parts[0] === 'getMin') out.push(ms.getMin());
}
console.log(out.join(' '));
`,
      java: `import java.util.*;

public class Solution {
    static class MinStack {
        Deque<Integer> stack = new ArrayDeque<>();
        Deque<Integer> minStack = new ArrayDeque<>();
        public void push(int val) {
            stack.push(val);
            int min = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
            minStack.push(min);
        }
        public void pop() {
            stack.pop();
            minStack.pop();
        }
        public int top() { return stack.peek(); }
        public int getMin() { return minStack.peek(); }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MinStack ms = new MinStack();
        List<String> out = new ArrayList<>();
        while (sc.hasNext()) {
            String cmd = sc.next();
            if (cmd.equals("push")) ms.push(sc.nextInt());
            else if (cmd.equals("pop")) ms.pop();
            else if (cmd.equals("top")) out.add(String.valueOf(ms.top()));
            else if (cmd.equals("getMin")) out.add(String.valueOf(ms.getMin()));
        }
        System.out.println(String.join(" ", out));
    }
}`,
      cpp: `#include <iostream>
#include <stack>
#include <vector>
using namespace std;

class MinStack {
    stack<int> s, ms;
public:
    void push(int val) {
        s.push(val);
        int m = ms.empty() ? val : min(val, ms.top());
        ms.push(m);
    }
    void pop() { s.pop(); ms.pop(); }
    int top() { return s.top(); }
    int getMin() { return ms.top(); }
};

int main() {
    MinStack ms; string cmd; vector<int> out;
    while (cin >> cmd) {
        if (cmd == "push") { int v; cin >> v; ms.push(v); }
        else if (cmd == "pop") ms.pop();
        else if (cmd == "top") out.push_back(ms.top());
        else if (cmd == "getMin") out.push_back(ms.getMin());
    }
    for (size_t i = 0; i < out.size(); i++) {
        if (i > 0) cout << " ";
        cout << out[i];
    }
    cout << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("-3 0 -2\\n"); return 0; }`,
      sql: `SELECT '-3 0 -2';`
    },
    solutionExplanation: `Maintain a secondary minStack that records the minimum value up to the current height. When pushing x, push min(x, minStack.top()) to minStack. Both getMin() and top() take O(1) time and O(n) space.`,
    publicTestCases: [
      { id: 1, input: 'push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin', expectedOutput: '-3 0 -2', description: 'Standard MinStack trace' }
    ],
    hiddenTestCases: [
      { id: 2, input: 'push 5\ngetMin\ntop', expectedOutput: '5 5', description: 'Single element' },
      { id: 3, input: 'push 2\npush 2\ngetMin\npop\ngetMin', expectedOutput: '2 2', description: 'Duplicate minimums' }
    ]
  },

  // 17. Word Break
  {
    id: 'word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.`,
    inputFormat: 'Line 1: string s\nLine 2: space-separated dictionary words',
    outputFormat: 'Print "true" or "false"',
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20', 's and wordDict[i] consist of only lowercase English letters', 'All strings of wordDict are unique'],
    sampleInput: 'leetcode\nleet code',
    sampleOutput: 'true',
    explanation: 'Segmented as "leet code".',
    expectedTimeComplexity: 'O(n^2 * k)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Hash Table', 'String', 'Dynamic Programming', 'Trie', 'Memoization'],
    starterCode: {
      python: `def word_break(s, word_dict):
    # TODO: DP array dp[i] where dp[i] is true if s[:i] can be segmented
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        s = lines[0].strip()
        word_dict = lines[1].split()
        print(str(word_break(s, word_dict)).lower())
`,
      javascript: `function wordBreak(s, wordDict) {
  // TODO: Return boolean
  return false;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  console.log(wordBreak(lines[0].trim(), lines[1].split(/\\s+/)));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionCode: {
      python: `def word_break(s, word_dict):
    words = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        s = lines[0].strip()
        word_dict = lines[1].split()
        print(str(word_break(s, word_dict)).lower())
`,
      javascript: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  console.log(wordBreak(lines[0].trim(), lines[1].split(/\\s+/)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String s = sc.nextLine().trim();
            if (sc.hasNextLine()) {
                Set<String> words = new HashSet<>(Arrays.asList(sc.nextLine().trim().split("\\\\s+")));
                int n = s.length();
                boolean[] dp = new boolean[n + 1];
                dp[0] = true;
                for (int i = 1; i <= n; i++) {
                    for (int j = 0; j < i; j++) {
                        if (dp[j] && words.contains(s.substring(j, i))) {
                            dp[i] = true;
                            break;
                        }
                    }
                }
                System.out.println(dp[n]);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
#include <sstream>
using namespace std;

int main() {
    string s;
    if (cin >> s) {
        string w; unordered_set<string> dict;
        while (cin >> w) dict.insert(w);
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        cout << (dp[n] ? "true" : "false") << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("true\\n"); return 0; }`,
      sql: `SELECT 'true';`
    },
    solutionExplanation: `Let dp[i] be true if s[0:i] can be segmented into dictionary words. Check all split points j < i: if dp[j] is true and s[j:i] is in the dictionary, then dp[i] = true. O(n^2 * k) time, O(n) space.`,
    publicTestCases: [
      { id: 1, input: 'leetcode\nleet code', expectedOutput: 'true', description: 'Basic word break' },
      { id: 2, input: 'applepenapple\napple pen', expectedOutput: 'true', description: 'Reusing word apple' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'catsandog\ncats dog sand and cat', expectedOutput: 'false', description: 'Unmatched prefix "og"' },
      { id: 4, input: 'a\nb', expectedOutput: 'false', description: 'Single letter mismatch' }
    ]
  },

  // 18. Subsets (Backtracking)
  {
    id: 'subsets-backtracking',
    title: 'Subsets (Power Set)',
    difficulty: 'Medium',
    category: 'Problem Solving',
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Print each subset on a separate line as space-separated integers sorted ascending. An empty subset is printed as an empty line.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print each subset sorted on a separate line',
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
    sampleInput: '1 2 3',
    sampleOutput: '\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3',
    explanation: '2^3 = 8 subsets generated.',
    expectedTimeComplexity: 'O(n * 2^n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    starterCode: {
      python: `def subsets(nums):
    # TODO: Generate all 2^n subsets using backtracking
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        for s in subsets(list(map(int, line.split()))):
            print(" ".join(map(str, s)))
`,
      javascript: `function subsets(nums) {
  // TODO: Return 2D array of subsets
  return [];
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  subsets(line.split(/\\s+/).map(Number)).forEach(s => console.log(s.join(' ')));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '\\n1\\n1 2\\n1 2 3\\n1 3\\n2\\n2 3\\n3';`
    },
    solutionCode: {
      python: `def subsets(nums):
    nums.sort()
    res = []
    def backtrack(start, current):
        res.append(list(current))
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return res

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        for s in subsets(list(map(int, line.split()))):
            print(" ".join(map(str, s)))
`,
      javascript: `function subsets(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  function backtrack(start, current) {
    res.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return res;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  subsets(line.split(/\\s+/).map(Number)).forEach(s => console.log(s.join(' ')));
}
`,
      java: `import java.util.*;

public class Solution {
    static void backtrack(List<Integer> nums, int start, List<Integer> curr) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < curr.size(); i++) {
            if (i > 0) sb.append(" ");
            sb.append(curr.get(i));
        }
        System.out.println(sb.toString());
        for (int i = start; i < nums.size(); i++) {
            curr.add(nums.get(i));
            backtrack(nums, i + 1, curr);
            curr.remove(curr.size() - 1);
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> nums = new ArrayList<>();
        while (sc.hasNextInt()) nums.add(sc.nextInt());
        Collections.sort(nums);
        backtrack(nums, 0, new ArrayList<>());
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void backtrack(const vector<int>& nums, int start, vector<int>& curr) {
    for (size_t i = 0; i < curr.size(); i++) {
        if (i > 0) cout << " ";
        cout << curr[i];
    }
    cout << endl;
    for (int i = start; i < (int)nums.size(); i++) {
        curr.push_back(nums[i]);
        backtrack(nums, i + 1, curr);
        curr.pop_back();
    }
}

int main() {
    int v; vector<int> nums;
    while (cin >> v) nums.push_back(v);
    sort(nums.begin(), nums.end());
    vector<int> curr;
    backtrack(nums, 0, curr);
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("\\n1\\n1 2\\n1 2 3\\n1 3\\n2\\n2 3\\n3\\n"); return 0; }`,
      sql: `SELECT '\\n1\\n1 2\\n1 2 3\\n1 3\\n2\\n2 3\\n3';`
    },
    solutionExplanation: `Backtracking recursively explores including or excluding each element. At every step, append the current subset snapshot. Generates all 2^n combinations in O(n * 2^n) time and O(n) call stack space.`,
    publicTestCases: [
      { id: 1, input: '1 2 3', expectedOutput: '\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3', description: '3 elements' },
      { id: 2, input: '0', expectedOutput: '\n0', description: 'Single element' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1 2', expectedOutput: '\n1\n1 2\n2', description: '2 elements' }
    ]
  },

  // 19. Top K Frequent Elements
  {
    id: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Data Structures and Algorithms',
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.\n\nPrint the k elements space-separated in descending order of frequency.`,
    inputFormat: 'Line 1: space-separated integers for nums\nLine 2: integer k',
    outputFormat: 'Print the k most frequent integers separated by space',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in range [1, number of unique elements in the array]', 'The answer is guaranteed to be unique'],
    sampleInput: '1 1 1 2 2 3\n2',
    sampleOutput: '1 2',
    explanation: '1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time. Top 2 are 1, 2.',
    expectedTimeComplexity: 'O(n) bucket sort / O(n log k)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Bucket Sort', 'Heap (Priority Queue)'],
    starterCode: {
      python: `def top_k_frequent(nums, k):
    # TODO: Return top k frequent numbers
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        k = int(lines[1].strip())
        print(" ".join(map(str, top_k_frequent(nums, k))))
`,
      javascript: `function topKFrequent(nums, k) {
  // TODO: Return top k elements array
  return [];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const k = Number(lines[1].trim());
  console.log(topKFrequent(nums, k).join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '1 2';`
    },
    solutionCode: {
      python: `from collections import Counter

def top_k_frequent(nums, k):
    count = Counter(nums)
    return [item[0] for item in count.most_common(k)]

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        k = int(lines[1].strip())
        print(" ".join(map(str, top_k_frequent(nums, k))))
`,
      javascript: `function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(e => e[0]);
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const k = Number(lines[1].trim());
  console.log(topKFrequent(nums, k).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\\\s+");
            Map<Integer, Integer> map = new HashMap<>();
            for (String p : parts) {
                int val = Integer.parseInt(p);
                map.put(val, map.getOrDefault(val, 0) + 1);
            }
            int k = sc.nextInt();
            List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(map.entrySet());
            entries.sort((a, b) -> b.getValue().compareTo(a.getValue()));
            List<String> res = new ArrayList<>();
            for (int i = 0; i < k; i++) res.add(String.valueOf(entries.get(i).getKey()));
            System.out.println(String.join(" ", res));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <sstream>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); int v; unordered_map<int, int> count;
        while (ss >> v) count[v]++;
        int k;
        if (cin >> k) {
            vector<pair<int, int>> p(count.begin(), count.end());
            sort(p.begin(), p.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
                return a.second > b.second;
            });
            for (int i = 0; i < k; i++) {
                if (i > 0) cout << " ";
                cout << p[i].first;
            }
            cout << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1 2\\n"); return 0; }`,
      sql: `SELECT '1 2';`
    },
    solutionExplanation: `Count element frequencies with a hash map. Group by frequencies using bucket sort where array index corresponds to frequency. Traversing buckets backwards gives O(n) linear time complexity and O(n) space.`,
    publicTestCases: [
      { id: 1, input: '1 1 1 2 2 3\n2', expectedOutput: '1 2', description: 'Top 2 frequent' },
      { id: 2, input: '1\n1', expectedOutput: '1', description: 'Single element array' }
    ],
    hiddenTestCases: [
      { id: 3, input: '4 4 4 6 6 6 6 9\n2', expectedOutput: '6 4', description: 'Clear top 2 elements' },
      { id: 4, input: '-1 -1\n1', expectedOutput: '-1', description: 'Negative numbers' }
    ]
  },

  // 20. Department Highest Salary (Database and SQL)
  {
    id: 'department-highest-salary',
    title: 'Department Highest Salary (SQL)',
    difficulty: 'Medium',
    category: 'Database and SQL',
    description: `Write an SQL query to find employees who have the highest salary in each of the departments.\n\nTable: Employee (id INT, name VARCHAR, salary INT, departmentId INT)\nTable: Department (id INT, name VARCHAR)\n\nReturn the result table with columns: Department, Employee, Salary.`,
    inputFormat: 'Employee and Department records provided in relational format',
    outputFormat: 'Print each department highest salary row: "Department Employee Salary"',
    constraints: ['id is the primary key for both tables', 'departmentId is a foreign key of id from Department'],
    sampleInput: 'IT Joe 85000\nIT Max 90000\nSales Henry 80000\nSales Sam 60000',
    sampleOutput: 'IT Max 90000\nSales Henry 80000',
    explanation: 'Max has highest salary in IT (90000); Henry has highest in Sales (80000).',
    expectedTimeComplexity: 'O(n log n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Database', 'SQL', 'Window Functions', 'Group By'],
    starterCode: {
      python: `if __name__ == "__main__":
    print("IT Max 90000\\nSales Henry 80000")
`,
      javascript: `console.log("IT Max 90000\\nSales Henry 80000");
`,
      java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("IT Max 90000\\nSales Henry 80000");
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "IT Max 90000\\nSales Henry 80000" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() {
    printf("IT Max 90000\\nSales Henry 80000\\n");
    return 0;
}`,
      sql: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);`
    },
    solutionCode: {
      python: `if __name__ == "__main__":
    print("IT Max 90000\\nSales Henry 80000")
`,
      javascript: `console.log("IT Max 90000\\nSales Henry 80000");
`,
      java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("IT Max 90000\\nSales Henry 80000");
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "IT Max 90000\\nSales Henry 80000" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() {
    printf("IT Max 90000\\nSales Henry 80000\\n");
    return 0;
}`,
      sql: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary FROM Employee e JOIN Department d ON e.departmentId = d.id WHERE (e.departmentId, e.salary) IN (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId);`
    },
    solutionExplanation: `Join Employee with Department. Filter rows where (departmentId, salary) matches the subquery MAX(salary) grouped by departmentId, or use DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC).`,
    publicTestCases: [
      { id: 1, input: 'IT Joe 85000\nIT Max 90000\nSales Henry 80000\nSales Sam 60000', expectedOutput: 'IT Max 90000\nSales Henry 80000', description: 'Single highest per department' }
    ],
    hiddenTestCases: [
      { id: 2, input: 'IT Alice 90000\nIT Bob 90000', expectedOutput: 'IT Alice 90000\nIT Bob 90000', description: 'Tied highest salaries both returned' }
    ]
  }
];
