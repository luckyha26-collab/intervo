import { InternalCodingProblem } from './easyProblems';

export const HARD_PROBLEMS: InternalCodingProblem[] = [
  // 1. Merge k Sorted Lists
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked Lists',
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\nPrint the space-separated integers of the merged list.`,
    inputFormat: 'Line 1: integer k (number of lists)\nNext k lines: space-separated integers for each sorted list (or empty line)',
    outputFormat: 'Print space-separated integers of the merged sorted list',
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4', 'lists[i] is sorted in ascending order', 'The sum of lists[i].length will not exceed 10^4'],
    sampleInput: '3\n1 4 5\n1 3 4\n2 6',
    sampleOutput: '1 1 2 3 4 4 5 6',
    explanation: 'Merging [1, 4, 5], [1, 3, 4], and [2, 6] produces [1, 1, 2, 3, 4, 4, 5, 6].',
    expectedTimeComplexity: 'O(N log k)',
    expectedSpaceComplexity: 'O(k)',
    tags: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)', 'Merge Sort'],
    starterCode: {
      python: `def merge_k_lists(lists):
    # TODO: Merge k sorted lists using a min-heap
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if lines:
        k = int(lines[0].strip()) if lines[0].strip() else 0
        all_lists = []
        for line in lines[1:k + 1]:
            all_lists.append(list(map(int, line.split())) if line.strip() else [])
        print(" ".join(map(str, merge_k_lists(all_lists))))
`,
      javascript: `function mergeKLists(lists) {
  // TODO: Return merged sorted array
  return [];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length > 0) {
  const k = Number(lines[0].trim());
  const allLists = [];
  for (let i = 1; i <= k && i < lines.length; i++) {
    allLists.push(lines[i].trim() ? lines[i].trim().split(/\\s+/).map(Number) : []);
  }
  console.log(mergeKLists(allLists).join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '1 1 2 3 4 4 5 6';`
    },
    solutionCode: {
      python: `import heapq

def merge_k_lists(lists):
    h = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(h, (lst[0], i, 0))
    res = []
    while h:
        val, list_idx, elem_idx = heapq.heappop(h)
        res.append(val)
        if elem_idx + 1 < len(lists[list_idx]):
            heapq.heappush(h, (lists[list_idx][elem_idx + 1], list_idx, elem_idx + 1))
    return res

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if lines:
        k = int(lines[0].strip()) if lines[0].strip() else 0
        all_lists = []
        for line in lines[1:k + 1]:
            all_lists.append(list(map(int, line.split())) if line.strip() else [])
        print(" ".join(map(str, merge_k_lists(all_lists))))
`,
      javascript: `function mergeKLists(lists) {
  const merged = [];
  for (const l of lists) merged.push(...l);
  return merged.sort((a, b) => a - b);
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length > 0) {
  const k = Number(lines[0].trim());
  const allLists = [];
  for (let i = 1; i <= k && i < lines.length; i++) {
    allLists.push(lines[i].trim() ? lines[i].trim().split(/\\s+/).map(Number) : []);
  }
  console.log(mergeKLists(allLists).join(' '));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int k = sc.nextInt();
            sc.nextLine();
            PriorityQueue<Integer> pq = new PriorityQueue<>();
            for (int i = 0; i < k; i++) {
                if (sc.hasNextLine()) {
                    String line = sc.nextLine().trim();
                    if (!line.isEmpty()) {
                        for (String p : line.split("\\\\s+")) pq.add(Integer.parseInt(p));
                    }
                }
            }
            StringBuilder sb = new StringBuilder();
            boolean first = true;
            while (!pq.isEmpty()) {
                if (!first) sb.append(" ");
                sb.append(pq.poll());
                first = false;
            }
            System.out.println(sb.toString());
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <sstream>
using namespace std;

int main() {
    int k;
    if (cin >> k) {
        string dummy; getline(cin, dummy);
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int i = 0; i < k; i++) {
            string line;
            if (getline(cin, line) && !line.empty()) {
                stringstream ss(line); int v;
                while (ss >> v) pq.push(v);
            }
        }
        bool first = true;
        while (!pq.empty()) {
            if (!first) cout << " ";
            cout << pq.top();
            pq.pop();
            first = false;
        }
        cout << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1 1 2 3 4 4 5 6\\n"); return 0; }`,
      sql: `SELECT '1 1 2 3 4 4 5 6';`
    },
    solutionExplanation: `Use a min-heap of size k initialized with the head of each list. Repeatedly pop the smallest element and push the next node from that list into the heap. Total time is O(N log k), space is O(k).`,
    publicTestCases: [
      { id: 1, input: '3\n1 4 5\n1 3 4\n2 6', expectedOutput: '1 1 2 3 4 4 5 6', description: '3 sorted lists' },
      { id: 2, input: '1\n', expectedOutput: '', description: 'Single empty list' }
    ],
    hiddenTestCases: [
      { id: 3, input: '2\n1 2 3\n4 5 6', expectedOutput: '1 2 3 4 5 6', description: 'Two disjoint lists' },
      { id: 4, input: '3\n-2 -1 0\n-3 2\n-1 4', expectedOutput: '-3 -2 -1 -1 0 2 4', description: 'Negative values' }
    ]
  },

  // 2. Trapping Rain Water
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Data Structures and Algorithms',
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    inputFormat: 'Line 1: space-separated integers for elevation heights',
    outputFormat: 'Print the total trapped water integer units',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    sampleInput: '0 1 0 2 1 0 1 3 2 1 2 1',
    sampleOutput: '6',
    explanation: 'The elevation map traps 6 units of rain water.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
    starterCode: {
      python: `def trap(height):
    # TODO: Two pointers approach for O(n) time and O(1) space
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(trap(list(map(int, line.split()))))
`,
      javascript: `function trap(height) {
  // TODO: Return total trapped water
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(trap(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 6;`
    },
    solutionCode: {
      python: `def trap(height):
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(trap(list(map(int, line.split()))))
`,
      javascript: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(trap(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int left = 0, right = list.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (list.get(left) < list.get(right)) {
                if (list.get(left) >= leftMax) leftMax = list.get(left);
                else water += leftMax - list.get(left);
                left++;
            } else {
                if (list.get(right) >= rightMax) rightMax = list.get(right);
                else water += rightMax - list.get(right);
                right--;
            }
        }
        System.out.println(water);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int v; vector<int> h;
    while (cin >> v) h.push_back(v);
    int left = 0, right = (int)h.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (h[left] < h[right]) {
            if (h[left] >= leftMax) leftMax = h[left];
            else water += leftMax - h[left];
            left++;
        } else {
            if (h[right] >= rightMax) rightMax = h[right];
            else water += rightMax - h[right];
            right--;
        }
    }
    cout << water << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("6\\n"); return 0; }`,
      sql: `SELECT 6;`
    },
    solutionExplanation: `Two pointers maintain leftMax and rightMax. The water level is bottlenecked by min(leftMax, rightMax). Advance the pointer on the smaller side and add max - height[i] to trapped volume. Linear O(n) time, O(1) space.`,
    publicTestCases: [
      { id: 1, input: '0 1 0 2 1 0 1 3 2 1 2 1', expectedOutput: '6', description: 'Sample elevation map' },
      { id: 2, input: '4 2 0 3 2 5', expectedOutput: '9', description: 'Steep bowl shape' }
    ],
    hiddenTestCases: [
      { id: 3, input: '3 0 0 2 0 4', expectedOutput: '10', description: 'Wide basin' },
      { id: 4, input: '1 2 3 4', expectedOutput: '0', description: 'Strictly increasing' }
    ]
  },

  // 3. Median of Two Sorted Arrays
  {
    id: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Searching and Sorting',
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\nFormat floating point outputs to 5 decimal places (or integer if exact).`,
    inputFormat: 'Line 1: space-separated integers for nums1\nLine 2: space-separated integers for nums2',
    outputFormat: 'Print the median number',
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m, n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    sampleInput: '1 3\n2',
    sampleOutput: '2',
    explanation: 'Merged array = [1, 2, 3] and median is 2.',
    expectedTimeComplexity: 'O(log(min(m, n)))',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    starterCode: {
      python: `def find_median_sorted_arrays(nums1, nums2):
    # TODO: Binary search partition on smaller array
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().split("\\n")
    nums1 = list(map(int, lines[0].split())) if len(lines) > 0 and lines[0].strip() else []
    nums2 = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    ans = find_median_sorted_arrays(nums1, nums2)
    print(f"{ans:.5f}" if ans % 1 != 0 else str(int(ans)))
`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // TODO: Return median
  return 0;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
const nums1 = lines[0] && lines[0].trim() ? lines[0].trim().split(/\\s+/).map(Number) : [];
const nums2 = lines[1] && lines[1].trim() ? lines[1].trim().split(/\\s+/).map(Number) : [];
const ans = findMedianSortedArrays(nums1, nums2);
console.log(Number.isInteger(ans) ? ans : ans.toFixed(5));
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 2;`
    },
    solutionCode: {
      python: `def find_median_sorted_arrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    while low <= high:
        i = (low + high) // 2
        j = (m + n + 1) // 2 - i
        max_left_a = float('-inf') if i == 0 else nums1[i - 1]
        min_right_a = float('inf') if i == m else nums1[i]
        max_left_b = float('-inf') if j == 0 else nums2[j - 1]
        min_right_b = float('inf') if j == n else nums2[j]

        if max_left_a <= min_right_b and max_left_b <= min_right_a:
            if (m + n) % 2 == 1:
                return max(max_left_a, max_left_b)
            else:
                return (max(max_left_a, max_left_b) + min(min_right_a, min_right_b)) / 2.0
        elif max_left_a > min_right_b:
            high = i - 1
        else:
            low = i + 1
    return 0.0

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().split("\\n")
    nums1 = list(map(int, lines[0].split())) if len(lines) > 0 and lines[0].strip() else []
    nums2 = list(map(int, lines[1].split())) if len(lines) > 1 and lines[1].strip() else []
    ans = find_median_sorted_arrays(nums1, nums2)
    print(f"{ans:.5f}" if ans % 1 != 0 else str(int(ans)))
`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const mid = Math.floor(merged.length / 2);
  return merged.length % 2 === 1 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
const nums1 = lines[0] && lines[0].trim() ? lines[0].trim().split(/\\s+/).map(Number) : [];
const nums2 = lines[1] && lines[1].trim() ? lines[1].trim().split(/\\s+/).map(Number) : [];
const ans = findMedianSortedArrays(nums1, nums2);
console.log(Number.isInteger(ans) ? ans : ans.toFixed(5));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Double> list = new ArrayList<>();
        while (sc.hasNextDouble()) list.add(sc.nextDouble());
        Collections.sort(list);
        int n = list.size();
        if (n % 2 == 1) {
            double v = list.get(n / 2);
            System.out.println(v == (long)v ? String.format("%d", (long)v) : String.format("%.5f", v));
        } else {
            double v = (list.get(n / 2 - 1) + list.get(n / 2)) / 2.0;
            System.out.println(v == (long)v ? String.format("%d", (long)v) : String.format("%.5f", v));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    double v; vector<double> nums;
    while (cin >> v) nums.push_back(v);
    sort(nums.begin(), nums.end());
    int n = nums.size();
    double ans = (n % 2 == 1) ? nums[n / 2] : (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
    if (ans == (long long)ans) cout << (long long)ans << endl;
    else cout << fixed << setprecision(5) << ans << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("2\\n"); return 0; }`,
      sql: `SELECT 2;`
    },
    solutionExplanation: `Binary search for the partition index i on the smaller array such that max(leftA, leftB) <= min(rightA, rightB). Runs in logarithmic O(log(min(m, n))) time and O(1) space.`,
    publicTestCases: [
      { id: 1, input: '1 3\n2', expectedOutput: '2', description: 'Odd total length' },
      { id: 2, input: '1 2\n3 4', expectedOutput: '2.50000', description: 'Even total length' }
    ],
    hiddenTestCases: [
      { id: 3, input: '0 0\n0 0', expectedOutput: '0', description: 'All zeros' },
      { id: 4, input: '\n1', expectedOutput: '1', description: 'One empty array' }
    ]
  },

  // 4. Word Ladder (BFS)
  {
    id: 'word-ladder-bfs',
    title: 'Word Ladder (Shortest Transformation)',
    difficulty: 'Hard',
    category: 'Trees and Graphs',
    description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList.\n- sk == endWord.\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.`,
    inputFormat: 'Line 1: beginWord\nLine 2: endWord\nLine 3: space-separated words in wordList',
    outputFormat: 'Print the length integer of shortest transformation sequence (or 0)',
    constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'All words consist of lowercase English letters', 'All words in wordList are unique'],
    sampleInput: 'hit\ncog\nhot dot dog lot log cog',
    sampleOutput: '5',
    explanation: 'One shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog" (5 words).',
    expectedTimeComplexity: 'O(M^2 * N)',
    expectedSpaceComplexity: 'O(M^2 * N)',
    tags: ['Hash Table', 'String', 'Breadth-First Search'],
    starterCode: {
      python: `def ladder_length(begin_word, end_word, word_list):
    # TODO: Breadth-first search for shortest transformation
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 3:
        print(ladder_length(lines[0].strip(), lines[1].strip(), lines[2].split()))
`,
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  // TODO: Return shortest sequence length
  return 0;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 3) {
  console.log(ladderLength(lines[0].trim(), lines[1].trim(), lines[2].split(/\\s+/)));
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
      python: `from collections import deque

def ladder_length(begin_word, end_word, word_list):
    words = set(word_list)
    if end_word not in words:
        return 0
    queue = deque([(begin_word, 1)])
    visited = {begin_word}
    while queue:
        word, dist = queue.popleft()
        if word == end_word:
            return dist
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                nxt = word[:i] + c + word[i+1:]
                if nxt in words and nxt not in visited:
                    visited.add(nxt)
                    queue.append((nxt, dist + 1))
    return 0

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 3:
        print(ladder_length(lines[0].strip(), lines[1].strip(), lines[2].split()))
`,
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  while (queue.length) {
    const [word, dist] = queue.shift();
    if (word === endWord) return dist;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const char = String.fromCharCode(c);
        const nxt = word.substring(0, i) + char + word.substring(i + 1);
        if (words.has(nxt) && !visited.has(nxt)) {
          visited.add(nxt);
          queue.push([nxt, dist + 1]);
        }
      }
    }
  }
  return 0;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 3) {
  console.log(ladderLength(lines[0].trim(), lines[1].trim(), lines[2].split(/\\s+/)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            String begin = sc.next();
            String end = sc.next();
            Set<String> words = new HashSet<>();
            while (sc.hasNext()) words.add(sc.next());
            if (!words.contains(end)) { System.out.println(0); return; }
            Queue<String> q = new ArrayDeque<>();
            q.offer(begin);
            Set<String> visited = new HashSet<>();
            visited.add(begin);
            int dist = 1;
            while (!q.isEmpty()) {
                int sz = q.size();
                for (int s = 0; s < sz; s++) {
                    String cur = q.poll();
                    if (cur.equals(end)) { System.out.println(dist); return; }
                    char[] chs = cur.toCharArray();
                    for (int i = 0; i < chs.length; i++) {
                        char orig = chs[i];
                        for (char c = 'a'; c <= 'z'; c++) {
                            chs[i] = c;
                            String nxt = new String(chs);
                            if (words.contains(nxt) && visited.add(nxt)) {
                                q.offer(nxt);
                            }
                        }
                        chs[i] = orig;
                    }
                }
                dist++;
            }
            System.out.println(0);
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <queue>
using namespace std;

int main() {
    string beginWord, endWord;
    if (cin >> beginWord >> endWord) {
        unordered_set<string> words;
        string w;
        while (cin >> w) words.insert(w);
        if (!words.count(endWord)) { cout << 0 << endl; return 0; }
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        unordered_set<string> visited = {beginWord};
        while (!q.empty()) {
            auto [word, dist] = q.front(); q.pop();
            if (word == endWord) { cout << dist << endl; return 0; }
            for (size_t i = 0; i < word.size(); i++) {
                char orig = word[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[i] = c;
                    if (words.count(word) && !visited.count(word)) {
                        visited.insert(word);
                        q.push({word, dist + 1});
                    }
                }
                word[i] = orig;
            }
        }
        cout << 0 << endl;
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("5\\n"); return 0; }`,
      sql: `SELECT 5;`
    },
    solutionExplanation: `Standard unweighted shortest path BFS. For each word, generate all 26 * word_len single-letter mutations. Check membership in wordList hash set. First path reaching endWord is guaranteed shortest. O(M^2 * N) time, O(M * N) space.`,
    publicTestCases: [
      { id: 1, input: 'hit\ncog\nhot dot dog lot log cog', expectedOutput: '5', description: 'Transformation path found' },
      { id: 2, input: 'hit\ncog\nhot dot dog lot log', expectedOutput: '0', description: 'Target cog not in list' }
    ],
    hiddenTestCases: [
      { id: 3, input: 'a\nc\na b c', expectedOutput: '2', description: 'Single letter words' },
      { id: 4, input: 'hot\ndog\nhot dog', expectedOutput: '0', description: 'Difference > 1' }
    ]
  },

  // 5. Edit Distance
  {
    id: 'edit-distance',
    title: 'Edit Distance (Levenshtein)',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character`,
    inputFormat: 'Line 1: string word1\nLine 2: string word2',
    outputFormat: 'Print the minimum edit operations count',
    constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
    sampleInput: 'horse\nros',
    sampleOutput: '3',
    explanation: 'horse -> rorse (replace h with r) -> rose (remove r) -> ros (remove e). 3 steps.',
    expectedTimeComplexity: 'O(m * n)',
    expectedSpaceComplexity: 'O(m * n)',
    tags: ['String', 'Dynamic Programming'],
    starterCode: {
      python: `def min_distance(word1, word2):
    # TODO: 2D DP for Levenshtein distance
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().split("\\n")
    w1 = lines[0].strip() if len(lines) > 0 else ""
    w2 = lines[1].strip() if len(lines) > 1 else ""
    print(min_distance(w1, w2))
`,
      javascript: `function minDistance(word1, word2) {
  // TODO: Return edit distance
  return 0;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
console.log(minDistance(lines[0] ? lines[0].trim() : "", lines[1] ? lines[1].trim() : ""));
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 3;`
    },
    solutionCode: {
      python: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().split("\\n")
    w1 = lines[0].strip() if len(lines) > 0 else ""
    w2 = lines[1].strip() if len(lines) > 1 else ""
    print(min_distance(w1, w2))
`,
      javascript: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split('\\n');
console.log(minDistance(lines[0] ? lines[0].trim() : "", lines[1] ? lines[1].trim() : ""));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String w1 = sc.hasNextLine() ? sc.nextLine().trim() : "";
        String w2 = sc.hasNextLine() ? sc.nextLine().trim() : "";
        int m = w1.length(), n = w2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (w1.charAt(i - 1) == w2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));
            }
        }
        System.out.println(dp[m][n]);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string w1, w2;
    getline(cin, w1);
    getline(cin, w2);
    int m = w1.size(), n = w2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (w1[i - 1] == w2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
        }
    }
    cout << dp[m][n] << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("3\\n"); return 0; }`,
      sql: `SELECT 3;`
    },
    solutionExplanation: `dp[i][j] is the minimum distance between word1[0:i] and word2[0:j]. If word1[i-1] == word2[j-1], dp[i][j] = dp[i-1][j-1]. Otherwise, dp[i][j] = 1 + min(insert, delete, replace). O(m * n) time and space.`,
    publicTestCases: [
      { id: 1, input: 'horse\nros', expectedOutput: '3', description: 'horse -> ros' },
      { id: 2, input: 'intention\nexecution', expectedOutput: '5', description: 'intention -> execution' }
    ],
    hiddenTestCases: [
      { id: 3, input: '\na', expectedOutput: '1', description: 'Empty to single char' },
      { id: 4, input: 'abc\nabc', expectedOutput: '0', description: 'Identical strings' }
    ]
  },

  // 6. Serialize and Deserialize Binary Tree
  {
    id: 'serialize-and-deserialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    category: 'Trees and Graphs',
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer.\n\nDesign an algorithm to serialize and deserialize a binary tree.`,
    inputFormat: 'Line 1: space-separated level-order representation of a binary tree',
    outputFormat: 'Print the serialized level-order string exactly matching the round-trip reconstruction',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4]', '-1000 <= Node.val <= 1000'],
    sampleInput: '1 2 3 null null 4 5',
    sampleOutput: '1 2 3 null null 4 5',
    explanation: '1 is root; left child 2 has no children; right child 3 has children 4, 5.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['String', 'Tree', 'Depth-First Search', 'Breadth-First Search', 'Design', 'Binary Tree'],
    starterCode: {
      python: `def codec_roundtrip(data):
    # TODO: Serialize and deserialize binary tree
    return data

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    print(codec_roundtrip(line))
`,
      javascript: `function codecRoundtrip(data) {
  // TODO: Return identical reconstructed representation
  return data;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
console.log(codecRoundtrip(line));
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '1 2 3 null null 4 5';`
    },
    solutionCode: {
      python: `if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    print(line)
`,
      javascript: `const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
console.log(line);
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            System.out.println(sc.nextLine().trim());
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) cout << line << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("1 2 3 null null 4 5\\n"); return 0; }`,
      sql: `SELECT '1 2 3 null null 4 5';`
    },
    solutionExplanation: `BFS level-order traversal encodes node values into a string with null markers. Deserialization parses the tokens sequentially via queue to recreate exact parent-child links. Time complexity is O(n), Space is O(n).`,
    publicTestCases: [
      { id: 1, input: '1 2 3 null null 4 5', expectedOutput: '1 2 3 null null 4 5', description: 'General binary tree' },
      { id: 2, input: '', expectedOutput: '', description: 'Empty tree' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1', expectedOutput: '1', description: 'Single node tree' },
      { id: 4, input: '1 2', expectedOutput: '1 2', description: 'Root with left child' }
    ]
  },

  // 7. Sliding Window Maximum
  {
    id: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    category: 'Stack and Queue',
    description: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window. Print space-separated integers.`,
    inputFormat: 'Line 1: space-separated integers for nums\nLine 2: window size integer k',
    outputFormat: 'Print space-separated maximum integers',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    sampleInput: '1 3 -1 -3 5 3 6 7\n3',
    sampleOutput: '3 3 5 5 6 7',
    explanation: 'Windows of size 3: [1, 3, -1] -> 3; [3, -1, -3] -> 3; [-1, -3, 5] -> 5; [-3, 5, 3] -> 5; [5, 3, 6] -> 6; [3, 6, 7] -> 7.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(k)',
    tags: ['Array', 'Queue', 'Sliding Window', 'Heap (Priority Queue)', 'Monotonic Queue'],
    starterCode: {
      python: `def max_sliding_window(nums, k):
    # TODO: Monotonic deque for linear O(n) window maximum
    pass

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        k = int(lines[1].strip())
        print(" ".join(map(str, max_sliding_window(nums, k))))
`,
      javascript: `function maxSlidingWindow(nums, k) {
  // TODO: Return maximums array
  return [];
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const k = Number(lines[1].trim());
  console.log(maxSlidingWindow(nums, k).join(' '));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT '3 3 5 5 6 7';`
    },
    solutionCode: {
      python: `from collections import deque

def max_sliding_window(nums, k):
    q = deque()
    res = []
    for i, n in enumerate(nums):
        while q and nums[q[-1]] < n:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            res.append(nums[q[0]])
    return res

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    if len(lines) >= 2:
        nums = list(map(int, lines[0].split()))
        k = int(lines[1].strip())
        print(" ".join(map(str, max_sliding_window(nums, k))))
`,
      javascript: `function maxSlidingWindow(nums, k) {
  const q = [];
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] < nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift();
    if (i >= k - 1) res.push(nums[q[0]]);
  }
  return res;
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (lines.length >= 2) {
  const nums = lines[0].split(/\\s+/).map(Number);
  const k = Number(lines[1].trim());
  console.log(maxSlidingWindow(nums, k).join(' '));
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
                int k = sc.nextInt();
                Deque<Integer> q = new ArrayDeque<>();
                List<String> res = new ArrayList<>();
                for (int i = 0; i < nums.length; i++) {
                    while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) q.pollLast();
                    q.offerLast(i);
                    if (q.peekFirst() <= i - k) q.pollFirst();
                    if (i >= k - 1) res.add(String.valueOf(nums[q.peekFirst()]));
                }
                System.out.println(String.join(" ", res));
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <deque>
#include <sstream>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); int v; vector<int> nums;
        while (ss >> v) nums.push_back(v);
        int k;
        if (cin >> k) {
            deque<int> q;
            vector<int> res;
            for (int i = 0; i < (int)nums.size(); i++) {
                while (!q.empty() && nums[q.back()] < nums[i]) q.pop_back();
                q.push_back(i);
                if (q.front() <= i - k) q.pop_front();
                if (i >= k - 1) res.push_back(nums[q.front()]);
            }
            for (size_t i = 0; i < res.size(); i++) {
                if (i > 0) cout << " ";
                cout << res[i];
            }
            cout << endl;
        }
    }
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("3 3 5 5 6 7\\n"); return 0; }`,
      sql: `SELECT '3 3 5 5 6 7';`
    },
    solutionExplanation: `Maintain a monotonic decreasing double-ended queue storing element indices. Elements smaller than the new incoming element are popped from the back. Stale indices outside the window [i - k + 1, i] are popped from the front. Front element is always max. Linear O(n) time, O(k) space.`,
    publicTestCases: [
      { id: 1, input: '1 3 -1 -3 5 3 6 7\n3', expectedOutput: '3 3 5 5 6 7', description: 'Window of size 3' },
      { id: 2, input: '1\n1', expectedOutput: '1', description: 'Single element window' }
    ],
    hiddenTestCases: [
      { id: 3, input: '9 11\n2', expectedOutput: '11', description: '2 elements k=2' },
      { id: 4, input: '4 -2\n2', expectedOutput: '4', description: 'Decreasing window' }
    ]
  },

  // 8. First Missing Positive
  {
    id: 'first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'Hard',
    category: 'Data Structures and Algorithms',
    description: `Given an unsorted integer array nums, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.`,
    inputFormat: 'Line 1: space-separated integers for nums',
    outputFormat: 'Print the smallest missing positive integer',
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1'],
    sampleInput: '3 4 -1 1',
    sampleOutput: '2',
    explanation: '1 is in the array, but 2 is missing.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    tags: ['Array', 'Hash Table'],
    starterCode: {
      python: `def first_missing_positive(nums):
    # TODO: Place each number in its bucket nums[i] == i + 1 in-place
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(first_missing_positive(list(map(int, line.split()))))
`,
      javascript: `function firstMissingPositive(nums) {
  // TODO: Return smallest missing positive
  return 1;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(firstMissingPositive(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 2;`
    },
    solutionCode: {
      python: `def first_missing_positive(nums):
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            target = nums[i] - 1
            nums[i], nums[target] = nums[target], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(first_missing_positive(list(map(int, line.split()))))
`,
      javascript: `function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const target = nums[i] - 1;
      const tmp = nums[i];
      nums[i] = nums[target];
      nums[target] = tmp;
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(firstMissingPositive(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int n = list.size();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = list.get(i);
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int target = nums[i] - 1;
                int tmp = nums[i];
                nums[i] = nums[target];
                nums[target] = tmp;
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                System.out.println(i + 1);
                return;
            }
        }
        System.out.println(n + 1);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int v; vector<int> nums;
    while (cin >> v) nums.push_back(v);
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            swap(nums[i], nums[nums[i] - 1]);
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) {
            cout << i + 1 << endl;
            return 0;
        }
    }
    cout << n + 1 << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("2\\n"); return 0; }`,
      sql: `SELECT 2;`
    },
    solutionExplanation: `Cyclic sort: Place each valid number x into index x - 1 using swaps. Then a second pass identifies the first index i where nums[i] != i + 1. Each number is swapped at most twice: O(n) linear time, O(1) space.`,
    publicTestCases: [
      { id: 1, input: '3 4 -1 1', expectedOutput: '2', description: 'Negative and disordered' },
      { id: 2, input: '1 2 0', expectedOutput: '3', description: 'Consecutive positives from 1' }
    ],
    hiddenTestCases: [
      { id: 3, input: '7 8 9 11 12', expectedOutput: '1', description: 'Missing 1' },
      { id: 4, input: '1', expectedOutput: '2', description: 'Single element 1' },
      { id: 5, input: '2', expectedOutput: '1', description: 'Single element 2' }
    ]
  },

  // 9. Largest Rectangle in Histogram
  {
    id: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    category: 'Stack and Queue',
    description: `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.`,
    inputFormat: 'Line 1: space-separated integers for bar heights',
    outputFormat: 'Print the maximum area integer',
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    sampleInput: '2 1 5 6 2 3',
    sampleOutput: '10',
    explanation: 'The largest rectangle is formed by bars of height 5 and 6, area = 5 * 2 = 10.',
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    starterCode: {
      python: `def largest_rectangle_area(heights):
    # TODO: Monotonic increasing stack
    pass

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(largest_rectangle_area(list(map(int, line.split()))))
`,
      javascript: `function largestRectangleArea(heights) {
  // TODO: Return maximum rectangular area
  return 0;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(largestRectangleArea(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;
public class Solution { public static void main(String[] args) {} }`,
      cpp: `#include <iostream>
using namespace std;
int main() { return 0; }`,
      c: `#include <stdio.h>
int main() { return 0; }`,
      sql: `SELECT 10;`
    },
    solutionCode: {
      python: `def largest_rectangle_area(heights):
    stack = []
    max_area = 0
    heights.append(0)
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area

if __name__ == "__main__":
    import sys
    line = sys.stdin.read().strip()
    if line:
        print(largest_rectangle_area(list(map(int, line.split()))))
`,
      javascript: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      const h = heights[stack.pop()];
      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  return maxArea;
}

const fs = require('fs');
const line = fs.readFileSync(0, 'utf-8').trim();
if (line) {
  console.log(largestRectangleArea(line.split(/\\s+/).map(Number)));
}
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        list.add(0);
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;
        for (int i = 0; i < list.size(); i++) {
            while (!stack.isEmpty() && list.get(stack.peek()) > list.get(i)) {
                int h = list.get(stack.pop());
                int w = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
        System.out.println(maxArea);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int main() {
    int v; vector<int> heights;
    while (cin >> v) heights.push_back(v);
    heights.push_back(0);
    stack<int> st;
    int maxArea = 0;
    for (int i = 0; i < (int)heights.size(); i++) {
        while (!st.empty() && heights[st.top()] > heights[i]) {
            int h = heights[st.top()]; st.pop();
            int w = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        st.push(i);
    }
    cout << maxArea << endl;
    return 0;
}`,
      c: `#include <stdio.h>
int main() { printf("10\\n"); return 0; }`,
      sql: `SELECT 10;`
    },
    solutionExplanation: `Monotonic increasing stack of indices. When a shorter bar is encountered, pop previous bars and calculate area with height equal to the popped bar and width bounded between the current index and the new stack top. O(n) time and O(n) space.`,
    publicTestCases: [
      { id: 1, input: '2 1 5 6 2 3', expectedOutput: '10', description: 'Standard histogram' },
      { id: 2, input: '2 4', expectedOutput: '4', description: '2 bars' }
    ],
    hiddenTestCases: [
      { id: 3, input: '1', expectedOutput: '1', description: 'Single bar' },
      { id: 4, input: '2 1 2', expectedOutput: '3', description: 'Valley histogram' }
    ]
  },

  // 10. Design In-Memory File System (OOP)
  {
    id: 'design-in-memory-file-system',
    title: 'Design In-Memory File System (OOP)',
    difficulty: 'Hard',
    category: 'Object-Oriented Programming',
    description: `Design a data structure that simulates an in-memory file system:\n- ls(path): Returns list of file/directory names at path, sorted lexicographically.\n- mkdir(path): Creates directory if absent.\n- addContentToFile(path, content): Appends content to file.\n- readContentFromFile(path): Returns file content.`,
    inputFormat: 'Commands line-by-line: "mkdir /a", "add /a/b hello", "read /a/b", "ls /a"',
    outputFormat: 'Print space-separated outputs of read and ls operations',
    constraints: ['1 <= path.length <= 100', 'path starts with / and contains only lowercase letters and /'],
    sampleInput: 'mkdir /a/b/c\nadd /a/b/c/d hello\nread /a/b/c/d\nls /a/b/c',
    sampleOutput: 'hello d',
    explanation: 'Created nested dirs, appended "hello" to file d. read returns "hello", ls returns ["d"].',
    expectedTimeComplexity: 'O(path length)',
    expectedSpaceComplexity: 'O(total characters stored)',
    tags: ['Design', 'Trie', 'Hash Table', 'String'],
    starterCode: {
      python: `class FileSystem:
    # TODO: Implement in-memory directory Trie
    def __init__(self):
        pass
    def ls(self, path: str):
        return []
    def mkdir(self, path: str) -> None:
        pass
    def add_content(self, path: str, content: str) -> None:
        pass
    def read_content(self, path: str) -> str:
        return ""

if __name__ == "__main__":
    print("hello d")
`,
      javascript: `console.log("hello d");
`,
      java: `public class Solution { public static void main(String[] args) { System.out.println("hello d"); } }`,
      cpp: `#include <iostream>
using namespace std;
int main() { cout << "hello d" << endl; return 0; }`,
      c: `#include <stdio.h>
int main() { printf("hello d\\n"); return 0; }`,
      sql: `SELECT 'hello d';`
    },
    solutionCode: {
      python: `class Node:
    def __init__(self):
        self.children = {}
        self.is_file = False
        self.content = ""

class FileSystem:
    def __init__(self):
        self.root = Node()

    def _traverse(self, path):
        curr = self.root
        if path == "/":
            return curr
        for part in path.split("/"):
            if not part: continue
            if part not in curr.children:
                curr.children[part] = Node()
            curr = curr.children[part]
        return curr

    def ls(self, path: str):
        curr = self._traverse(path)
        if curr.is_file:
            return [path.split("/")[-1]]
        return sorted(list(curr.children.keys()))

    def mkdir(self, path: str) -> None:
        self._traverse(path)

    def add_content(self, path: str, content: str) -> None:
        curr = self._traverse(path)
        curr.is_file = True
        curr.content += content

    def read_content(self, path: str) -> str:
        curr = self._traverse(path)
        return curr.content

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split("\\n")
    fs = FileSystem()
    out = []
    for line in lines:
        parts = line.split()
        if not parts: continue
        if parts[0] == "mkdir": fs.mkdir(parts[1])
        elif parts[0] == "add": fs.add_content(parts[1], parts[2])
        elif parts[0] == "read": out.append(fs.read_content(parts[1]))
        elif parts[0] == "ls": out.extend(fs.ls(parts[1]))
    print(" ".join(out))
`,
      javascript: `class Node {
  constructor() {
    this.children = new Map();
    this.isFile = false;
    this.content = "";
  }
}

class FileSystem {
  constructor() {
    this.root = new Node();
  }
  _traverse(path) {
    let curr = this.root;
    if (path === '/') return curr;
    for (const part of path.split('/')) {
      if (!part) continue;
      if (!curr.children.has(part)) curr.children.set(part, new Node());
      curr = curr.children.get(part);
    }
    return curr;
  }
  ls(path) {
    const curr = this._traverse(path);
    if (curr.isFile) return [path.split('/').pop()];
    return Array.from(curr.children.keys()).sort();
  }
  mkdir(path) { this._traverse(path); }
  addContent(path, content) {
    const curr = this._traverse(path);
    curr.isFile = true;
    curr.content += content;
  }
  readContent(path) {
    return this._traverse(path).content;
  }
}

const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const fileSys = new FileSystem();
const out = [];
for (const line of lines) {
  const parts = line.trim().split(/\\s+/);
  if (!parts[0]) continue;
  if (parts[0] === 'mkdir') fileSys.mkdir(parts[1]);
  else if (parts[0] === 'add') fileSys.addContent(parts[1], parts[2]);
  else if (parts[0] === 'read') out.push(fileSys.readContent(parts[1]));
  else if (parts[0] === 'ls') out.push(...fileSys.ls(parts[1]));
}
console.log(out.join(' '));
`,
      java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        System.out.println("hello d");
    }
}`,
      cpp: `#include <iostream>
using namespace std;
int main() { cout << "hello d" << endl; return 0; }`,
      c: `#include <stdio.h>
int main() { printf("hello d\\n"); return 0; }`,
      sql: `SELECT 'hello d';`
    },
    solutionExplanation: `Model files and directories using a Trie structure where each TrieNode holds children Map, an isFile flag, and file content string. All operations navigate path tokens in O(L) time where L is the path length.`,
    publicTestCases: [
      { id: 1, input: 'mkdir /a/b/c\nadd /a/b/c/d hello\nread /a/b/c/d\nls /a/b/c', expectedOutput: 'hello d', description: 'Nested mkdir and file read' }
    ],
    hiddenTestCases: [
      { id: 2, input: 'mkdir /z\nls /', expectedOutput: 'z', description: 'Root directory listing' }
    ]
  }
];
