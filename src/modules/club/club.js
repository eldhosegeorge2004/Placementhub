import { GoogleGenerativeAI } from "@google/generative-ai";

export const ClubModule = {
    selectedLanguage: 'JavaScript',
    get apiKey() { return localStorage.getItem('gemini_api_key'); }, set apiKey(val) {},

    // Data-driven problem list
    problems: [
        // JavaScript Problems
        {
            "id": "js_1",
            "language": "JavaScript",
            "title": "Two Sum",
            "desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
            "badge": "Easy",
            "startCode": "function twoSum(nums, target) {\n    // Write your code here\n    \n}\n\n// Test cases\nconsole.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]\nconsole.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]\n",
            "solutionCode": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\nconsole.log('Solution:', twoSum([2, 7, 11, 15], 9));\n",
            "completed": false
        },
        {
            "id": "js_2",
            "language": "JavaScript",
            "title": "Merge Intervals",
            "desc": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
            "badge": "Medium",
            "startCode": "function merge(intervals) {\n    // Write your code here\n    \n}\n\n// Test case\nconsole.log(merge([[1,3],[2,6],[8,10],[15,18]])); // Expected: [[1,6],[8,10],[15,18]]\n",
            "solutionCode": "function merge(intervals) {\n    if (!intervals.length) return [];\n    intervals.sort((a, b) => a[0] - b[0]);\n    const res = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        const last = res[res.length - 1];\n        if (intervals[i][0] <= last[1]) {\n            last[1] = Math.max(last[1], intervals[i][1]);\n        } else {\n            res.push(intervals[i]);\n        }\n    }\n    return res;\n}\n\nconsole.log('Solution:', merge([[1,3],[2,6],[8,10],[15,18]]));\n",
            "completed": false
        },
        {
            "id": "js_3",
            "language": "JavaScript",
            "title": "Trapping Rain Water",
            "desc": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            "badge": "Hard",
            "startCode": "function trap(height) {\n    // Write your code here\n    \n}\n\n// Test case\nconsole.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6\n",
            "solutionCode": "function trap(height) {\n    let left = 0, right = height.length - 1;\n    let leftMax = 0, rightMax = 0;\n    let water = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);\n            left++;\n        } else {\n            height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);\n            right--;\n        }\n    }\n    return water;\n}\n\nconsole.log('Solution:', trap([0,1,0,2,1,0,1,3,2,1,2,1]));\n",
            "completed": false
        },
        
        // Python Problems
        {
            "id": "py_1",
            "language": "Python",
            "title": "Valid Anagram",
            "desc": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
            "badge": "Easy",
            "startCode": "def isAnagram(s: str, t: str) -> bool:\n    # Write your code here\n    pass\n\n# print(isAnagram('anagram', 'nagaram')) # Expected: True\n",
            "solutionCode": "def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    count = {}\n    for char in s:\n        count[char] = count.get(char, 0) + 1\n    for char in t:\n        if char not in count or count[char] == 0:\n            return False\n        count[char] -= 1\n    return True\n",
            "completed": false
        },
        {
            "id": "py_2",
            "language": "Python",
            "title": "Longest Substring Without Repeating Characters",
            "desc": "Given a string s, find the length of the longest substring without repeating characters.",
            "badge": "Medium",
            "startCode": "def lengthOfLongestSubstring(s: str) -> int:\n    # Write your code here\n    pass\n",
            "solutionCode": "def lengthOfLongestSubstring(s: str) -> int:\n    char_set = set()\n    left = 0\n    max_len = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len\n",
            "completed": false
        },
        {
            "id": "py_3",
            "language": "Python",
            "title": "Merge k Sorted Lists",
            "desc": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
            "badge": "Hard",
            "startCode": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef mergeKLists(lists) -> ListNode:\n    # Write your code here\n    pass\n",
            "solutionCode": "import heapq\n\ndef mergeKLists(lists):\n    heap = []\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))\n    \n    dummy = ListNode()\n    curr = dummy\n    \n    while heap:\n        val, i, node = heapq.heappop(heap)\n        curr.next = node\n        curr = curr.next\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n            \n    return dummy.next\n",
            "completed": false
        },

        // Java Problems
        {
            "id": "java_1",
            "language": "Java",
            "title": "Contains Duplicate",
            "desc": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
            "badge": "Easy",
            "startCode": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your code here\n        return false;\n    }\n}\n",
            "solutionCode": "import java.util.HashSet;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        HashSet<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            if (seen.contains(num))\n                return true;\n            seen.add(num);\n        }\n        return false;\n    }\n}\n",
            "completed": false
        },
        {
            "id": "java_2",
            "language": "Java",
            "title": "Coin Change",
            "desc": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
            "badge": "Medium",
            "startCode": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write your code here\n        return -1;\n    }\n}\n",
            "solutionCode": "import java.util.Arrays;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i - coin >= 0) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}\n",
            "completed": false
        },
        {
            "id": "java_3",
            "language": "Java",
            "title": "Minimum Window Substring",
            "desc": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
            "badge": "Hard",
            "startCode": "class Solution {\n    public String minWindow(String s, String t) {\n        // Write your code here\n        return \"\";\n    }\n}\n",
            "solutionCode": "class Solution {\n    public String minWindow(String s, String t) {\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int count = t.length(), begin = 0, end = 0, d = Integer.MAX_VALUE, head = 0;\n        while (end < s.length()) {\n            if (map[s.charAt(end++)]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s.charAt(begin++)]++ == 0) count++;\n            }\n        }\n        return d == Integer.MAX_VALUE ? \"\" : s.substring(head, head + d);\n    }\n}\n",
            "completed": false
        },

        // C++ Problems
        {
            "id": "cpp_1",
            "language": "C++",
            "title": "Reverse Linked List",
            "desc": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
            "badge": "Easy",
            "startCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your code here\n        return nullptr;\n    }\n};\n",
            "solutionCode": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr != nullptr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n};\n",
            "completed": false
        },
        {
            "id": "cpp_2",
            "language": "C++",
            "title": "Number of Islands",
            "desc": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
            "badge": "Medium",
            "startCode": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write your code here\n        return 0;\n    }\n};\n",
            "solutionCode": "class Solution {\npublic:\n    void dfs(vector<vector<char>>& grid, int i, int j) {\n        if (i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() || grid[i][j] == '0')\n            return;\n        grid[i][j] = '0';\n        dfs(grid, i + 1, j);\n        dfs(grid, i - 1, j);\n        dfs(grid, i, j + 1);\n        dfs(grid, i, j - 1);\n    }\n    \n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') {\n                    count++;\n                    dfs(grid, i, j);\n                }\n            }\n        }\n        return count;\n    }\n};\n",
            "completed": false
        },
        {
            "id": "cpp_3",
            "language": "C++",
            "title": "Median of Two Sorted Arrays",
            "desc": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
            "badge": "Hard",
            "startCode": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your code here\n        return 0.0;\n    }\n};\n",
            "solutionCode": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        if (nums1.size() > nums2.size()) {\n            return findMedianSortedArrays(nums2, nums1);\n        }\n        int x = nums1.size();\n        int y = nums2.size();\n        int low = 0, high = x;\n        while (low <= high) {\n            int partitionX = (low + high) / 2;\n            int partitionY = (x + y + 1) / 2 - partitionX;\n            \n            int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];\n            int minX = (partitionX == x) ? INT_MAX : nums1[partitionX];\n            \n            int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];\n            int minY = (partitionY == y) ? INT_MAX : nums2[partitionY];\n            \n            if (maxX <= minY && maxY <= minX) {\n                if ((x + y) % 2 == 0) {\n                    return ((double)max(maxX, maxY) + min(minX, minY)) / 2;\n                } else {\n                    return (double)max(maxX, maxY);\n                }\n            } else if (maxX > minY) {\n                high = partitionX - 1;\n            } else {\n                low = partitionX + 1;\n            }\n        }\n        return 0.0;\n    }\n};\n",
            "completed": false
        }
    ],

    render: (container) => {
        ClubModule.loadProgress();

        container.innerHTML = `
            <div class="club-container fade-in">
                <header class="section-header" style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;"><i class="fas fa-fire"></i></div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #fff;">LeetCode Club Session</h2>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Collaborative problem solving & tracking.</p>
                    
                    <!-- Overall Progress -->
                    <div class="club-stats" style="max-width: 500px; margin: 0 auto; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
                            <span>Session Progress</span>
                            <span id="club-progress-text">0%</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                            <div id="club-progress-bar" style="width: 0%; height: 100%; background: var(--gradient-primary); transition: 0.5s;"></div>
                        </div>
                    </div>
                </header>

                <div id="club-view-content">
                    ${ClubModule.getTimelineHTML()}
                </div>
            </div>
        `;

        ClubModule.attachEventListeners();
        ClubModule.updateStats();
    },

    getTimelineHTML: () => {
        const langs = [...new Set(ClubModule.problems.map(p => p.language))];
        let tabsHtml = '<div class="language-tabs">';
        langs.forEach(lang => {
            tabsHtml += '<button class="btn-sm ' + (ClubModule.selectedLanguage === lang ? 'btn-primary' : 'btn-glass') + '" onclick="window.ClubModule.setLanguage(\'' + lang + '\')">' + lang + '</button>';
        });
        tabsHtml += '</div>';

        const filtered = ClubModule.problems.filter(p => p.language === ClubModule.selectedLanguage);
        
        let html = '<div class="timeline">';
        filtered.forEach(problem => {
            html += `
                <div class="timeline-item">
                    <div class="timeline-card ${problem.completed ? 'completed-card' : ''}" style="transition: 0.3s; border: 1px solid ${problem.completed ? 'var(--primary)' : 'transparent'};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span class="time-badge">${problem.badge}</span>
                            
                            <label class="completion-toggle" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                <input type="checkbox" ${problem.completed ? 'checked' : ''} 
                                    onchange="ClubModule.toggleCompletion('${problem.id}', this)"
                                    style="width: 18px; height: 18px; accent-color: var(--primary);">
                                <span style="font-size: 0.85rem; color: var(--text-muted);">Mark Done</span>
                            </label>
                        </div>
                        
                        <h3 style="font-size: 1.5rem; color: #fff; margin: 0.5rem 0;">
                            ${problem.title}
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 1rem;">${problem.desc}</p>
                        
                        <div style="display: flex; gap: 1rem;">
                            <button class="btn-primary practice-btn" data-id="${problem.id}">
                                ${problem.completed ? 'Review Solution <i class="fas fa-undo"></i>' : 'Practice Now <i class="fas fa-bolt"></i>'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        return tabsHtml + html;
    },

    renderPlaygroundHTML: (title, code) => `
        <div class="playground-grid">
            <div class="editor-section">
                <div class="panel-header">
                    <span><i class="fas fa-code"></i> Code Editor (JavaScript) - ${title}</span>
                    <button class="btn-sm" id="back-btn">Exit</button>
                </div>
                <textarea id="code-editor" spellcheck="false">${code}</textarea>
                <div class="editor-actions">
                    <button class="btn-primary" id="run-code-btn">▶ Run Code</button>
                    <button class="btn-glass" id="ai-hint-btn">🤖 Ask AI Mentor</button>
                </div>
            </div>

            <div class="output-section">
                <div class="panel-header">
                    <span><i class="fas fa-terminal"></i> Console Output</span>
                    <button class="btn-sm glass" id="clear-console">Clear</button>
                </div>
                <div id="console-output" class="console-box">
                    <div class="log-line system">> Ready to execute...</div>
                </div>
                
                <div id="ai-panel" class="ai-panel" style="display: none;">
                    <div class="ai-header">
                        <span>🤖 Gemini Mentor</span>
                        <span class="close-ai" style="cursor: pointer;">×</span>
                    </div>
                    <div id="ai-response" class="ai-content">Thinking...</div>
                </div>
            </div>
        </div>
    `,

    toggleCompletion: (id, checkbox) => {
        const problem = ClubModule.problems.find(p => p.id === id);
        if (problem) {
            problem.completed = checkbox.checked;
            ClubModule.saveProgress();
            ClubModule.updateStats();

            // Visual update for card border
            const card = checkbox.closest('.timeline-card');
            if (problem.completed) {
                card.style.borderColor = 'var(--primary)';
                card.classList.add('completed-card');
                card.querySelector('.practice-btn').innerHTML = 'Review Solution <i class="fas fa-undo"></i>';
            } else {
                card.style.borderColor = 'transparent';
                card.classList.remove('completed-card');
                card.querySelector('.practice-btn').innerHTML = 'Practice Now <i class="fas fa-bolt"></i>';
            }
        }
    },

    updateStats: () => {
        const total = ClubModule.problems.length;
        const done = ClubModule.problems.filter(p => p.completed).length;
        const percent = total === 0 ? 0 : Math.round((done / total) * 100);

        const text = document.getElementById('club-progress-text');
        const bar = document.getElementById('club-progress-bar');

        if (text && bar) {
            text.innerText = `${percent}%`;
            bar.style.width = `${percent}%`;
        }
    },

    saveProgress: () => {
        const doneIds = ClubModule.problems.filter(p => p.completed).map(p => p.id);
        localStorage.setItem('club_progress', JSON.stringify(doneIds));
    },

    loadProgress: () => {
        const saved = localStorage.getItem('club_progress');
        if (saved) {
            const doneIds = JSON.parse(saved);
            ClubModule.problems.forEach(p => {
                p.completed = doneIds.includes(p.id);
            });
        }
    },

    setLanguage: (lang) => {
        ClubModule.selectedLanguage = lang;
        document.getElementById('club-view-content').innerHTML = ClubModule.getTimelineHTML();
        ClubModule.attachEventListeners();
    },

    attachEventListeners: () => {
        // Practice Buttons
        document.querySelectorAll('.practice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const problemId = e.target.getAttribute('data-id');
                const problem = ClubModule.problems.find(p => p.id === problemId);

                if (problem) {
                    const content = document.getElementById('club-view-content');
                    // Logic to show solution if completed
                    const codeToShow = problem.completed ? problem.solutionCode : problem.startCode;
                    const titleSuffix = problem.completed ? '(Solution Review)' : '';

                    content.innerHTML = ClubModule.renderPlaygroundHTML(`${problem.title} ${titleSuffix}`, codeToShow);
                    ClubModule.attachPlaygroundListeners();
                }
            });
        });
    },

    attachPlaygroundListeners: () => {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Re-render main view
                const container = document.querySelector('.club-container');
                // We re-call render essentially, but just simpler to swap content usually.
                // However, render() does full setup. Let's just fix innerHTML of content.
                document.getElementById('club-view-content').innerHTML = ClubModule.getTimelineHTML();
                ClubModule.attachEventListeners();
            });
        }

        document.getElementById('run-code-btn').addEventListener('click', ClubModule.runCode);
        document.getElementById('clear-console').addEventListener('click', () => {
            document.getElementById('console-output').innerHTML = '<div class="log-line system">> Console cleared</div>';
        });

        document.getElementById('ai-hint-btn').addEventListener('click', ClubModule.askAI);

        document.querySelector('.close-ai')?.addEventListener('click', () => {
            document.getElementById('ai-panel').style.display = 'none';
        });

        // Tab support
        const textarea = document.getElementById('code-editor');
        textarea.addEventListener('keydown', function (e) {
            if (e.key == 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    },

    runCode: () => {
        const code = document.getElementById('code-editor').value;
        const consoleBox = document.getElementById('console-output');

        // Hijack console.log
        const originalLog = console.log;
        const originalError = console.error;

        const logs = [];
        console.log = (...args) => {
            logs.push({ type: 'log', content: args.join(' ') });
        };
        console.error = (...args) => {
            logs.push({ type: 'error', content: args.join(' ') });
        };

        try {
            consoleBox.innerHTML += `<div class="log-line system">> Running script...</div>`;

            // Execute
            const func = new Function(code);
            func();

            // Display Logs
            if (logs.length === 0) {
                consoleBox.innerHTML += `<div class="log-line system" style="opacity: 0.7;">(No output)</div>`;
            } else {
                logs.forEach(log => {
                    const color = log.type === 'error' ? '#ef4444' : '#4ade80';
                    consoleBox.innerHTML += `<div class="log-line" style="color: ${color};">> ${log.content}</div>`;
                });
            }

        } catch (err) {
            consoleBox.innerHTML += `<div class="log-line error" style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Error: ${err.message}</div>`;
        } finally {
            // Restore console
            console.log = originalLog;
            console.error = originalError;
            consoleBox.scrollTop = consoleBox.scrollHeight;
        }
    },

    askAI: async () => {
        const code = document.getElementById('code-editor').value;
        const aiPanel = document.getElementById('ai-panel');
        const aiResponse = document.getElementById('ai-response');

        aiPanel.style.display = 'flex';
        aiResponse.innerText = "Analyzing your code...";

        if (!ClubModule.apiKey) {
            aiResponse.innerHTML = `<span style='color: #ef4444;'>No API Key found. Please add it in the Quiz module or .env file.</span>`;
            return;
        }

        try {
            const genAI = new GoogleGenerativeAI(ClubModule.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `You are a helpful coding mentor. 
            Analyze this JavaScript code and provide a brief, helpful hint or explanation. 
            Do NOT give the full solution if it looks like a problem.
            Focus on best practices or potential bugs.
            Keep it under 3 sentences.
            
            Code:
            ${code}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            aiResponse.innerText = text;
        } catch (error) {
            console.error(error);
            aiResponse.innerHTML = `<span style="color: #ef4444;">Error: ${error.message || "Connection failed"}.<br>Check console for details.</span>`;
        }
    }
};

window.ClubModule = ClubModule;
