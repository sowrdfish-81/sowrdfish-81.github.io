## Note
GCD বের করার পাশাপাশি এমন দুটি সংখ্যা x এবং y বের করে, যেন
ax+by=gcd(a,b)
Modular inverse, linear Diophantine equation এবং (ax+by=c) ধরনের problem সমাধানে।

```cpp
using ll = long long;

// Extended Euclidean Algorithm
ll extendedGCD(ll a, ll b, ll &x, ll &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }

    ll x1, y1;
    ll g = extendedGCD(b, a % b, x1, y1);

    x = y1;
    y = x1 - (a / b) * y1;

    return g;
}

/*
// Input and function call demo

int main() {
    ll a, b, x, y;
    cin >> a >> b;

    ll g = extendedGCD(a, b, x, y);

    cout << "GCD = " << g << '\n';
    cout << "x = " << x << ", y = " << y << '\n';

    return 0;
}

// Input:
// 30 18

// Output:
// GCD = 6
// x = -1, y = 2

// Verification:
// 30*(-1) + 18*2 = 6
*/
```cpp

## Extra
Modular Inverse
```cpp
using ll = long long;

// Modular Inverse using Extended GCD
ll modInverse(ll a, ll mod) {
    ll x, y;
    ll g = extendedGCD(a, mod, x, y);

    if (g != 1) return -1; // Inverse doesn't exist

    return (x % mod + mod) % mod;
}

/*
// Input and function call demo

int main() {
    ll a = 3, mod = 7;

    cout << modInverse(a, mod) << '\n';

    return 0;
}

// Output: 5
*/

```cpp