Ajke Two Pointers shikhlam. Main idea: ekta sorted array te duita pointer
rekhe, ekta shuru theke arekta shesh theke chalai.

## Kothay kaj kore

- Sorted array te pair khuja (sum == target)
- Palindrome check
- Duita sorted array merge

## Core pattern

```cpp
int l = 0, r = n - 1;
while (l < r) {
    int sum = a[l] + a[r];
    if (sum == target) { /* found */ break; }
    else if (sum < target) l++;
    else r--;
}
```

## Obhabo (mistake korlam)

Prothome ami `while (l <= r)` likhechilam — then bujhlam pair e kokhono
`l == r` hobe na, tai `l < r` thik. Time complexity **O(n)**, brute force
er cheye O(n^2) theke onek better.
