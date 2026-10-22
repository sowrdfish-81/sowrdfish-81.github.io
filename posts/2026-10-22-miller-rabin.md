## Optimized prime checker
```cpp
using ull = unsigned long long;
using u128 = __uint128_t;

// Safe multiplication modulo m
ull mulMod(ull a, ull b, ull m) {
    return (u128)a * b % m;
}

// Binary modular exponentiation
ull powerMod(ull a, ull b, ull m) {
    ull res = 1;

    while (b > 0) {
        if (b & 1)
            res = mulMod(res, a, m);

        a = mulMod(a, a, m);
        b >>= 1;
    }

    return res;
}

// Deterministic Miller-Rabin for 64-bit integers
bool isPrime(ull n) {
    if (n < 2) return false;

    for (ull p : {2ULL, 3ULL, 5ULL, 7ULL, 11ULL,
                  13ULL, 17ULL, 19ULL, 23ULL, 29ULL,
                  31ULL, 37ULL}) {
        if (n % p == 0)
            return n == p;
    }

    ull d = n - 1, s = 0;

    while ((d & 1) == 0) {
        d >>= 1;
        s++;
    }

    for (ull a : {2ULL, 325ULL, 9375ULL, 28178ULL,
                  450775ULL, 9780504ULL, 1795265022ULL}) {
        if (a % n == 0) continue;

        ull x = powerMod(a % n, d, n);

        if (x == 1 || x == n - 1)
            continue;

        bool composite = true;

        for (ull r = 1; r < s; r++) {
            x = mulMod(x, x, n);

            if (x == n - 1) {
                composite = false;
                break;
            }
        }

        if (composite)
            return false;
    }

    return true;
}

/*
// Input and function call demo

int main() {
    ull n;
    cin >> n;

    cout << (isPrime(n) ? "Prime" : "Not Prime")
         << '\n';

    return 0;
}

// Input: 1000000007
// Output: Prime
*/
```cpp