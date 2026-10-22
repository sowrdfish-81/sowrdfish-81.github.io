## একটি সংখ্যাকে তার prime factors-এ ভাঙা। অনেকগুলো সংখ্যার factorization করতে হলে Linear Sieve + SPF (Smallest Prime Factor) ব্যবহার করতে পারো।

```cpp

#include <bits/stdc++.h>
using namespace std;

using ll = long long;

// Build Smallest Prime Factor (SPF)
vector<int> buildSPF(int n) {
    vector<int> spf(n + 1, 0);
    vector<int> primes;

    for (int i = 2; i <= n; i++) {
        if (spf[i] == 0) {
            spf[i] = i;
            primes.push_back(i);
        }

        for (int p : primes) {
            if (p > spf[i] || 1LL * i * p > n)
                break;

            spf[i * p] = p;
        }
    }

    return spf;
}

// Returns {number of divisors, sum of divisors}
pair<ll, ll> divisorCountSum(int x, const vector<int>& spf) {
    ll cnt = 1, sum = 1;

    while (x > 1) {
        int p = spf[x];
        int power = 0;
        ll powerSum = 1;

        while (x % p == 0) {
            x /= p;
            power++;
            powerSum = powerSum * p + 1;
        }

        cnt *= (power + 1);
        sum *= powerSum;
    }

    return {cnt, sum};
}

/*
// Input and function call demo

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;

    vector<int> spf = buildSPF(n);

    while (q--) {
        int x;
        cin >> x;

        auto [cnt, sum] = divisorCountSum(x, spf);

        cout << cnt << " " << sum << '\n';
    }

    return 0;
}

// Input:
// 100 3
// 12
// 28
// 36

// Output:
// 6 28
// 6 56
// 9 91
*/


```cpp