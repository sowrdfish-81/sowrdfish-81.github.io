## 1 থেকে N পর্যন্ত কতগুলো সংখ্যা দেওয়া divisor-গুলোর অন্তত একটি দিয়ে বিভাজ্য, তা বের করা।

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

// Count numbers in [1, n] divisible by
// at least one divisor
ll inclusionExclusion(ll n, vector<ll> divisors) {
    if (n <= 0) return 0;

    // Keep only valid divisors
    vector<ll> a;

    for (ll d : divisors) {
        if (d <= 0) continue;
        if (d == 1) return n;
        if (d <= n) a.push_back(d);
    }

    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());

    // Remove redundant divisors
    vector<ll> v;

    for (ll d : a) {
        bool redundant = false;

        for (ll x : v) {
            if (d % x == 0) {
                redundant = true;
                break;
            }
        }

        if (!redundant)
            v.push_back(d);
    }

    ll ans = 0;
    int k = (int)v.size();

    // Enumerate non-empty subsets
    auto dfs = [&](auto&& self, int start,
                   ll currentLCM, ll sign) -> void {
        for (int i = start; i < k; i++) {
            ll d = v[i];
            ll g = gcd(currentLCM, d);
            ll reduced = currentLCM / g;

            // Avoid LCM overflow and useless branches
            if (reduced > n / d)
                continue;

            ll nextLCM = reduced * d;

            ans += sign * (n / nextLCM);

            self(self, i + 1, nextLCM, -sign);
        }
    };

    dfs(dfs, 0, 1, 1);

    return ans;
}

/*
// Input and function call demo

int main() {
    ll n;
    int k;
    cin >> n >> k;

    vector<ll> divisors(k);

    for (int i = 0; i < k; i++)
        cin >> divisors[i];

    cout << inclusionExclusion(n, divisors) << '\n';

    return 0;
}

// Input:
// 20 3
// 2 3 5

// Output:
// 14
*/

```cpp