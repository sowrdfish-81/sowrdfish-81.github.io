## 1 থেকে n পর্যন্ত প্রতিটি সংখ্যার মোট divisor count এবং divisor sum একসঙ্গে বের করা।
এখানে SPF লাগবে না। প্রতিটি divisor তার সব multiple-এ contribution দেবে।

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

struct DivisorData {
    vector<int> count;
    vector<ll> sum;
};

// Precompute divisor count and sum for every number [1, n]
DivisorData divisorContribution(int n) {
    vector<int> cnt(n + 1, 0);
    vector<ll> sum(n + 1, 0);

    for (int d = 1; d <= n; d++) {
        for (int multiple = d; multiple <= n;
             multiple += d) {
            cnt[multiple]++;
            sum[multiple] += d;
        }
    }

    return {move(cnt), move(sum)};
}

/*
// Input and function call demo

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    DivisorData result = divisorContribution(n);

    for (int i = 1; i <= n; i++) {
        cout << i << ": "
             << result.count[i] << " "
             << result.sum[i] << '\n';
    }

    return 0;
}

// Input:
// 5

// Output:
// 1: 1 1
// 2: 2 3
// 3: 2 4
// 4: 3 7
// 5: 2 6
*/

```cpp