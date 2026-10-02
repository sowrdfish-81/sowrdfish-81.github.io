Today I tried DFS to find out the connected components 

##Main Idea

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



void dfs(int x,int y,vector<vector<int>>&arr){
    int s1=arr.size();
    int s2=arr[0].size();
    if(x<0||y<0)return;
    if(x>=s1||y>=s2)return;
    if(arr[x][y]!=1)return;
    arr[x][y]=0;
    dfs(x+1,y,arr);
    dfs(x-1,y,arr);
    dfs(x,y+1,arr);
    dfs(x,y-1,arr);

}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

      int a,b;cin>>a>>b;
     vector<vector<int>> arr(a, vector<int>(b));

      for(int i=0;i<a;i++){
        for(int j=0;j<b;j++){
            char x;cin>>x;
            if(x=='#')arr[i][j]=0;
            else arr[i][j]=1;
        }
      }
      int count=0;
for(int i=0;i<a;i++){
        for(int j=0;j<b;j++){
            if(arr[i][j]==1){
                dfs(i,j,arr);
                count++;
            }
            else continue;
        }
      }
      cout<<count;
      

    return 0;
}

```cpp