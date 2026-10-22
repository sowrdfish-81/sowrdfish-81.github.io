## 1 থেকে N পর্যন্ত প্রতিটি সংখ্যার Möbius value mu(n) বের করা। ICPC-তে এটি মূলত Inclusion–Exclusion, coprime counting এবং number theory problem-এ কাজে লাগে।

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

// 1. Linear Sieve for Mobius Function
vector<int> mobiusSieve(int n) {
    vector<int> mu(n + 1, 0);
    vector<int> primes;
    vector<bool> composite(n + 1, false);

    if (n >= 1) mu[1] = 1;

    for (int i = 2; i <= n; i++) {
        if (!composite[i]) {
            primes.push_back(i);
            mu[i] = -1;
        }

        for (int p : primes) {
            if (1LL * i * p > n)
                break;

            int x = i * p;
            composite[x] = true;

            if (i % p == 0) {
                mu[x] = 0;
                break;
            }

            mu[x] = -mu[i];
        }
    }

    return mu;
}

// 2. Count ordered pairs (a, b) where gcd(a, b) = 1
ll countCoprimePairs(int n) {
    vector<int> mu = mobiusSieve(n);
    ll ans = 0;

    for (int d = 1; d <= n; d++) {
        ll k = n / d;
        ans += 1LL * mu[d] * k * k;
    }

    return ans;
}

/*
// Input and function call demo

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<int> mu = mobiusSieve(n);

    cout << "Mobius values: ";
    for (int i = 1; i <= n; i++)
        cout << mu[i] << " ";

    cout << "\nCoprime ordered pairs: "
         << countCoprimePairs(n) << '\n';

    return 0;
}

// Input:
// 3

// Output:
// Mobius values: 1 -1 -1
// Coprime ordered pairs: 7
*/

```cpp