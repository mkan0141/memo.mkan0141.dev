+++
author = "mkan0141"
categories = ["AtCoder", "競プロ"]
date = "2017-09-17"
description = ""
images = [""]
linktitle = "ABC073"
title = "ABC073"
type = "post"

+++

## A問題
整数が与えられ、その数字に「9」が含まれているか調べる問題。
# 解き方
私は、与えられる整数を文字列として扱い、その文字列に'9'が含まれているかで判断した。

```cpp
int main(){
  string s;
  cin>>s;
  if(s.find("9")!=-1)cout<<"Yes"<<endl;
  else cout<<"No"<<endl;
  return 0;
}
```
s.find()の返り値は、文字列が見つかればその文字列が何番目にあるかを返し、もし存在しなければ-1を返します。

## B問題
n組の団体が劇場に訪れ、それぞれの団体は座席番号l~r (l <= r) に座る。
その劇場に何人の人がいるかという問題。
# 解き方
複数の人が同じ座席に座るというハプニングは起こらないと仮定されてるので、それぞれの団体が座る人数は(r-l+1)。
あとはこれを計算する。

```cpp
int main(){
  int n;
  int l,r;
  int ans=0;

  cin>>n;
  for(i,n){
    cin>>l>>r;
    ans+=r-l+1;
  }
  cout<<ans<<endl;
  return 0;
}
```

## C問題
josinoお姉ちゃんが1つ数字を言うのでそれを白紙の紙に書く。もしjoisinoお姉ちゃんが言った数字がすでに紙に書かれている場合は紙からその数字を消しゴムか何かで消す。これを何回か繰り返し、結果、数字が書かれた紙が何枚残るか数える問題。

# 解き方
mapを使い出てきた数字をカウントする。
呼ばれた回数が(1回目->書く　2回目->消す　3回目->書く　4回目->消す ...)と奇数回呼ばれた時数字が紙に書かれていることがわかる。

```cpp
int main(){
  int n;
  ll x;
  map<ll,int> m;
  cin>>n;
  rep(i,n){
    cin>>x;
    m[x]++;
  }
  int ans=0;

  for(auto itr = m.begin(); itr != m.end(); ++itr) {
    if(itr->second%2==1)ans++;
  }
  cout<<ans<<endl;
  return 0;
```

for(auto itr = m.begin(); itr != m.end(); ++itr) はmapに格納された要素を一つづつ呼び出す処理をしている。(foreach的な感じ)
itr->firstはキー、itr->secondは値を表す。
今回必要な情報は何回数字が呼ばれたかの「値」が必要だったのでitr->secondのみを使っている。

## D問題
この国にはN個の町があり、joisinoお姉ちゃんはこの国のR個の町を訪れなければならない。
その最短距離を求める問題。(循環セールス問題みたいな感じ)

# 解き方
N<=200 だったのでワーシャルフロイド法O(N^3)を使って全町間の最短距離を求める。
その次に、深さ優先探索を使って全探索する。(Rの制約がR <= 8 と小さいから)
計算量はO(N^3+R*R!)でした。
```cpp
int d[205][205];
vi R;

void init(){
  rep(i,205)rep(j,205)d[i][j]=INF;
}

void wf(){
  rep(k,205){
    rep(i,205){
      rep(j,205){
	d[i][j]=min(d[i][j],d[i][k]+d[k][j]);
      }
    }
  }
}

int dfs(int now,bool used[],int cnt,int cost){
  int calc=INF;
  if(cnt==R.size())return cost;
  rep(i,R.size()){
    if(d[now][R[i]]!=INF&&used[i]!=true){
      used[i]=true;
      calc=min(calc,dfs(R[i],used,cnt+1,cost+d[now][R[i]]));
      used[i]=false;
    }
  }
  return calc;
}

int main(){
  int n,m,r;
  int a,b,c;
  cin>>n>>m>>r;
  rep(i,r){
    int x;
    cin>>x;
    R.pb(x);
  }
  init();
  rep(i,m){
    cin>>a>>b>>c;
    d[a][b]=c;
    d[b][a]=c;
  }

  wf();
  int ans=INF;
  rep(i,R.size()){
    bool used[R.size()];
    used[i]=true;
    ans=min(ans,dfs(R[i],used,1,0));
  }
  cout<<ans<<endl;
  return 0;
}

```
ワーシャルフロイド方の説明はゆらふなさんの記事がわかりやすかったので貼っておきます。
http://pakapa104.hatenablog.com/entry/2016/02/05/225241


早く水色になりたいなぁー
