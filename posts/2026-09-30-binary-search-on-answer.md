Ajker concept: **Binary Search on Answer**. Bujhlam je binary search shudhu
sorted array te na — jodi answer ta monotonic hoy (je answer valid kina check
kora jay), tahole answer er upor ei binary search chalano jay.

## Komon bujhbo

"Minimum X jate condition satisfy hoy" type problem hole:

- low = smallest possible answer, high = largest possible answer
- mid = (low + high) / 2
- check(mid) valid hole answer hoite pare, chhoto try koro → high = mid - 1
- na hole low = mid + 1

```cpp
int lo = 0, hi = 1e9;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (ok(mid)) hi = mid;
    else lo = mid + 1;
}
// lo == answer
```

## Note

- `lo + (hi - lo) / 2` use kori — overflow avoid korte
- Kono din `(lo+hi)/2` loop e infinite hoy na sheta check korte hobe
- KorfCola er "Koko Eating Bananas" type problem e apply korlam, AC!
