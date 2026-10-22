## Note

একটি সংখ্যাকে তার prime factors-এ ভাঙা। অনেকগুলো সংখ্যার factorization করতে হলে Linear Sieve + SPF (Smallest Prime Factor) ব্যবহার করতে পারো।


```cpp
using ll = long long;

// Build Smallest Prime Factor in O(n)
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

// Prime factorization with frequency
vector<pair<int, int>> primeFactorize(
    int x, const vector<int>& spf
) {
    vector<pair<int, int>> factors;

    while (x > 1) {
        int p = spf[x];
        int cnt = 0;

        while (x % p == 0) {
            x /= p;
            cnt++;
        }

        factors.push_back({p, cnt});
    }

    return factors;
}

/*
// Input and function call demo

int main() {
    int maxN, q;
    cin >> maxN >> q;

    vector<int> spf = buildSPF(maxN);

    while (q--) {
        int x;
        cin >> x;

        auto factors = primeFactorize(x, spf);

        for (auto [p, cnt] : factors)
            cout << p << "^" << cnt << " ";

        cout << '\n';
    }

    return 0;
}

// Input:
// 100 3
// 60
// 84
// 97

// Output:
// 2^2 3^1 5^1
// 2^2 3^1 7^1
// 97^1
*/


```cpp