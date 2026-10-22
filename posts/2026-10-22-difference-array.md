## Note
একটি array-এর নির্দিষ্ট range-এর প্রতিটি element-এর সঙ্গে x যোগ করতে হবে—এমন অনেকগুলো update দ্রুত করার জন্য।
```cpp

using ll = long long;

// Add val to every element in range [l, r]
void rangeUpdate(vector<ll>& diff, int l, int r, ll val) {
    diff[l] += val;
    diff[r + 1] -= val;
}

// Build final array after all range updates
vector<ll> buildArray(vector<ll>& diff, int n) {
    vector<ll> a(n + 1, 0);
    ll sum = 0;

    for (int i = 1; i <= n; i++) {
        sum += diff[i];
        a[i] = sum;
    }

    return a;
}

/*
// Input and function call demo

int main() {
    int n, q;
    cin >> n >> q;

    vector<ll> diff(n + 2, 0);

    while (q--) {
        int l, r;
        ll x;
        cin >> l >> r >> x;

        rangeUpdate(diff, l, r, x);
    }

    vector<ll> a = buildArray(diff, n);

    for (int i = 1; i <= n; i++) {
        cout << a[i] << " ";
    }

    cout << '\n';
    return 0;
}
*/

```cpp