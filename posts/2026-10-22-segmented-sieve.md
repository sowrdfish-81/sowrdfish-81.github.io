## Note

অনেক বড় সংখ্যা \(L\) থেকে \(R\) পর্যন্ত শুধু ওই range-এর prime number বের করা। এটি ব্যবহার করবে যখন পুরো \(R\) পর্যন্ত Basic Sieve চালানো সম্ভব বা প্রয়োজনীয় নয়।

```cpp

using ll = long long;

// Segmented Sieve: find primes in [L, R]
vector<ll> segmentedSieve(ll L, ll R) {
    if (L > R || R < 2) return {};

    L = max(L, 2LL);

    ll limit = sqrtl((long double)R);

    // Correct possible floating-point rounding
    while (limit + 1 <= R / (limit + 1))
        ++limit;

    while (limit > R / limit)
        --limit;

    // Find primes up to sqrt(R)
    vector<char> basePrime(limit + 1, true);
    basePrime[0] = false;

    if (limit >= 1)
        basePrime[1] = false;

    for (ll i = 2; i <= limit / i; ++i) {
        if (basePrime[i]) {
            for (ll j = i * i; j <= limit; j += i)
                basePrime[j] = false;
        }
    }

    vector<ll> primes;

    for (ll i = 2; i <= limit; ++i) {
        if (basePrime[i])
            primes.push_back(i);
    }

    // Mark composites only inside [L, R]
    vector<char> isPrime(R - L + 1, true);

    for (ll p : primes) {
        ll start = max(p * p, L + (p - L % p) % p);

        if (start > R) continue;

        for (ll j = start; j <= R; ) {
            isPrime[j - L] = false;

            if (R - j < p) break;
            j += p;
        }
    }

    vector<ll> result;

    for (ll i = L; i <= R; ++i) {
        if (isPrime[i - L])
            result.push_back(i);
    }

    return result;
}

/*
// Input and function call demo

int main() {
    ll L, R;
    cin >> L >> R;

    vector<ll> primes = segmentedSieve(L, R);

    for (ll p : primes)
        cout << p << " ";

    cout << '\n';
    return 0;
}

// Input:
// 100 130

// Output:
// 101 103 107 109 113 127
*/

```cpp