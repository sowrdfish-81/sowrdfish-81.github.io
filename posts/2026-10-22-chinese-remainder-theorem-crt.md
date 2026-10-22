## এমন একটি সংখ্যা x বের করা, যেটি একাধিক modulus দিয়ে ভাগ করলে নির্দিষ্ট remainder দেয়।
  x%something = something
  x%anothersomething = another something

ans -> the value of x
```cpp

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using i128 = __int128_t;

// Normalize a number into [0, mod-1]
ll normMod(i128 x, ll mod) {
    x %= mod;
    if (x < 0) x += mod;
    return (ll)x;
}

// Extended GCD: ax + by = gcd(a, b)
i128 extendedGCD(i128 a, i128 b, i128& x, i128& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }

    i128 x1, y1;
    i128 g = extendedGCD(b, a % b, x1, y1);

    x = y1;
    y = x1 - (a / b) * y1;

    return g;
}

// Generalized CRT
// Returns false if no solution exists or the LCM
// exceeds the signed long long range.
// On success: x is the smallest non-negative solution,
// mod is the combined modulus (LCM).
bool chineseRemainder(
    const vector<ll>& rem,
    const vector<ll>& mods,
    ll& x,
    ll& mod
) {
    if (rem.size() != mods.size())
        return false;

    x = 0;
    mod = 1;

    for (int i = 0; i < (int)rem.size(); i++) {
        ll m = mods[i];

        if (m <= 0)
            return false;

        ll r = normMod(rem[i], m);
        ll g = gcd(mod, m);

        i128 diff = (i128)r - x;

        // No solution if the difference is not divisible by gcd
        if (diff % g != 0)
            return false;

        ll m2 = m / g;
        ll k = 0;

        if (m2 > 1) {
            i128 inv, y;
            extendedGCD(mod / g, m2, inv, y);

            k = normMod((diff / g) * inv, m2);
        }

        i128 newMod = (i128)mod * m2;

        if (newMod > LLONG_MAX)
            return false;

        x = normMod((i128)x + (i128)mod * k,
                    (ll)newMod);

        mod = (ll)newMod;
    }

    return true;
}

/*
// Input and function call demo

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<ll> rem(n), mods(n);

    for (int i = 0; i < n; i++) {
        cin >> rem[i] >> mods[i];
    }

    ll x, combinedMod;

    if (chineseRemainder(rem, mods, x, combinedMod)) {
        cout << "x = " << x << '\n';
        cout << "Combined modulus = "
             << combinedMod << '\n';
    } else {
        cout << "No solution or LCM overflow\n";
    }

    return 0;
}

// Input:
// 2
// 2 3
// 3 5

// Output:
// x = 8
// Combined modulus = 15
*/

```cpp