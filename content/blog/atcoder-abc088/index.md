+++
author = "mkan0141"
categories = ["AtCoder", "競プロ"]
date = "2018-02-18"
description = ""
images = [""]
linktitle = "ABC088"
title = "ABC088"
type = "post"

+++


タイポとか色々やらかして辛いコンテストでした

# A - Infinite Coins

https://beta.atcoder.jp/contests/abc088/tasks/abc088_a

(N % 500 <= A)が成り立てばYesを出力すればよいよい
```cpp
int main(){
    int n, a;
    cin >> n >> a;
    n %= 500;
    if(n <= a)cout << "Yes" <<endl;
    else cout << "No" << endl;
    return 0;
}

```

# B - Card Game for Two
https://beta.atcoder.jp/contests/abc088/tasks/abc088_b

両者とも最大になるようにカードを取っていくのだから当然数字が大きいカードから取っていくのでそれをシュミレーションする。

```cpp
int main(){
    int n;
    int a[105];
    cin >> n;
    int aa = 0, b = 0;
    rep(i, n)cin >> a[i];
    sort(a, a + n, greater<int>());
    rep(i, n){
        if(i % 2 == 0)aa += a[i];
        else b += a[i];
    }
    cout << abs(aa - b) << endl;
    return 0;
}

```

# C - Takahashi's Information
https://beta.atcoder.jp/contests/abc088/tasks/abc088_c

a1, a2, a3の値が決まったとすると、b1, b2, b3がどんな値を取っても a1 と a2 を使ったマスの差はどの行を見ても同じで、同じく a2 と a3 を使ったマスの差もどの行を見ても同じである規則性(?)がある。

```cpp
int main(){
    int c[4][4];
    rep(i, 3){
        rep(j, 3){
            cin >> c[i][j];
        }
    }
    
    if(c[0][0] - c[0][1] == c[1][0] - c[1][1] && c[1][0] - c[1][1] == c[2][0] - c[2][1] &&
       c[0][1] - c[0][2] == c[1][1] - c[1][2] && c[1][1] - c[1][2] == c[2][1] - c[2][2]){
        cout << "Yes" << endl;
    }else{
        cout << "No" << endl;
    }
    return 0;
}

```

if文が長くなってすっごい見づらいな...

# D - Grid Repainting
https://beta.atcoder.jp/contests/abc088/tasks/abc088_d

自分の大好きなアルゴリズムはBFSなのででてきたときは興奮した:dohentai:  
や、BFSって真面目にコツコツとする感じが可愛いでしょ？可愛いですね。

BFSでスタートからゴールまでの最短距離を計算して、(' . 'の数 - 最短距離 - 1)が最大スコアになる。
最後の -1 はゴールの部分は' . 'にしておく必要があるからです。

```cpp
int h, w;
int d[55][55];
char s[55][55];
 
void BFS(){
    rep(i, 55)rep(j, 55)d[i][j] = INF;
    d[0][0] = 0;
    queue<int> q;
    q.push(0);q.push(0);
    while(q.size()){
        int x = q.front(); q.pop();
        int y = q.front(); q.pop();
        for(int i = 0;i < 4; i++){
            int xx = x + dx[i];
            int yy = y + dy[i];
            if(0 <= xx && xx <= w && 0 <= yy && yy <= h && s[yy][xx] == '.'){
                s[yy][xx] = '#';
                d[yy][xx] = min(d[yy][xx], d[y][x] + 1);
                q.push(xx);q.push(yy);
            }
        }
    }
}
 
int main(){
    int cnt = 0;
    cin >> h >> w;
    rep(i, h)rep(j, w){
        cin >> s[i][j];
        if(s[i][j] == '.')cnt++;
    }
    h--; w--;
    BFS();
    if(d[h][w] == INF)cout << -1 << endl;
    else cout << max(0, cnt - d[h][w] - 1)<< endl; 
    return 0;
}

```
