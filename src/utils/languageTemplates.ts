import { ProgrammingLanguage } from '../types';

/**
 * Standard, clean default syntax according to each programming language.
 * Free of spoilers, unnecessary boilerplate, or complex test-runner bloat.
 */
export const DEFAULT_LANGUAGE_SYNTAX: Record<ProgrammingLanguage, string> = {
  python: `# Write your code here

def main():
    pass

if __name__ == "__main__":
    main()
`,
  javascript: `// Write your code here

function main() {
    
}

main();
`,
  java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Write your code here
    }
}
`,
  cpp: `#include <iostream>

using namespace std;

int main() {
    // Write your code here
    return 0;
}
`,
  c: `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}
`,
  sql: `-- Write your SQL query here
SELECT * FROM table_name;
`
};

export const EMPTY_LANGUAGE_SYNTAX: Record<ProgrammingLanguage, string> = {
  python: '',
  javascript: '',
  java: '',
  cpp: '',
  c: '',
  sql: ''
};

export type CodeStarterMode = 'default-syntax' | 'empty';

export function getStarterCode(language: ProgrammingLanguage, mode: CodeStarterMode = 'default-syntax'): string {
  if (mode === 'empty') {
    return '';
  }
  return DEFAULT_LANGUAGE_SYNTAX[language] || '';
}
