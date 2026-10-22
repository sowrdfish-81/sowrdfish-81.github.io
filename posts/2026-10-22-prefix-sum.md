#Note

Indexing 1 based


```cpp
using ll = long long;

// Build Prefix Sum
vector<ll> prefixSum(vector<ll>& a, int n) {
    vector<ll> pref(n + 1, 0);

    for (int i = 1; i <= n; i++) {
        pref[i] = pref[i - 1] + a[i];
    }

    return pref;
}

// Range Sum Query [l, r]
ll rangeSum(vector<ll>& pref, int l, int r) {
    return pref[r] - pref[l - 1];
}

/*
// Input and function call demo

int main() {
    int n;
    cin >> n;

    vector<ll> a(n + 1);

    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }

    vector<ll> pref = prefixSum(a, n);

    int l, r;
    cin >> l >> r;

    cout << rangeSum(pref, l, r) << '\n';

    return 0;
}
*/

```cpp