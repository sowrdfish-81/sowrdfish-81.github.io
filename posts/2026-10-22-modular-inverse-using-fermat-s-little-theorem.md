## (a^{-1}mod p) বের করা, যেখানে p একটি prime number এবং a হলো p দিয়ে বিভাজ্য নয়।

```cpp
using ll = long long;
using i128 = __int128_t;

// Binary Exponentiation
ll modPow(ll a, ll b, ll mod) {
    if (mod <= 0 || b < 0) return -1;
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

// Modular Inverse when mod is prime
ll modInverse(ll a, ll p) {
    if (p <= 1) return -1;

    a %= p;
    if (a < 0) a += p;

    if (a == 0) return -1;

    return modPow(a, p - 2, p);
}

/*
// Input and function call demo

int main() {
    ll a, p;
    cin >> a >> p;

    cout << modInverse(a, p) << '\n';

    return 0;
}

// Input:
// 3 7

// Output:
// 5

// Verification:
// (3 * 5) % 7 = 1
*/

```cpp