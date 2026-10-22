```cpp
using ll = long long;
const ll MOD = 1'000'000'007LL;

// Returns {F(n), F(n+1)} modulo MOD
pair<ll, ll> fib(ll n) {
    if (n == 0)
        return {0, 1};

    auto [a, b] = fib(n / 2);

    ll c = a * ((2 * b % MOD - a + MOD) % MOD) % MOD;
    ll d = (a * a % MOD + b * b % MOD) % MOD;

    if (n & 1)
        return {d, (c + d) % MOD};

    return {c, d};
}

/*
// Input and function call demo

int main() {
    ll n;
    cin >> n;

    cout << fib(n).first << '\n';

    return 0;
}

// Input: 10
// Output: 55
*/

```cpp