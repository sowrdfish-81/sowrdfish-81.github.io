Ajke **Prefix Sum** ar tar bhai **Difference Array**.

## Prefix Sum

Range sum query O(1) e: `pre[i] = a[0] + ... + a[i-1]`, then
`sum(l..r) = pre[r+1] - pre[l]`.

```cpp
pre[0] = 0;
for (int i = 0; i < n; i++) pre[i+1] = pre[i] + a[i];
// sum of a[l..r] :
int s = pre[r+1] - pre[l];
```

## Difference Array

Range update O(1) e: l..r e +v add korte `d[l] += v; d[r+1] -= v;`
then shesh e prefix sum run korlei final array.

## Obhabo

1-indexed vs 0-indexed e gelei khali off-by-one. Ajke 2 bar WA khaisi,
then paper e draw kore bujhlam.
