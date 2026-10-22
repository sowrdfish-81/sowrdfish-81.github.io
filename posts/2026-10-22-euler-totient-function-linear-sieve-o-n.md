## 1 থেকে n পর্যন্ত প্রতিটি সংখ্যার Euler Totient Function, phi(n), বের করা। phi(n) হলো 1 থেকে n পর্যন্ত কতটি সংখ্যা n-এর সঙ্গে coprime।

```cpp
#include <bits/stdc++.h>
using namespace std;

// Linear Sieve for Euler Totient Function
vector<int> totientSieve(int n) {
    vector<int> phi(n + 1, 0);
    vector<int> primes;
    vector<bool> composite(n + 1, false);

    if (n >= 1) phi[1] = 1;

    for (int i = 2; i <= n; i++) {
        if (!composite[i]) {
            primes.push_back(i);
            phi[i] = i - 1;
        }

        for (int p : primes) {
            if (1LL * i * p > n) break;

            int x = i * p;
            composite[x] = true;

            if (i % p == 0) {
                phi[x] = phi[i] * p;
                break;
            }

            phi[x] = phi[i] * (p - 1);
        }
    }

    return phi;
}

/*
// Input and function call demo

int main() {
    int n;
    cin >> n;

    vector<int> phi = totientSieve(n);

    for (int i = 1; i <= n; i++) {
        cout << "phi(" << i << ") = "
             << phi[i] << '\n';
    }

    return 0;
}

// Input:
// 10

// Output:
// phi(1) = 1
// phi(2) = 1
// phi(3) = 2
// phi(4) = 2
// phi(5) = 4
// phi(6) = 2
// phi(7) = 6
// phi(8) = 4
// phi(9) = 6
// phi(10) = 4
*/

```cpp