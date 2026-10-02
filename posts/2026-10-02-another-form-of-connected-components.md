Another form of connected Components

## Main Idea

I run dfs in every node of the graph and connected the nodes then counted the e distinct connected nodes.

## Code

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

#define pb push_back
#define endl '\n'

const ll INF = 1e18;
const ll MOD = 1e9 + 7;
const int N=1e5+10;

vector<int> g[N];
bool vis[N];

void dfs(int vertex)
{
    vis[vertex] = true;
    for (int child : g[vertex])
    {
        if (vis[child]) continue;
        dfs(child);
    }
}
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

      int n,e;cin>>n>>e;
      for(int i=1;i<=e;i++){
        int x,y;cin>>x>>y;
        g[x].push_back(y);
        g[y].push_back(x);
      }
      int count=0;
for(int i=1;i<=n;i++){
    if(!vis[i]){
        dfs(i);
        count++;
    }
    else continue;
}
cout<<count;

    return 0;
}
```cpp