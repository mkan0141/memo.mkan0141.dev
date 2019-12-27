+++
author = "mkan0141"
categories = ["AOJ", "競プロ"]
date = "2019-05-21"
description = ""
images = [""]
linktitle = "AOJ 1619 弁当作り (Making Lunch Boxes)"
title = "AOJ 1619 弁当作り (Making Lunch Boxes)"
type = "post"

+++

## 問題

[Making Lunch Boxes](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1619&lang=jp)

## 解法
制約に N * M <= 500と書いていて，NとMはどちらかが必ず22以下になるが分かる．
これに気がつけば，N <= 22の時はレシピを使うか使わないかの全探索， M <= 22の時は材料を使うか使わないかのbitDPをすれば良い．

## ソースコード

```cpp
typedef long long ll;

bool b[505][505];
ll lists[505];

/* ---- bitDP part ----*/
void init_bitDP(int n,int m){
  /* create bit list */
  for(int i=0;i<n;i++){
    lists[i]=0;
    for(int j=0;j<m;j++){
      if(b[i][j])lists[i]|=(1<<j);
    }
  }
}

int bitDP(int n,int m){
  vector<vector<int> >dp(n+1,vector<int>((1<<m),-1));
  for(int i=0;i<n;i++){
    for(int j=0;j<(1<<m);j++){
      dp[i][j]=-INF;
    }
  }
  
  dp[0][0]=0;
  for(int i=1;i<=n;i++){
    for(int j=0;j<(1<<m);j++){
      dp[i][j]=max(dp[i-1][j],dp[i-1][j^lists[i-1]]+1);
    }
  }
  return dp[n][0];
}


/* ---- dfs part ---- */
void init_dfs(bool used[]){
  for(int i=0;i<505;i++){
    used[i]=false;
  }
}

int dfs_calc(int n,int m,bool used[]){
  int ret=0;
  for(int i=0;i<n;i++)ret+=used[i];
  for(int i=0;i<m;i++){
    int sum=0;
    for(int j=0;j<n;j++){
      if(used[j])sum+=b[j][i];
    }
    if(sum%2)return -1;
  }
  return ret;
}

int dfs(int n,int m,int cnt,bool used[]){
  int ret=0;
  if(n==cnt){
    return dfs_calc(n,m,used);
  }
  
  used[cnt]=true;
  ret=max(ret,dfs(n,m,cnt+1,used));
  used[cnt]=false;
  ret=max(ret,dfs(n,m,cnt+1,used));  
  
  return ret;
}


/* ---- main ---- */
void solve(int n,int m){
  char c;
  for(int i=0;i<n;i++){
    for(int j=0;j<m;j++){
      cin>>c;
      b[i][j]=c-'0';
    }
  }
  
  if(n<=m){
    bool used[505];
    init_dfs(used);
    cout<<dfs(n,m,0,used)<<endl;
  }else{
    init_bitDP(n,m);
    cout<<bitDP(n,m)<<endl;;
  }
}

int main(){
  int n,m;
  while(scanf("%d%d",&n,&m),n|m){
    solve(n,m);
  }
  return 0;
}

```

