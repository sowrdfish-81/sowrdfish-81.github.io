## Small range all primes printing 

```cpp

vector<int> sieve(int n) {
    if (n < 2) return {};

    vector<char> isPrime(n + 1, true);
    vector<int> primes;

    isPrime[0] = isPrime[1] = false;

    for (int i = 4; i <= n; i += 2)
        isPrime[i] = false;

    for (int i = 3; i <= n / i; i += 2) {
        if (isPrime[i]) {
            for (long long j = 1LL * i * i;
                 j <= n; j += 2LL * i) {
                isPrime[j] = false;
            }
        }
    }

    primes.push_back(2);

    for (int i = 3; i <= n; i += 2) {
        if (isPrime[i])
            primes.push_back(i);
    }

    return primes;
}

/*
// Input and function call demo

int main() {
    int n;
    cin >> n;

    vector<int> primes = sieve(n);

    for (int p : primes)
        cout << p << " ";

    cout << '\n';
    return 0;
}

// Input: 20
// Output: 2 3 5 7 11 13 17 19
*/

```cpp