## (a^b mod m) দ্রুত বের করা। ICPC-তে বড় power-এর remainder বের করার জন্য এটি খুব গুরুত্বপূর্ণ।

```cpp

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using i128 = __int128_t;

// Optimized Modular Binary Exponentiation
ll modPow(ll a, ll b, ll mod) {
    if (mod <= 0 || b < 0)
        return -1; // Invalid input

    if (mod == 1) return 0;

    a %= mod;
    if (a < 0) a += mod;

    ll res = 1;

    while (b > 0) {
        if (b & 1LL)
            res = (i128)res * a % mod;

        a = (i128)a * a % mod;
        b >>= 1;
    }

    return res;
}

/*
// Input and function call demo

int main() {
    ll a, b, mod;
    cin >> a >> b >> mod;

    cout << modPow(a, b, mod) << '\n';

    return 0;
}

// Input:
// 2 10 1000

// Output:
// 24
//
// Because 2^10 = 1024
// 1024 % 1000 = 24
*/

```cpp